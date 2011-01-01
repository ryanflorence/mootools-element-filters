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
		element.get('data-filter').split(/ +|\t+|\n+/).each(function(raw){
			var split = raw.split(':'),
			    filter = split[0],
			    options = JSON.parse((element.get('data-' + (split[1] || filter))) || '{}');
			if (raw == '' || element.retrieve('behavior-' + raw)) return;
			if (!Element.behaviors[filter]) throw new Error('Filter `' + filter + '` is undefined');
			element.store('behavior-' + raw, Element.behaviors[filter].apply(element, [options]) || true);
		});
	});
};
