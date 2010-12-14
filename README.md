Element.Behaviors
================

Detach your JavaScript from the DOM with Element.Behaviors. Describe the way elements are affected by JavaScript with a declarative interface.

This can also serve as an alternative to structuring your application with a lot of classes.  Write quick, bang-it-out-domready code that's still organized into testable, portable code blocks--though not always recommended, just be careful :)

How to use
----------

### HTML

Element.Behaviors picks up information from the `data-filter` attribute of an element.  In this example we'll use `pulse` and `gray`.  

Note that the attribute is parsed by Slick, which means your value will resemble a CSS selector:

- Multiple filters should be separated by commas.  
- Pseudo "selectors" on first expression get combined and passed into your filter as a key:value options object.
- The CSS selector "tag" equivalent is the the filter.
- The Slick object is passed in as the third argument, though not expected to be very useful, one of you will come up with something whacky.  `who.knows > what[you=would]:do(with) ! all#this`.

After all that nonsense, it's quite simple:

    <div data-filter=gray>
      I should be gray
    </div>
    
    <div data-filter="pulse:duration(4000):property(opacity), gray">
      I should pulse every 4 seconds and be gray
    </div>

### JavaScript

Ideally your filters live outside of the application in an `app.js` or something similar.

    Element.behaviors.pulse = function(options){
      // options looks like `{duration: 4000, property: 'opacity'}`
      // `this` is the element

      var periodical, 
          tween = new Fx.Tween(this, { 
            property: options.property, 
            link: 'chain', 
            duration: options.duration / 2 
          }),
          pulse = function(){ tween.start(0).start(1) }, 
          start = function(){ periodical = pulse.periodical(options.duration) },
          stop  = function(){ tween.cancel(); clearInterval(periodical) };
    
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
