/*
---

name: Element.Filters

license: MIT-style license.

copyright: Copyright (c) 2010 [Ryan Florence](http://ryanflorence.com/).

author: Ryan Florence

requires:
  - Core/Element.Event

provides: [Element.Filters]

...
*/

;(function(){

var _filters = {},
    _options = {
    	attribute: 'data-filter',
    	optionsPrefix: 'data-',
    	parser: 'json'
    },
    _dispose = Element.prototype.dispose;

var _parsers = {
	json: function(params){
		return JSON.parse(params || '{}');
	}
};

Element.implement({

	applyFilter: function(raw, options){
		var split = raw.split(':'),
		    filter = split[0];
		if (!options) options = _parsers[_options.parser](this.get(_options.optionsPrefix + (split[1] || filter)));
		if (raw === '' || this.retrieve('filter:' + raw)) return this;
		if (!_filters[filter]) throw new Error('Filter `' + filter + '` is undefined');
		return this.store('filter:' + raw, _filters[filter].call(this, options) || true);
	},

	applyFilters: function(filters){
		var isArray = typeOf(filters) == 'array';
		(isArray ? Array : Object)['each'](filters, function(name, options){
			this.applyFilter(name, isArray ? null : options);
		}, this);
		return this;
	},

	dispose: function(){
		this.fireEvent('dispose');
		return _dispose.call(this);
	}

});

Object.append(Element, {

	defineFilter: function(name, fn){
		_filters[name] = fn;
		return this;
	},

	defineFilters: function(filters){
		for (i in filters) if (filters.hasOwnProperty(i)) Element.defineFilter(i, filters[i]);
	},

	lookupFilter: function(name){
		return _filters[name];
	},

	applyFilters: function(){
		$$('[' + _options.attribute + ']').each(function(element){
			element.applyFilters(
				element.get(_options.attribute).split(/ +|\t+|\n+/).filter(function(item){
					return item !== '';
				})
			);
		});
		return this;
	},

	setFilterOptions: function(options){
		Object.merge(_options, options);
		return this;
	},

	defineFilterParser: function(name, fn){
		_parsers[name] = fn;
		return this;
	}

});

}());
