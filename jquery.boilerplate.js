/*
 *  Project: 
 *  Description: 
 *  Author: 
 *  License: 
 */

// the semi-colon before function invocation is a safety net against concatenated 
// scripts and/or other plugins which may not be closed properly.
;(function ( $, window, undefined ) {
    
    // undefined is used here as the undefined global variable in ECMAScript 3 is
    // mutable (ie. it can be changed by someone else). undefined isn't really being
    // passed in so we can ensure the value of it is truly undefined. In ES5, undefined
    // can no longer be modified.
    
    // window is passed through as local variable rather than global
    // as this (slightly) quickens the resolution process and can be more efficiently
    // minified (especially when both are regularly referenced in your plugin).

    // Create the defaults once
    var pluginName = 'defaultPluginName',
        document = window.document,
        defaults = {
            propertyName: "value"
        };

    // The actual plugin constructor
    function Plugin( element, options ) {
        this.element = element;

        // jQuery has an extend method which merges the contents of two or 
        // more objects, storing the result in the first object. The first object
        // is generally empty as we don't want to alter the default options for
        // future instances of the plugin
        this.options = $.extend( {}, defaults, options) ;
        
        this._defaults = defaults;
        this._name = pluginName;
        
        this.init();
    }

    Plugin.prototype.init = function () {
        // Place initialization logic here
        // You already have access to the DOM element and the options via the instance, 
        // e.g., this.element and this.options
    };

    // A really lightweight plugin wrapper around the constructor, 
    // preventing against multiple instantiations, and allowing
    // method calls to the object, like jQuery plugins NORMALLY DO.
    $.fn[pluginName] = function(options){
        if ($(this).length == 0) return false;
    	var isMethodCall = (typeof options == 'string'),
    		args = Array.prototype.slice.call(arguments, 1);
    	// prevent calls to internal methods
    	if (isMethodCall && options.substring(0, 1) == '_') {
    		return this;
    	}
    	// handle initialization and non-getter methods
    	return this.each(function() {
    		var instance = $(this).data(pluginName);
    		// constructor
    		(!instance && !isMethodCall &&
    			$(this).data(pluginName, new Plugin(this, options)));

    		// method call
    		(instance && isMethodCall && $.isFunction(instance[options]) &&
    			instance[options].apply(instance, args));
    	});
    }

}(jQuery, window));