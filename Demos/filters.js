Element.behaviors.red = function(){
	this.setStyle('color', 'red');
};

Element.behaviors.pulse = function(){
	var periodical
	, tween = new Fx.Tween(this, { property: 'opacity', link: 'chain' })
	, pulse = function(){ tween.start(0).start(1) }
	, start = function(){ periodical = pulse.periodical(1000) }
	, stop  = function(){ tween.cancel(); clearInterval(periodical) };
	start();
	return { tween: tween, start: start, stop: stop };
};

window.addEvent('domready', function(){
	Element.behaviors.filterNow();
});