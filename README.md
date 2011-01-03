Element Filters
===============

Detach your JavaScript from the DOM with Element Filters. Describe the way elements are affected by JavaScript with a declarative interface.

This is perfect for creating widgets out of elements.  Thing about the video tag, the browser sees that it's a special element, then applies some new styling and behavior to it.  You can now make any element into something more awesome.

This pattern can also serve as an alternative application structure.  Write quick, bang-it-out domready code that's still organized into testable, portable code blocks--not necessarily recommended just be careful :)

How to use
----------

### Declarative HTML

Element Filters figures which filters to apply from the `data-filter` attribute of an element.  Also, you can pass options to the filters on other attributes.  In this example we'll use `pulse` and `gray`.  

    #HTML
    <div data-filter="pulse pulse:pulse-two gray"

      data-pulse='{
        "duration":2000,
        "property":"opacity",
        "from":0,
        "to":1 
      }'

      data-pulse-two='{
        "duration":415,
        "property":"color",
        "from":"#f00",
        "to":"#32c"
      }'
    >
      I should pulse my opacity, and my color on different intervals, and have a gray background
    </div>

You can pass options into the filter by

1. creating a `data` attribute that matches the filter name like `data-pulse` or
2. specify the `data` attribute your options are stored on: `pulse:pulse-two` looks for `data-pulse-two`.

This allows you to have multiple instances of the same filter applied to a single element.

### Filters: JavaScript

The JSON options in your data attributes are parsed into an object and passed to the filter.  The context of the filter, `this`, is the element.

    #JS
    Element.defineFilter('pulse', function(options){
      var tween = new Fx.Tween(this, {
        property: options.property,
        link: 'chain',
        duration: options.duration / 2
      });

      function pulse(){ tween.start(options.from).start(options.to) }
      pulse();

      this.addEvent('destroy', function(){
        clearInterval(periodical);
      });

      return {
        pulse: pulse, 
        periodical: pulse.periodical(options.duration)
      };
    });
    
    Element.defineFilter('gray', function(){
      this.setStyle('color', '#cccccc');
    });

### Apply the filters: JavaScript

You need to apply the filters for anything to work. call `Element.applyFilters` for any of this to work.  Note that if an element has already had a filter (or filter:ops) applied to it, it won't apply that filter (or filter:ops) more than once, even if `Element.applyFilters` is called many times (like in XHR complete events).

    document.addEvent('domready', Element.applyFilters);

### Return something useful

When your element is filtered, anything a filter returns will be stored on the element to retrieve later if you need it as `behavior:` + the raw filter.

    <div data-filter="something something:ops"
      data-something='{"foo":"FTW"}'
      data-ops='{"foo":"FMW"}'></div>

    Element.defineFilter('something', function(){
      return 'ftw';
    });
    
    el.retrieve('behavior:something'); // => 'FTW'
    el.retrieve('behavior:something:ops'); // => 'FMW'

### Element onDestroy Event

Sometimes you need to garbage collect when your elements are destroyed (like periodicals found in the pulse example).  Element Filters extends the Element `destroy` method providing a destroy event.
