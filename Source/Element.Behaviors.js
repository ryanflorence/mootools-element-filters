/*
---

name: Element.Behaviors

description: Declaratively create instances of Element based objects.

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
		element.get('data-filter').split(' ').each(function(filter){
			var filter = filter.trim();
			if (!Element.behaviors[filter] || element.retrieve('behavior-' + filter)) return;
			var returns = Element.behaviors[filter].apply(element)
			if (returns != null && returns != element) element.store('behavior-' + filter, returns);
		});
	});
};
