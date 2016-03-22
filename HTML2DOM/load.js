// Add a load event to the page to register event listeners
ADS.addEvent(window, 'load', function() {

    // Register a click event listener on the button
    ADS.addEvent('generate','click', function(W3CEvent) {
        
        // Retrieve the HTML source
        var source = ADS.$('source').value;     
        
        // Convert the HTML to DOM and put it in the #result textarea
        ADS.$('result').value = generateDOM(source);
                
    });

});