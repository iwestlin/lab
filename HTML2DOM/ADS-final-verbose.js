/**
 * ADS Library from Advanced DOM Scripting
 * http://advanceddomscripting.com
 *
 * This library is not compressed and is not recommended for production use in
 * its current state. The code is excessively verbose and heavily commented
 * as it was written as a teaching tool. It is recommended you edit the code for
 * better performance and smaller file size.

 * @projectDescription ADS library from the book "AdvancED DOM Scripting" http://advanceddomscripting.com/
 * @author Jeffrey Sambells jeff@advanceddomscripting.com
 * @copyright Jeffrey Sambells 2007 unless otherwise noted
 * @version $Id: ADS-final-verbose.js 183 2007-07-17 20:23:30Z jsambells $
 * @see http://advanceddomscripting.com/source/documentation
 * @namespace ADS
 */

/**
* Missing getElementById.
* Example of creating a DOM replacement this isn't necessary because the
* library assume browsers that support it.
*/
if(document.all && !document.getElementById) {
    document.getElementById = function(id) {
         return document.all[id];
    }
}


/**
* Repeat a string 
* from Chapter 3
* Using the prototype to modify core objects
*/
if (!String.repeat) {
    String.prototype.repeat = function(l){
        return new Array(l+1).join(this);
    }
}

/** 
* Remove trailing and leading whitespace 
* from Chapter 3
*/
if (!String.trim) {
    String.prototype.trim = function() {
        return this.replace(/^\s+|\s+$/g,'');
    }
}

/**
 * ADS Namespace
 * This anonymous function acts as a namespace wrapper for the rest
 * of the methods. Methods are then assigned to the window object
 * using: window['ADS']['methodName'] = methodReference;
 * @alias ADS
 */
