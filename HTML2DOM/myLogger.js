/**
 * myLogger Javascript object example
 * 
 * @author Jeffrey Sambells <jeff@advanceddomscripting.com>
 * @param {String} id The id to attache to the DOM Node
 * @version $Id$
 */
function myLogger(id) {

	/**
	 * The id of the root DIV surrounding the window.
	 */
	id = id || 'ADSLogWindow';
	
	/** Protected property to hold the instance of the log 
	 * window DOM node
	 */
	var logWindow = null;

	/**
	 * Protected method to create the log window
	 * in the logWindow property
	 */
	var createWindow = function () {

		// Get the left and top position for the new window
		// so it's centered in the browser
		var browserWindowSize = ADS.getBrowserWindowSize();
		var top = ((browserWindowSize.height - 200) / 2) || 0;
		var left = ((browserWindowSize.width - 200) / 2) || 0;

		// Create the DOM node for the log window using the
		// protected logWindow property to maintain a reference
		logWindow = document.createElement('UL');

		// Assign an ID so you can identify it in the DOM tree if necessary
		logWindow.setAttribute('id', id);

		// Position it centered on the screen
		logWindow.style.position = 'absolute';
		logWindow.style.top = top + 'px';
		logWindow.style.left = left + 'px';

		// Give it a fixed size and allow scrolling
		logWindow.style.width = '200px';
		logWindow.style.height = '200px';
		logWindow.style.overflow = 'scroll';

		// Add some style to make it look a little nicer
		logWindow.style.padding= '0';
		logWindow.style.margin= '0';
		logWindow.style.border= '1px solid black';
		logWindow.style.backgroundColor= 'white';
		logWindow.style.listStyle= 'none';
		logWindow.style.font= '10px/10px Verdana, Tahoma, Sans';

		// Append it to the body
		document.body.appendChild(logWindow);

	};

	/**
	 * Privledged method to write a raw entry to the log window.
	 * This will not encode the message.
	 * @param {String} message The item to log.
	 */
	this.writeRaw = function (message) {

		// If the initial window doesn't exist, create it.
		if(!logWindow) createWindow();

		// Create the list item and style it appropriately
		var li = document.createElement('LI');
		li.style.padding= '2px';
		li.style.border= '0';
		li.style.borderBottom = '1px dotted black';
		li.style.margin= '0';
		li.style.color= '#000';
		li.style.font = '9px/9px Verdana, Tahoma, Sans';

		// Add the message to the log node
		if(typeof message == 'undefined') {
			li.appendchild(document.createTextNode('Message was undefined'));
		} else if(typeof li.innerHTML != undefined) {
			li.innerHTML = message;
		} else {
			li.appendchild(document.createTextNode(message));
		}

		// Append this entry to the log window
		logWindow.appendChild(li);

		return this;
	};

}

/**
 * The myLogger prototype public methods
 */
myLogger.prototype = {

	/** 
	 * Writes a write a partially encoded version of the message to the log window.
	 * If the message is not a String, the toString method will be 
	 * called on the object. If no toString() method exists, the typof
	 * will be logged.
	 * @param {Object} message
	 */
	write: function (message) {
		// warn about null messages
		if(typeof message == 'string' && message.length==0) {
			return this.writeRaw('ADS.log: null message');
		}

		// if the message isn't a string try to call the toString() method,
		// if it doesn't exist simply log the type of object
		if (typeof message != 'string') {
			if(message.toString) return this.writeRaw(message.toString());
			else return this.writeRaw(typeof message);
		}

		// transform < and > so that .innerHTML doesn't parse the message as HTML
		message = message.replace(/</g,"&lt;").replace(/>/g,"&gt;");

		return this.writeRaw(message);
	},


	/**
	 * Writes a simple header to the log window.
	 */ 
	header: function (message) {
		message = '<span style="color:white;background-color:black;font-weight:bold;padding:0px 5px;">' + message + '</span>';
		return this.writeRaw(message);
	}

};

// Create an itial instance of the log object as ADSLog
if(!window.ADS) { window['ADS'] = {}; }
window['ADS']['log'] = new myLogger();
if(!console) var console = ADS.log;

