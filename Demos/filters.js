Element.defineFilters({

	pulse: function(options){
		var tween = new Fx.Tween(this, {
			property: options.property,
			link: 'chain',
			duration: options.duration / 2
		});

		function pulse(){ tween.start(options.from).start(options.to) }
		pulse();

		return {
			pulse: pulse, 
			periodical: pulse.periodical(options.duration)
		};
	},

	gray: function(){
		this.setStyle('background', '#cccccc');
	}

});


document.addEvent('domready', Element.applyFilters);