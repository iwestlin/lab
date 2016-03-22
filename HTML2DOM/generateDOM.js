(function(){

function encode(str) {
    if (!str) return '';
    str = str.replace(/\\/g,'\\\\');
    str = str.replace(/';/g, "\\'");
    str = str.replace(/\s+^/mg, "\\n");
    return str;
}

function checkForVariable(v) {
    if(v.indexOf('$') == -1) {
        v = '\'' + v + '\'';
    } else {
        // MSIE adds full anchor paths so you need to
        // take the substring from $ to the end of the string
        v = v.substring(v.indexOf('$')+1)
        requiredVariables += 'var ' + v + ';\n';
    }
    return v;
}


var domCode = '';
var nodeNameCounters = [];
var requiredVariables = '';
var newVariables = '';

function generate(strHTML,strRoot) {

    //add the HTML to the body so we can walk the tree
    var domRoot = document.createElement('DIV');
    domRoot.innerHTML = strHTML;
    
    // reset the variables
    domCode = '';
    nodeNameCounters = [];
    requiredVariables = '';
    newVariables = '';
    
    // process all the child nodes in domRoot using processNode()
    var node = domRoot.firstChild;
    while(node) {
        ADS.walkTheDOMRecursive(processNode,node,0,strRoot);
        node = node.nextSibling;
    }

    // Output the generated code    
    domCode =
        '/* requiredVariables in this code\n' + requiredVariables + '*/\n\n' 
        + domCode + '\n\n'
        + '/* new objects in this code\n' + newVariables + '*/\n\n';
    
    return domCode;
}

function processNode(tabCount,refParent) {
    // Repeat a tab character to indent the line
    // to match the depth in the tree
    var tabs = (tabCount ? '\t'.repeat(parseInt(tabCount)) : '');
    
    // Determine the node type and deal with element and text nodes 
    switch(this.nodeType) {
        case ADS.node.ELEMENT_NODE:
            // Increase a counter and create a new variable reference using
            // the tag and the counter, eg: a1,a2,a3
            if(nodeNameCounters[this.nodeName]) {
                ++nodeNameCounters[this.nodeName];
            } else {
                nodeNameCounters[this.nodeName] = 1;
            }
            
            var ref = this.nodeName.toLowerCase() 
                + nodeNameCounters[this.nodeName];
            
            // Append the line of DOM code that creates this element
            domCode += tabs 
                + 'var ' 
                + ref 
                + ' = document.createElement(\'' + this.nodeName +'\');\n';
            
            // Append to the list of new variable to report
            // them all in the result
            newVariables += '' + ref + ';\n';
            
            // Check if there are any attributes ad if so, loop through
            // them and walk their DOM tree using processAttribute
            if (this.attributes) {
                for(var i=0; i < this.attributes.length; i++) {
                    ADS.walkTheDOMRecursive(
                        processAttribute,
                        this.attributes[i],
                        tabCount,
                        ref
                    );
                }
            }
            
            break;
            
        case ADS.node.TEXT_NODE:
        
            // check for a value in the text node that isn't just whitespace
            var value = (this.nodeValue ? encode(this.nodeValue.trim()) : '' );
            if(value) {

                // Increase a counter and create a new txt reference using
                // the counter, eg: txt1,txt2,txt3
                if(nodeNameCounters['txt']) {
                    ++nodeNameCounters['txt'];
                } else {
                    nodeNameCounters['txt'] = 1;
                }
                var ref = 'txt' + nodeNameCounters['txt'];

                //check if the $var is the value
                value = checkForVariable(value);

                // Append the line of DOM code that creates this element
                domCode += tabs 
                    + 'var ' 
                    + ref 
                    + ' = document.createTextNode('+ value +');\n';
                // Append to the list of new variable to report
                // them all in the result
                newVariables += '' + ref + ';\n';
                
            } else {
                // If there is no value (or just whitespace) return so
                // that this node isn't appended to the parent
                return;
            }
            break;
            
        default:
            //ignore everything else
            break;
    }
    
    // Append the code that appends this node to its parent
    if(refParent) {
        domCode += tabs + refParent + '.appendChild('+ ref + ');\n';
    }
    return ref;

}

function processAttribute(tabCount,refParent) {
    
    // Skip text nodes
    if(this.nodeType != ADS.node.ATTRIBUTE_NODE) return; 

    // Retrieve the attribute value
    var attrValue = (this.nodeValue ? encode(this.nodeValue.trim()) : '');
    if(this.nodeName == 'cssText') alert('true');
    // If there is no value then return
    if(!attrValue) return;  

    // Determine the indent level
    var tabs = (tabCount ? '\t'.repeat(parseInt(tabCount)) : '');
    
    // Switch on the nodeName. All types will be processed but 
    // style and class need special care.
    switch(this.nodeName){
        default:
            if (this.nodeName.substring(0,2) == 'on') {
                // if the attribute begins with 'on' then 
                // it's an inline event and needs to be recreated 
                // using a function assigned to the attribute 
                domCode += tabs 
                    + refParent 
                    + '.' 
                    + this.nodeName 
                    + '= function(){' + attrValue +'}\n';
            } else{
            
                // Use setAttribute for the rest
                domCode += tabs 
                    + refParent 
                    + '.setAttribute(\'' 
                    + this.nodeName 
                    + '\', ' 
                    + checkForVariable(attrValue) 
                    +');\n';
            }
        break;
        case 'class':
            // The class is assigned using the className attribute
            domCode += tabs 
                + refParent 
                + '.className = ' 
                + checkForVariable(attrValue) 
                + ';\n';                
            break;
        case 'style':
            // Split the style attribute on ; using a regular expression
            // to include adjoining spaces
            var style = attrValue.split(/\s*;\s*/);
            
            if(style){
                for(pair in style){
                    
                    if(!style[pair]) continue;
                    
                    // Split each pair on : using a regular expression
                    // to include adjoining spaces
                    var prop = style[pair].split(/\s*:\s*/);
                    if(!prop[1]) continue;
                    
                    // convert css-property to cssProperty
                    prop[0] = ADS.camelize(prop[0]);
                   
                    var propValue = checkForVariable(prop[1]);
                    if (prop[0] == 'float') {
                        // float is a reserved word so it's special
                        // - cssFloat is standard
                        // - styleFloat is IE
                        domCode += tabs 
                            + refParent 
                            + '.style.cssFloat = ' 
                            + propValue 
                            + ';\n';
                        domCode += tabs 
                            + refParent 
                            + '.style.styleFloat = ' 
                            + propValue 
                            + ';\n';
                    } else {
                        domCode += tabs 
                            + refParent 
                            + '.style.' 
                            + prop[0] 
                            + ' = ' 
                            + propValue + ';\n';
                    }
                }
            }
    break;
    }
}

window['generateDOM'] = generate;

})();


