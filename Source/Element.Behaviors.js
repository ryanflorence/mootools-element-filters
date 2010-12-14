/*
---

name: Element.Behaviors

license: MIT-style license.

copyright: Copyright (c) 2010 [Ryan Florence](http://ryanflorence.com/).

author: Ryan Florence

requires:
  - Core/Element

provides: [Element.Behaviors]

...
*/
Element.behaviors = {};
Element.behaviors.filterNow = function(){
	$$('[data-filter]').each(function(element){
		var filters = element.get('data-filter');
		Slick.parse(filters).expressions.each(function(slick){
			var expression = slick[0],
				filter = expression.tag,
				pseudos = expression.pseudos,
				options = {};
			if (!Element.behaviors[filter] || element.retrieve('behavior-' + filter)) return;
			if (pseudos) for (var i = pseudos.length - 1; i >= 0; i--) options[pseudos[i].key] = pseudos[i].value;
			element.store('behavior-' + filter, Element.behaviors[filter].apply(element, [options, slick]) || true);
		});
	});
};
