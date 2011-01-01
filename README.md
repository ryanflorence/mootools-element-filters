Element.Behaviors
================

Detach your JavaScript from the DOM with Element.Behaviors. Describe the way elements are affected by JavaScript with a declarative interface.

This is perfect for creating widgets out of elements.  It can also serve as an alternative to structuring your application with a lot of classes.  Write quick, bang-it-out-domready code that's still organized into testable, portable code blocks--not necessarily recommended, just be careful :)

How to use
----------

### HTML

Element.Behaviors picks up information from the `data-filter` attribute of an element.  In this example we'll use `pulse` and `gray`.  

    <div
    	data-filter="pulse pulse:pulse-two gray"
    	data-pulse='{"duration":2000,"property":"opacity","from":0,"to":1}'
    	data-pulse-two='{"duration":415,"property":"color","from":"#f00","to":"#32c"}'>
    	I should pulse my opacity, and my color on different intervals, and have a gray background
    </div>

You can pass options in to the filter by

1. creating a `data-match-filter-name` attribute like `data-pulse` or
2. specify the `data` attribute your options are stored on like `pulse:pulse-two`.

This allows you to use the same filter multiple times with different arguments.

### JavaScript

The JSON in your data attributes are parsed into an object and passed to the filter.  The context of the filter (`this`) is the element.

    Element.behaviors.pulse = function(options){
      var periodical, 
          tween = new Fx.Tween(this, {
            property: options.property,
            link: 'chain',
            duration: options.duration / 2
          });

      function pulse(){ tween.start(options.from).start(options.to) }
      function start(){ pulse(); periodical = pulse.periodical(options.duration) }
      function stop(){ tween.cancel(); clearInterval(periodical) }

      start();
      return { tween: tween, start: start, stop: stop };
    };
    
    Element.behaviors.gray = function(){
      this.setStyle('color', '#cccccc');
    };

You need to call `filterNow` for any of this to work.  Note that if an element has already had a filter applied to it, it won't apply that filter more than once, even if `filterNow` is called many times.

    document.addEvent('domready', Element.behaviors.filterNow);

### Return something useful

When your element is filtered, anything a behavior returns will be stored on the element to retrieve later if you need it.

    Element.behaviors.something = function(){
      return 'ftw';
    };
    el.retrieve('behavior-something'); // => 'ftw'

You can also use this for garbage collection when you destroy an element.