(function(){

/**
 * The primary namespace object
 * @type {Object}
 * @alias ADS
 */
if(!window['ADS']) {
    window['ADS'] = {};
}


/********************************
* Chapter 1
*********************************/

/**
 * Checks to see if the current browser is compatible with the entire library
 */
function isCompatible(other) {
    // Use capability detection to check requirements
    if( other===false 
        || !Array.prototype.push
        || !Object.hasOwnProperty
        || !document.createElement
        || !document.getElementsByTagName
        ) {
        alert('TR- if you see this message isCompatible is failing incorrectly.');
        return false;
    }
    return true;
}
window['ADS']['isCompatible'] = isCompatible;

/**
 * document.getElementById(); replacement.
 */
function $() {
    var elements = new Array();
    
    // Find all the elements supplied as arguments
    for (var i = 0; i < arguments.length; i++) {
        var element = arguments[i];
        
        // If the argument is a string assume it's an id
        if (typeof element == 'string') {
            element = document.getElementById(element);
        }
        
        // If only one argument was supplied, return the element immediately
        if (arguments.length == 1) {
            return element;
        }
        
        // Otherwise add it to the array
        elements.push(element);
    }
    
    // Return the array of multiple requested elements
    return elements;
};
window['ADS']['$'] = $;


/**
 * Register an event listener on an element
 */
function addEvent( node, type, listener ) {
    // Check compatibility using the earlier method
    // to ensure graceful degradation
    if(!isCompatible()) { return false }
    if(!(node = $(node))) return false;
    
    if (node.addEventListener) {
        // W3C method
        node.addEventListener( type, listener, false );
        return true;
    } else if(node.attachEvent) {
        // MSIE method
        node['e'+type+listener] = listener;
        node[type+listener] = function(){node['e'+type+listener]( window.event );}
        node.attachEvent( 'on'+type, node[type+listener] );
        return true;
    }
    
    // Didn't have either so return false
    return false;
};
window['ADS']['addEvent'] = addEvent;

/**
 * Unregister an event listener on an element
 */
function removeEvent(node, type, listener ) {
    if(!(node = $(node))) return false;
    if (node.removeEventListener) {
        node.removeEventListener( type, listener, false );
        return true;
    } else if (node.detachEvent) {
        // MSIE method
        node.detachEvent( 'on'+type, node[type+listener] );
        node[type+listener] = null;
        return true;
    }
    // Didn't have either so return false
    return false;
};
window['ADS']['removeEvent'] = removeEvent;

/**
 * Retrieve an array of element base on a class name
 */
function getElementsByClassName(className, tag, parent){
    parent = parent || document;
    if(!(parent = $(parent))) return false;
    
    // Locate all the matching tags
    var allTags = (tag == "*" && parent.all) ? parent.all : parent.getElementsByTagName(tag);
    var matchingElements = new Array();
    
    // Create a regular expression to determine if the className is correct
    className = className.replace(/\-/g, "\\-");
    var regex = new RegExp("(^|\\s)" + className + "(\\s|$)");
    
    var element;
    // Check each element
    for(var i=0; i<allTags.length; i++){
        element = allTags[i];
        if(regex.test(element.className)){
            matchingElements.push(element);
        }
    }
    
    // Return any matching elements
    return matchingElements;
};
window['ADS']['getElementsByClassName'] = getElementsByClassName;

/**
 * Toggle the style display value between none and the default
 */
function toggleDisplay(node, value) {
    if(!(node = $(node))) return false;
    if ( node.style.display != 'none' ) {
        node.style.display = 'none';
    } else {
        node.style.display = value || '';
    }
    return true;
}
window['ADS']['toggleDisplay'] = toggleDisplay;

/**
 * Insert a DOM node after another DOM node
 */
function insertAfter(node, referenceNode) {
    if(!(node = $(node))) return false;
    if(!(referenceNode = $(referenceNode))) return false;
    
    return referenceNode.parentNode.insertBefore(node, referenceNode.nextSibling);
};
window['ADS']['insertAfter'] = insertAfter;

/**
 * Remove all teh child nodes from an element
 */
function removeChildren(parent) {
    if(!(parent = $(parent))) return false;
    
    // While there is a child remove it
    while (parent.firstChild) {
         parent.firstChild.parentNode.removeChild(parent.firstChild);
    }
    // Return the parent again so you can stack the methods
    return parent;
};
window['ADS']['removeChildren'] = removeChildren;

/**
 * Insert a new node as the first child.
 */
function prependChild(parent,newChild) {
    if(!(parent = $(parent))) return false;
    if(!(newChild = $(newChild))) return false;
    if(parent.firstChild) {
        // There is already a child so insert before the first one
        parent.insertBefore(newChild,parent.firstChild);    
    } else {
        // No children so just append
        parent.appendChild(newChild);
    }
    // Return the parent again so you can stack the methods
    return parent;
} 
window['ADS']['prependChild'] = prependChild;


/********************************
* Chapter 2
*********************************/

/**
 * Put the given object in teh context of the given method.
 */
function bindFunction(obj, func) {
    return function() {
        func.apply(obj,arguments);    
    };
};
window['ADS']['bindFunction'] = bindFunction;


/**
 * Retrieve the size of the browser window.
 */
function getBrowserWindowSize() {
    var de = document.documentElement;
    
    // window.innerWidth for most browsers
    // document.documentElement.clientWidth for MSIE in strict mode
    // document.body.clientWidth for MSIE in quirks mode
    
    return {
        'width':(
            window.innerWidth 
            || (de && de.clientWidth ) 
            || document.body.clientWidth),
        'height':(
            window.innerHeight 
            || (de && de.clientHeight ) 
            || document.body.clientHeight)
    }
};
window['ADS']['getBrowserWindowSize'] = getBrowserWindowSize;

/********************************
* Chapter 3
*********************************/

/**
 * Constants for note type comparison
 */
window['ADS']['node'] = {
    ELEMENT_NODE                : 1,
    ATTRIBUTE_NODE              : 2,
    TEXT_NODE                   : 3,
    CDATA_SECTION_NODE          : 4,
    ENTITY_REFERENCE_NODE       : 5,
    ENTITY_NODE                 : 6,
    PROCESSING_INSTRUCTION_NODE : 7,
    COMMENT_NODE                : 8,
    DOCUMENT_NODE               : 9,
    DOCUMENT_TYPE_NODE          : 10,
    DOCUMENT_FRAGMENT_NODE      : 11,
    NOTATION_NODE               : 12
};

/**
 * Walk the nodes in the DOM tree without maintaining parent/child relationships.
 */
function walkElementsLinear(func,node) {
    var root = node || window.document;
    var nodes = root.getElementsByTagName("*");
    for(var i = 0 ; i < nodes.length ; i++) {
        func.call(nodes[i]);
    }
};
window['ADS']['walkElementsLinear'] = walkElementsLinear;

/**
 * Walk the nodes in the DOM tree maintaining parent/child relationships.
 */
function walkTheDOMRecursive(func,node,depth,returnedFromParent) {
    var root = node || window.document;
    returnedFromParent = func.call(root,depth++,returnedFromParent);
    node = root.firstChild;
    while(node) {
        walkTheDOMRecursive(func,node,depth,returnedFromParent);
        node = node.nextSibling;
    }
};
window['ADS']['walkTheDOMRecursive'] = walkTheDOMRecursive;

/**
 * Walk the nodes in the DOM tree maintaining parent/child relationships and include the node attributes as well.
 */
function walkTheDOMWithAttributes(node,func,depth,returnedFromParent) {
    var root = node || window.document;
    returnedFromParent = func(root,depth++,returnedFromParent);
    if (root.attributes) {
        for(var i=0; i < root.attributes.length; i++) {
            walkTheDOMWithAttributes(root.attributes[i],func,depth-1,returnedFromParent);
        }
    }
    if(root.nodeType != ADS.node.ATTRIBUTE_NODE) {
        node = root.firstChild;
        while(node) {
            walkTheDOMWithAttributes(node,func,depth,returnedFromParent);
            node = node.nextSibling;
        }
    }
};
window['ADS']['walkTheDOMWithAttributes'] = walkTheDOMWithAttributes;

/**
 * Walk the DOM recursively using a callback function
 */
function walkTheDOM(node, func) {
    func(node);
    node = node.firstChild;
    while (node) {
         walkTheDOM(node, func);
         node = node.nextSibling;
    }
}
window['ADS']['walkTheDOM'] = walkTheDOM;

/**
 * Convert hyphenated word-word strings to camel case wordWord strings.
 */
function camelize(s) {
    return s.replace(/-(\w)/g, function (strMatch, p1){
        return p1.toUpperCase();
    });
}
window['ADS']['camelize'] = camelize;

/********************************
* Chapter 4
*********************************/

/**
 * Convert camel case wordWord strings to hyphenated word-word strings.
 */
function uncamelize(s, sep) {
    sep = sep || '-';
    return s.replace(/([a-z])([A-Z])/g, function (strMatch, p1, p2){
        return p1 + sep + p2.toLowerCase();
    });
}
window['ADS']['camelize'] = camelize;


/**
 * Add a load event that will run when the document finishes loading - excluding images.
 */
function addLoadEvent(loadEvent,waitForImages) {
    if(!isCompatible()) return false;
    
    // If the wait flag is true use the regular add event method
    if(waitForImages) {
        return addEvent(window, 'load', loadEvent);
    }
    
    // Otherwise use a number of different methods
    
    // Wrap the loadEvent method to assign the correct content for the
    // this keyword and ensure that the event doesn't execute twice
    var init = function() {

        if (arguments.callee.done) return;
        // Return if this function has already been called

        // Mark this function so you can verify if it was already run
        arguments.callee.done = true;

        // Run the load event in the context of the document
        loadEvent.apply(document,arguments);
    };
    
    // Register the event using the DOMContentLoaded event
    if (document.addEventListener) {
        document.addEventListener("DOMContentLoaded", init, false);
    }
    
    // For Safari, use a setInterval() to see if the document has loaded 
    if (/WebKit/i.test(navigator.userAgent)) {
        var _timer = setInterval(function() {
            if (/loaded|complete/.test(document.readyState)) {
                clearInterval(_timer);
                init();
            }
        },10);
    }
    // For Internet Explorer (using conditional comments) attach a script 
    // that is deferred to the end of the load process and then check to see
    // if it has loaded
    /*@cc_on @*/
    /*@if (@_win32)
    document.write("<script id=__ie_onload defer src=javascript:void(0)><\/script>");
    var script = document.getElementById("__ie_onload");
    script.onreadystatechange = function() {
        if (this.readyState == "complete") {
            init();
        }
    };
    /*@end @*/
    return true;
}
window['ADS']['addLoadEvent'] = addLoadEvent;

/**
 * Stop the propagation of an event
 */
function stopPropagation(eventObject) {
    eventObject = eventObject || getEventObject(eventObject);
    if(eventObject.stopPropagation) {
        eventObject.stopPropagation();
    } else {
        eventObject.cancelBubble = true;
    }
}
window['ADS']['stopPropagation'] = stopPropagation;

/**
 * Prevents the default event in the event flow (such as following the href in an anchor).
 */
function preventDefault(eventObject) {
    eventObject = eventObject || getEventObject(eventObject);
    if(eventObject.preventDefault) {
        eventObject.preventDefault();
    } else {
        eventObject.returnValue = false;
    }
}
window['ADS']['preventDefault'] = preventDefault;

/**
 * Retrieves the event object in a cross-browser way.
 */
function getEventObject(W3CEvent) {
    return W3CEvent || window.event;
}
window['ADS']['getEventObject'] = getEventObject;

/**
 * Retrieves the element targeted by the event.
 */
function getTarget(eventObject) {
    eventObject = eventObject || getEventObject(eventObject);
    // Check if the target is W3C or MSIE
    var target = eventObject.target || eventObject.scrElement;
    // Reassign the target to the parent
    // if it is a text node like in Safari
    if(target.nodeType == ADS.node.TEXT_NODE) {
        target = node.parentNode;
    }
    return target;

}
window['ADS']['getTarget'] = getTarget;

/**
 * Determine which mouse button was pressed 
 */
function getMouseButton(eventObject) {
    eventObject = eventObject || getEventObject(eventObject);
    // Initialize an object wit the appropriate properties
    var buttons = {
        'left':false,
        'middle':false,
        'right':false
    };
    // Check the toString value of the eventObject
    // W3C Dom object have a toString method and in this case it
    // should be MouseEvent
    if(eventObject.toString && eventObject.toString().indexOf('MouseEvent') != -1) {
        // W3C Method
        switch(eventObject.button) {
            case 0: buttons.left = true; break;
            case 1: buttons.middle = true; break;
            case 2: buttons.right = true; break;
            default: break;
        }
    } else if(eventObject.button) {
        // MSIE method
        switch(eventObject.button) {
            case 1: buttons.left = true; break;
            case 2: buttons.right = true; break;
            case 3:
                buttons.left = true;
                buttons.right = true;
            break;
            case 4: buttons.middle = true; break;
            case 5:
                buttons.left = true;
                buttons.middle = true;
            break;
            case 6:
                buttons.middle = true;
                buttons.right = true;
            break;
            case 7:
                buttons.left = true;
                buttons.middle = true;
                buttons.right = true;
            break;
            default: break;
        }
    } else {
        return false;
    }
    return buttons;

}
window['ADS']['getMouseButton'] = getMouseButton;

/**
 * Get the position of the pointer in the document. 
 */
function getPointerPositionInDocument(eventObject) {
    eventObject = eventObject || getEventObject(eventObject);
    var x = eventObject.pageX || (eventObject.clientX +
        (document.documentElement.scrollLeft || document.body.scrollLeft));
    var y= eventObject.pageY || (eventObject.clientY +
        (document.documentElement.scrollTop || document.body.scrollTop));
    //x and y now contain the coordinates of the mouse relative to the document origin
    return {'x':x,'y':y};
}
window['ADS']['getPointerPositionInDocument'] = getPointerPositionInDocument;

/**
 * Get the key pressed from the event object 
 */
function getKeyPressed(eventObject) {
    eventObject = eventObject || getEventObject(eventObject);
    var code = eventObject.keyCode;
    var value = String.fromCharCode(code);
    return {'code':code,'value':value};
}
window['ADS']['getKeyPressed'] = getKeyPressed;


/********************************
* Chapter 5
*********************************/

/**
 * Changes the style of a single element by id 
 */
function setStyleById(element, styles) {
    // Retrieve an object reference
    if(!(element = $(element))) return false;
    // Loop through  the styles object an apply each property
    for (property in styles) {
        if(!styles.hasOwnProperty(property)) continue;
    
        if(element.style.setProperty) {
            //DOM2 Style method
            element.style.setProperty(
            uncamelize(property,'-'),styles[property],null);
        } else {
            //Alternative method
            element.style[camelize(property)] = styles[property];
        }
    }
    return true;
}
window['ADS']['setStyle'] = setStyleById;
window['ADS']['setStyleById'] = setStyleById;

/**
 * Changes the style of multiple elements by class name 
 */
function setStylesByClassName(parent, tag, className, styles) {
    if(!(parent = $(parent))) return false;
    var elements = getElementsByClassName(className, tag, parent);
    for (var e = 0 ; e < elements.length ; e++) {
        setStyleById(elements[e], styles);
    }
    return true;
}
window['ADS']['setStylesByClassName'] = setStylesByClassName;

/**
 * Changes the style of multiple elements by tag name 
 */
function setStylesByTagName(tagname, styles, parent) {
    parent = $(parent) || document;
    var elements = parent.getElementsByTagName(tagname);
    for (var e = 0 ; e < elements.length ; e++) {
        setStyleById(elements[e], styles);
    }
}
window['ADS']['setStylesByTagName'] = setStylesByTagName;

/**
 * Retrieves the classes as an array
 */
function getClassNames(element) {
    if(!(element = $(element))) return false;
    // Replace multiple spaces with one space and then
    // split the classname on spaces
    return element.className.replace(/\s+/,' ').split(' ');
};
window['ADS']['getClassNames'] = getClassNames;

/**
 * Check if a class exists on an element 
 */
function hasClassName(element, className) {
    if(!(element = $(element))) return false;
    var classes = getClassNames(element);
    for (var i = 0; i < classes.length; i++) {
        // Check if the className matches and return true if it does
        if (classes[i] === className) { return true; }
    }
    return false;
};
window['ADS']['hasClassName'] = hasClassName;

/**
 * Add a class to an element 
 */
function addClassName(element, className) {
    if(!(element = $(element))) return false;
    // Append the classname to the end of the current className
    // If there is no className, don't include the space
    element.className += (element.className ? ' ' : '') + className;
    return true;
};
window['ADS']['addClassName'] = addClassName;

/**
 * remove a class from an element 
 */
function removeClassName(element, className) {
    if(!(element = $(element))) return false;
    var classes = getClassNames(element);
    var length = classes.length
    //loop through the array in reverse, deleting matching items
    // You loop in reverse as you're deleting items from 
    // the array which will shorten it.
    for (var i = length-1; i >= 0; i--) {
        if (classes[i] === className) { delete(classes[i]); }
    }
    element.className = classes.join(' ');
    return (length == classes.length ? false : true);
};
window['ADS']['removeClassName'] = removeClassName;

/**
* Add a new stylesheet 
*/
function addStyleSheet(url,media) {
    media = media || 'screen';
    var link = document.createElement('LINK');
    link.setAttribute('rel','stylesheet');
    link.setAttribute('type','text/css');
    link.setAttribute('href',url);
    link.setAttribute('media',media);
    document.getElementsByTagName('head')[0].appendChild(link);
}
window['ADS']['addStyleSheet'] = addStyleSheet;

/** 
 * Remove a stylesheet 
 */
function removeStyleSheet(url,media) {
    var styles = getStyleSheets(url,media);
    for(var i = 0 ; i < styles.length ; i++) {
        var node = styles[i].ownerNode || styles[i].owningElement;
        // Disable the stylesheet
        styles[i].disabled = true;
        // Remove the node
        node.parentNode.removeChild(node);
    }
}
window['ADS']['removeStyleSheet'] = removeStyleSheet;

/**
 * Retrieve an array of all the stylesheets by URL 
 */
function getStyleSheets(url,media) {
    var sheets = [];
    for(var i = 0 ; i < document.styleSheets.length ; i++) {
        if (url &&  document.styleSheets[i].href.indexOf(url) == -1) { continue; }
        if(media) {
            // Normaizle the media strings
            media = media.replace(/,\s*/,',');
            var sheetMedia;
                
            if(document.styleSheets[i].media.mediaText) {
                // DOM mehtod
                sheetMedia = document.styleSheets[i].media.mediaText.replace(/,\s*/,',');
                // Safari adds an extra comma and space
                sheetMedia = sheetMedia.replace(/,\s*$/,'');
            } else {
                // MSIE
                sheetMedia = document.styleSheets[i].media.replace(/,\s*/,',');
            }
            // Skip it if the media don't match
            if (media != sheetMedia) { continue; }
        }
        sheets.push(document.styleSheets[i]);
    }
    return sheets;
}
window['ADS']['getStyleSheets'] = getStyleSheets;

/**
 * Edit a CSS rule 
 */
function editCSSRule(selector,styles,url,media) {
    var styleSheets = (typeof url == 'array' ? url : getStyleSheets(url,media));

    for ( i = 0; i < styleSheets.length; i++ ) {

        // Retrieve the list of rules
        // The DOM2 Style method is styleSheets[i].cssRules
        // The MSIE method is styleSheets[i].rules
        var rules = styleSheets[i].cssRules || styleSheets[i].rules;
        if (!rules) { continue; }
               
        // Convert to uppercase as MSIIE defaults to UPPERCASE tags.
        // this could cause conflicts if you're using case sensetive ids
        selector = selector.toUpperCase();
        
        for(var j = 0; j < rules.length; j++) {
            // Check if it matches
            if(rules[j].selectorText.toUpperCase() == selector) {
                for (property in styles) {
                    if(!styles.hasOwnProperty(property)) { continue; }
                    // Set the new style property
                    rules[j].style[camelize(property)] = styles[property];
                }
            }
        }
    }
}
window['ADS']['editCSSRule'] = editCSSRule;

/**
 * Add a CSS rule 
 */
function addCSSRule(selector, styles, index, url, media) {
    var declaration = '';

    // Build the declaration string from the style object
    for (property in styles) {
        if(!styles.hasOwnProperty(property)) { continue; }
        declaration += property + ':' + styles[property] + '; ';
    }

    var styleSheets = (typeof url == 'array' ? url : getStyleSheets(url,media));
    var newIndex;
    for(var i = 0 ; i < styleSheets.length ; i++) {
        // Add the rule        
        if(styleSheets[i].insertRule) {
            // The DOM2 Style method
            // index = length is the end of the list
            newIndex = (index >= 0 ? index : styleSheets[i].cssRules.length);
            styleSheets[i].insertRule(selector + ' { ' + declaration + ' } ', 
                newIndex);
        } else if(styleSheets[i].addRule) {
            // The Microsoft method
            // index = -1 is the end of the list 
            newIndex = (index >= 0 ? index : -1);
            styleSheets[i].addRule(selector, declaration, newIndex);
        }
    }
}
window['ADS']['addCSSRule'] = addCSSRule;

/**
 * retrieve the computed style of an element 
 */
function getStyle(element,property) {
    if(!(element = $(element)) || !property) return false;
    // Check for the value in the element's style property
    var value = element.style[camelize(property)];
    if (!value) {
        // Retrieve the computed style value
        if (document.defaultView && document.defaultView.getComputedStyle) {
            // The DOM method
            var css = document.defaultView.getComputedStyle(element, null);
            value = css ? css.getPropertyValue(property) : null;
        } else if (element.currentStyle) {
            // The MSIE method
            value = element.currentStyle[camelize(property)];
        }
    }
    // Return an empty string rather than auto so that you don't
    // have to check for auto values 
    return value == 'auto' ? '' : value;
}
window['ADS']['getStyle'] = getStyle;
window['ADS']['getStyleById'] = getStyle;


/********************************
* Chapter 7: Case Study
*********************************/

// no code added in Chapter 6


/********************************
* Chapter 7
*********************************/

/*
parseJSON(string,filter)
A slightly modified version of the public domain method 
at http://www.json.org/json.js This method parses a JSON text 
to produce an object or array. It can throw a 
SyntaxError exception.

The optional filter parameter is a function which can filter and
transform the results. It receives each of the keys and values, and
its return value is used instead of the original value. If it
returns what it received, then structure is not modified. If it
returns undefined then the member is deleted.

Example:

// Parse the text. If a key contains the string 'date' then
// convert the value to a date.

myData = parseJSON(string,function (key, value) {
    return key.indexOf('date') >= 0 ? new Date(value) : value;
});

*/
function parseJSON(s,filter) {
    var j;

    function walk(k, v) {
        var i;
        if (v && typeof v === 'object') {
            for (i in v) {
                if (v.hasOwnProperty(i)) {
                    v[i] = walk(i, v[i]);
                }
            }
        }
        return filter(k, v);
    }


// Parsing happens in three stages. In the first stage, we run the 
// text against a regular expression which looks for non-JSON 
// characters. We are especially concerned with '()' and 'new' 
// because they can cause invocation, and '=' because it can cause 
// mutation. But just to be safe, we will reject all unexpected 
// characters.

 if (/^("(\\.|[^"\\\n\r])*?"|[,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t])+?$/.
            test(s)) {

// In the second stage we use the eval function to compile the text 
// into a JavaScript structure. The '{' operator is subject to a 
// syntactic ambiguity in JavaScript: it can begin a block or an 
// object literal. We wrap the text in parens to eliminate 
// the ambiguity.

        try {
            j = eval('(' + s + ')');
        } catch (e) {
            throw new SyntaxError("parseJSON");
        }
    } else {
        throw new SyntaxError("parseJSON");
    }

// In the optional third stage, we recursively walk the new structure, 
// passing each name/value pair to a filter function for possible 
// transformation.

    if (typeof filter === 'function') {
        j = walk('', j);
    }
    return j;
};
    
        
/**
 * Setup the various parts of an XMLHttpRequest Object 
 */
function getRequestObject(url,options) {
    
    // Initialize the request object
    var req = false;
    if(window.XMLHttpRequest) {
        var req = new window.XMLHttpRequest();
    } else if (window.ActiveXObject) {
        var req = new window.ActiveXObject('Microsoft.XMLHTTP');
    }
    if(!req) return false;
    
    // Define the default options
    options = options || {};
    options.method = options.method || 'GET';
    options.send = options.send || null;

    // Define the various listeners for each state of the request
    req.onreadystatechange = function() {
        switch (req.readyState) {
            case 1:
                // Loading
                if(options.loadListener) {
                    options.loadListener.apply(req,arguments);
                }
                break;
            case 2:
                // Loaded
                if(options.loadedListener) {
                    options.loadedListener.apply(req,arguments);
                }
                break;
            case 3:
                // Interactive
                if(options.ineractiveListener) {
                    options.ineractiveListener.apply(req,arguments);
                }
                break;
            case 4:
                // Complete
                // if aborted FF throws errors
                try { 
                if (req.status && req.status == 200) {
                    
                    // Specific listeners for content-type
                    // The Content-Type header can include the charset:
                    // Content-Type: text/html; charset=ISO-8859-4
                    // So we'll use a match to extract the part we need.
                    var contentType = req.getResponseHeader('Content-Type');
                    var mimeType = contentType.match(/\s*([^;]+)\s*(;|$)/i)[1];
                                        
                    switch(mimeType) {
                        case 'text/javascript':
                        case 'application/javascript':
                            // The response is JavaScript so use the 
                            // req.responseText as the argument to the callback
                            if(options.jsResponseListener) {
                                options.jsResponseListener.call(
                                    req,
                                    req.responseText
                                );
                            }
                            break;
                        case 'application/json':
                            // The response is json so parse   
                            // req.responseText using the an anonymous functions
                            // which simply returns the JSON object for the
                            // argument to the callback
                            if(options.jsonResponseListener) {
                                try {
                                    var json = parseJSON(
                                        req.responseText
                                    );
                                } catch(e) {
                                    var json = false;
                                }
                                options.jsonResponseListener.call(
                                    req,
                                    json
                                );
                            }
                            break;
                        case 'text/xml':
                        case 'application/xml':
                        case 'application/xhtml+xml':
                            // The response is XML so use the 
                            // req.responseXML as the argument to the callback
                            // This will be a Document object
                            if(options.xmlResponseListener) {
                                options.xmlResponseListener.call(
                                    req,
                                    req.responseXML
                                );
                            }
                            break;
                        case 'text/html':
                            // The response is HTML so use the 
                            // req.responseText as the argument to the callback
                            if(options.htmlResponseListener) {
                                options.htmlResponseListener.call(
                                    req,
                                    req.responseText
                                );
                            }
                            break;
                    }
                
                    // A complete listener
                    if(options.completeListener) {
                        options.completeListener.apply(req,arguments);
                    }

                } else {
                    // Response completed but there was an error
                    if(options.errorListener) {
                        options.errorListener.apply(req,arguments);
                    }
                }
                

                } catch(e) {
                    //ignore errors
                    //alert('Response Error: ' + e);
                }
                break;
        }
    };
    // Open the request
    req.open(options.method, url, true);
    // Add a special header to identify the requests
    req.setRequestHeader('X-ADS-Ajax-Request','AjaxRequest');
    return req;
}
window['ADS']['getRequestObject'] = getRequestObject;

/**
 * send an XMLHttpRequest using a quick wrapper around the
 * getRequestObject and the send method. 
 */
function ajaxRequest(url,options) {
    var req = getRequestObject(url,options);
    return req.send(options.send);
}
window['ADS']['ajaxRequest'] = ajaxRequest;



/**
 * A counter for the XssHttpRequest objects
 */
var XssHttpRequestCount=0;

/**
 * An cross-site <script> tag implementation of the XMLHttpReqest object 
 */
var XssHttpRequest = function(){
    this.requestID = 'XSS_HTTP_REQUEST_' + (++XssHttpRequestCount);
}
XssHttpRequest.prototype = {
    url:null,
    scriptObject:null,
    responseJSON:null,
    status:0,
    readyState:0,
    timeout:30000,
    onreadystatechange:function() { },
    
    setReadyState: function(newReadyState) {
        // Only update the ready state if it's newer than the current state
        if(this.readyState < newReadyState || newReadyState==0) {
            this.readyState = newReadyState;
            this.onreadystatechange();
        }
    },
    
    open: function(url,timeout){
        this.timeout = timeout || 30000;
        // Append a special variable to the URL called XSS_HTTP_REQUEST_CALLBACK
        // that contains the name of the callback function for this request
        this.url = url 
            + ((url.indexOf('?')!=-1) ? '&' : '?' ) 
            + 'XSS_HTTP_REQUEST_CALLBACK=' 
            + this.requestID 
            + '_CALLBACK';    
        this.setReadyState(0);        
    },
    
    send: function(){
        var requestObject = this;
        
        // Create a new script object to load the external data
        this.scriptObject = document.createElement('script');
        this.scriptObject.setAttribute('id',this.requestID);
        this.scriptObject.setAttribute('type','text/javascript');
        // Don't set the src or append to the document yet...
        
        
        // Create a setTimeout() method that will trigger after a given 
        // number of milliseconds. If the script hasn't loaded by the given
        // time it will be cancelled
        var timeoutWatcher = setTimeout(function() {
            // Re-populate the window method with an empty method incase the 
            // script loads later on after we've assumed it stalled
            window[requestObject.requestID + '_CALLBACK'] = function() { };
            
            // Remove the script to prevent it from loading further
            requestObject.scriptObject.parentNode.removeChild(
                requestObject.scriptObject
            );

            // Set the status to error
            requestObject.status = 2;
            requestObject.statusText = 'Timeout after ' 
                + requestObject.timeout 
                + ' milliseconds.'            
            
            // Update the state
            requestObject.setReadyState(2);
            requestObject.setReadyState(3);
            requestObject.setReadyState(4);
                    
        },this.timeout);
        
        
        // Create a method in the window object that matches the callback
        // in the request. When called it will processing the rest of 
        // the request
        window[this.requestID + '_CALLBACK'] = function(JSON) {
            // When the script loads this method will execute, passing in
            // the desired JSON object.
        
            // Clear the timeoutWatcher method as the request 
            // loaded successfully
            clearTimeout(timeoutWatcher);

            // Update the state
            requestObject.setReadyState(2);
            requestObject.setReadyState(3);
            
            // Set the status to success 
            requestObject.responseJSON = JSON; 
            requestObject.status=1;
            requestObject.statusText = 'Loaded.' 
        
            // Update the state
            requestObject.setReadyState(4);
        }

        // Set the initial state
        this.setReadyState(1);
        
        // Now set the src property and append to the document's 
        // head. This will load the script
        this.scriptObject.setAttribute('src',this.url);                    
        var head = document.getElementsByTagName('head')[0];
        head.appendChild(this.scriptObject);
        
    }
}
window['ADS']['XssHttpRequest'] = XssHttpRequest;

/**
 * Setup the various parts of the new XssHttpRequest Object 
 */
function getXssRequestObject(url,options) {
    var req = new  XssHttpRequest();
 
    options = options || {};
    // Default timeout of 30 sec
    options.timeout = options.timeout || 30000;

    req.onreadystatechange = function() {
        switch (req.readyState) {
            case 1:
                // Loading
                if(options.loadListener) {
                    options.loadListener.apply(req,arguments);
                }
                break;
            case 2:
                // Loaded
                if(options.loadedListener) {
                    options.loadedListener.apply(req,arguments);
                }
                break;
            case 3:
                // Interactive
                if(options.ineractiveListener) {
                    options.ineractiveListener.apply(req,arguments);
                }
                break;
            case 4:
                // Complete
                if (req.status == 1) {
                    // The request was successful
                    if(options.completeListener) {
                        options.completeListener.apply(req,arguments);
                    }
                } else {
                    // There was an error
                    if(options.errorListener) {
                        options.errorListener.apply(req,arguments);
                    }
                }
                break;
        }
    };
    req.open(url,options.timeout);
    
    return req;
}
window['ADS']['getXssRequestObject'] = getXssRequestObject;

/**
 * send an XssHttpRequest 
 */
function xssRequest(url,options) {
    var req = getXssRequestObject(url,options);
    return req.send(null);
}
window['ADS']['xssRequest'] = xssRequest;

/**
 * a helper method to make callbacks 
 */
function makeCallback(method, target) {
    return function() { method.apply(target,arguments); }
}

/**
 * A URL hash listener used to trigger 
 * registered methods based on hashes 
 */
var actionPager =  {
    // The previous hash
    lastHash : '',
    // A list of the methods registered for the hash patterns
    callbacks: [],
    // The safari history list
    safariHistory : false,
    // A reference to the iframe for Internet Explorer
    msieHistory: false,
    // The class name of the links that should be converted
    ajaxifyClassName: '',
    // The root URL of the application. This will be stripped off the URLS
    // when creating the hashes
    ajaxifyRoot: '',
    
    
    init: function(ajaxifyClass,ajaxifyRoot,startingHash) {

        this.ajaxifyClassName = ajaxifyClass || 'ADSActionLink';
        this.ajaxifyRoot = ajaxifyRoot || '';

        if (/Safari/i.test(navigator.userAgent)) {
            this.safariHistory = [];
        } else if (/MSIE/i.test(navigator.userAgent)) {
            // In the case of MSIE, add a iframe to track override the back button
            this.msieHistory = document.createElement("iframe");
            this.msieHistory.setAttribute("id", "msieHistory");
            this.msieHistory.setAttribute("name", "msieHistory");
            setStyleById(this.msieHistory,{
                'width':'100px',
                'height':'100px',
                'border':'1px solid black',
                'visibility':'visible',
                'zIndex':'-1'
            });
            document.body.appendChild(this.msieHistory);
            this.msieHistory = frames['msieHistory'];
            
        }

        // Convert the links to AJAX links
        this.ajaxifyLinks();

        // Get the current location
        var location = this.getLocation();

        // Check if the location has a hash (from a bookmark)
        // or if a hash has bee provided
        if(!location.hash && !startingHash) { startingHash = 'start'; }

        // Store the hash as necessary
        ajaxHash = this.getHashFromURL(location.hash) || startingHash;
        this.addBackButtonHash(ajaxHash);

        // Add a watching event to look for changes in the location bar
        var watcherCallback = makeCallback(this.watchLocationForChange,this);
        window.setInterval(watcherCallback,200);
    },
    ajaxifyLinks: function() {
        // Convert the links to anchors for ajax handling
        links = getElementsByClassName(this.ajaxifyClassName, 'a', document);
        for(var i=0 ; i < links.length ; i++) {
            if(hasClassName(links[i],'ADSActionPagerModified')) { continue; }
        
            // Convert the herf attribute to #value
            links[i].setAttribute(
                'href',
                this.convertURLToHash(links[i].getAttribute('href'))
            );
            addClassName(links[i],'ADSActionPagerModified');

            // Attach a click event to add history as necessary
            addEvent(links[i],'click',function() {
                 if (this.href && this.href.indexOf('#') > -1) {
                     actionPager.addBackButtonHash(
                        actionPager.getHashFromURL(this.href)
                    );
                 }
            });
        }
    },
    addBackButtonHash: function(ajaxHash) {
        // Store the hash
        if (!ajaxHash) return false;
        if (this.safariHistory !== false) {
            // Using a special array for Safari
            if (this.safariHistory.length == 0) {
                this.safariHistory[window.history.length] = ajaxHash;
            } else {
                this.safariHistory[window.history.length+1] = ajaxHash;
            }
            return true;
        } else if (this.msieHistory !== false) {
            // By navigating the iframe in MSIE
            this.msieHistory.document.execCommand('Stop');
            this.msieHistory.location.href = '/fakepage?hash='
                + ajaxHash
                + '&title='+document.title;
            return true;
        } else {
            // By changing the location value
            // The function is wrapped using makeCallback so that this 
            // will refer to the actionPager from within the timeout method
            var timeoutCallback = makeCallback(function() {
                if (this.getHashFromURL(window.location.href) != ajaxHash) {
                    window.location.replace(location.href+'#'+ajaxHash);
                }
            },this);
            setTimeout(timeoutCallback, 200);
            return true;
        }
        return false;
    },
    watchLocationForChange: function() {
        
        var newHash;
        // Retrieve the value for the new hash
        if (this.safariHistory !== false) {
            // From the history array for safari
            if (this.safariHistory[history.length]) {
                newHash = this.safariHistory[history.length];
            }
        } else if (this.msieHistory !== false) {
            // From the location of the iframe in MSIE
            newHash = this.msieHistory.location.href.split('&')[0].split('=')[1];
        } else if (location.hash != '') {
            // From the window.location otherwise
            newHash = this.getHashFromURL(window.location.href);

        }

        // Update the page if the new hash doesn't equal the last hash
        if (newHash && this.lastHash != newHash) {
            if (this.msieHistory !== false 
            && this.getHashFromURL(window.location.href) != newHash) {
                // Fix the location bar in MSIE so it bookmarks properly
                location.hash = newHash;
            }
            
            // Try executing any registered listeners
            // using try/catch incase of an exception
            try {
                this.executeListeners(newHash);
                // Update the links again incase any new
                // ones were added with the handler
                this.ajaxifyLinks();
            } catch(e) {
                // This will catch any bad JS in the callbacks.
                alert(e);
            }
            
            // Save this as the last hash
            this.lastHash = newHash;
        }
    },
    register: function(regex,method,context){
        var obj = {'regex':regex};
        if(context) {
            // A context has been specified
            obj.callback = function(matches) { method.apply(context,matches); };
        } else {
            // Use the window as the context
            obj.callback = function(matches) { method.apply(window,matches); };
        }
        
        // Add listeners to the callback array
        this.callbacks.push(obj)
    },
    convertURLToHash: function(url) {
        if (!url) {
            // No url so return a pound
            return '#';
        } else if(url.indexOf("#") != -1) {
            // Has a hash so return it
            return url.split("#")[1];
        } else {
            // If the URL includes the domain name (MSIE) strip it off.
            if(url.indexOf("://") != -1) {
                url = url.match(/:\/\/[^\/]+(.*)/)[1];
            }
            // Strip off the root as specified in init()
            return '#' + url.substr(this.ajaxifyRoot.length)
        }
    },
    getHashFromURL: function(url) {
        if (!url || url.indexOf("#") == -1) { return ''; }
        return url.split("#")[1];
    },
    getLocation: function() {
        // Check for a hash
        if(!window.location.hash) {
            // Not one so make it
            var url = {host:null,hash:null}
            if (window.location.href.indexOf("#") > -1) {
                parts = window.location.href.split("#")[1];
                url.domain = parts[0];
                url.hash = parts[1];
            } else {
                url.domain = window.location;
            }
            return url;
        }
        return window.location;
    },
    executeListeners: function(hash){
        // Execute any listeners that match the hash
        for(var i in this.callbacks) {
            if((matches = hash.match(this.callbacks[i].regex))) {
                this.callbacks[i].callback(matches);
            }
        }
    }
}
window['ADS']['actionPager'] = actionPager;

/**
 * a helper method to clone a JavaScript object 
 */
function clone(myObj) {
    if(typeof(myObj) != 'object') return myObj;
    if(myObj == null) return myObj;
    var myNewObj = new Object();
    for(var i in myObj) {
        myNewObj[i] = clone(myObj[i]);
    }
    return myNewObj;
}

/**
 * An array to hold the queues 
 */
var requestQueue = [];

/**
 * Wrapper for the ADS.ajaxRequest method the enables a queue 
 */
function ajaxRequestQueue(url,options,queue) {
    queue = queue || 'default';
    
    // This object will wrap the option listeners in another function
    // so the option object needs to be unique. If a shared options object 
    // is used when the method is call it will get into a recursive mess.
    options = clone(options) || {};
    if(!requestQueue[queue]) requestQueue[queue] = [];
     
    // The queue needs to invoke the next request using the completeListener
    // when the previous request is complete. If the complete listener is 
    // already defined then you need to invoke it first.
    
    // Grab the old listener
    var userCompleteListener = options.completeListener;

    // Add a new listener
    options.completeListener = function() {
        
        // If there was an old one invoke it first
        if(userCompleteListener) {
            // this will refer to the request object
            userCompleteListener.apply(this,arguments);        
        };

        // Remove this request from the queue
        requestQueue[queue].shift();
        
        // Invoke the next item in the queue
        if(requestQueue[queue][0]) {
            // The request is in the req property but you alos need to include
            // the send option incase it's a POST request
            var q = requestQueue[queue][0].req.send(
                requestQueue[queue][0].send
            );
        }
    }
    
    // If there's an error the rest of the queue should be cancelled
    // by calling their error methods
    
    // Grab the old listener
    var userErrorListener = options.errorListener;

    // Add a new listener
    options.errorListener = function() {
    
        if(userErrorListener) {
            userErrorListener.apply(this,arguments);        
        };
        
        // Remove this request from the queue as the error 
        // was already invoked
        requestQueue[queue].shift();
        
        // Kill the rest of the queue as there was an error but call the
        // errorListener on each first. By invoking the error listener on
        // the next item in the queue it will clear all queued requests as
        // as each will invoke the next in a chain
        
        // Check if there is still anything in the queue
        if(requestQueue[queue].length) {
            
            // Grab the next one
            var q = requestQueue[queue].shift();

            // Abort the request.
            q.req.abort();
            
            // Fake a request object so that the errorListener thinks it
            // completed and runs accordingly

            var fakeRequest = new Object();
            
            // Set the status to 0 and readyState to 4 (as if 
            // the request completed but failed
            fakeRequest.status = 0;
            fakeRequest.readyState = 4

            fakeRequest.responseText = null;
            fakeRequest.responseXML = null;

            // Set an error so you can show a message if you wish.
            fakeRequest.statusText = 'A request in the queue received an error';

            // Invoke the state change. If readyState is 4 and 
            // status is not 200 then errorListener will be invoked.
            q.error.apply(fakeRequest);
        }
       
    }
    
    // Add this requests to the queue
    requestQueue[queue].push({
        req:getRequestObject(url,options),
        send:options.send,
        error:options.errorListener
    });


    // If the length of the queue is only one 
    // item (the first) invoke the request    
    if(requestQueue[queue].length == 1) {
        ajaxRequest(url,options);
    }
}
window['ADS']['ajaxRequestQueue'] = ajaxRequestQueue;

/********************************
* Chapter 7 thru 12
*********************************/
//nothing added to the library

})();


