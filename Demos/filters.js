Object.append(Element.behaviors, {

	pulse: function(options){
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
	},

	gray: function(){
		this.setStyle('background', '#cccccc');
	}

});


window.addEvent('domready', Element.behaviors.filterNow);