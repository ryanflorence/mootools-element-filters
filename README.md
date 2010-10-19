Element.Behaviors
================

A declarative approach to element behavior.

Detach your JavaScript from the DOM with Element.Behaviors.  This gives you a declarative interface to describe the way elements behave.

### JavaScript

    Element.behaviors.pulse = function(){
    	var periodical
    	, tween = new Fx.Tween(this, { property: 'opacity', link: 'chain' })
    	, pulse = function(){ tween.start(0).start(1) }
    	, start = function() { periodical = pulse.periodical(1000) }
    	, stop = function(){ tween.cancel(); clearInterval(periodical) };
    	start();
    	return { tween: tween, start: start, stop: stop };
    };
    
    Element.behaviors.red = function(){
    	this.setStyle('color', 'red');
    };

### HTML

Now, simply add `pulse` and/or `red` to the `data-filter` attribute of any element you want to apply this behavior to.

    <div data-filter=red>I should be red</div>
    <div data-filter="red pulse">I should pulse and be red</div>

### Tips

- You can add more data attributes to pull in to the filter function.
- Create a file in your application called `filters.js` or `behaviors.js` so that all of your DOM behaviors are in one place.