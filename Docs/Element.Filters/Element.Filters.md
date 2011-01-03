Type: Element {#Element}
========================

Element Filters extends the Element object and prototype with new methods to provide a flexible API for declarative HTML / JavaScript interaction.

Function: Element.defineFilter {#Element:defineFilter}
------------------------------------------------------

Defines a new element filter.

### Syntax:

	Element.defineFilter(name, fn);

### Arguments:

1. name  - (*string*) The name of the filter to be used in your HTML.
2. fn    - (*function*) The function to run when an element applies this filter.

Can also pass in an object of `name:fn` pairs.

#### Argument: fn

##### Syntax:

	fn(options)

##### Arguments:

1. options  - (*object*) An options object, usually parsed from an attribute on the element.

### Example:

	Element.defineFilter('draggable', function(options){
		return new Drag(this, options);
	});

### Notes:

Whatever is returned is stored on the element as 'filter:[name]'.  For example, building on the last example:

	$('el').retrieve('filter:draggable'); // the Drag instance

Function: Element.defineFilters {#Element:defineFilters}
--------------------------------------------------------

Same as Element.defineFilter but takes multiple filters as a single object of key : values.

### Syntax:

	Element.defineFilters(filters);

### Arguments:

1. filters  - (*object*) Key value map of filters

### Example:

	Element.defineFilters({
		foo: function(){
			this.set('text', 'foo');
		},
		bar: function(){
			this.set('text', 'bar');
		}
	})

Function: Element.lookupFilter {#Element:lookupFilter}
------------------------------------------------------

Returns the function of the requested filter

### Syntax:

	Element.lookupFilter(name);

### Arguments:

1. name  - (*string*) The name of the filter to look up.

### Example:

	Element.lookupFilter('draggable'); // returns draggable filter function





Array method: each {#Array:each}
---------------------------------

Calls a function for each element in the array.

### Syntax:

	myArray.each(fn[, bind]);

### Arguments:

1. fn   - (*function*) The function which should be executed on each item in the array. This function is passed the item and its index in the array.
2. bind - (*object*, optional) The object to be used as 'this' in the function. For more information see [Function:bind][].

#### Argument: fn

##### Syntax

	fn(item, index, array)

##### Arguments:

1. item   - (*mixed*) The current item in the array.
2. index  - (*number*) The current item's index in the array.
3. array  - (*array*) The actual array.

### Examples:

	//Alerts "0 = apple", "1 = banana", and so on:
	['apple', 'banana', 'lemon'].each(function(item, index){
		alert(index + " = " + item);
	}); //The optional second argument for binding isn't used here.


### See Also:

- [Array.each](#Array:Array-each)
- [MDC Array:forEach][]

### Notes:

- This method is only available for browsers without native [MDC Array:forEach][] support.

