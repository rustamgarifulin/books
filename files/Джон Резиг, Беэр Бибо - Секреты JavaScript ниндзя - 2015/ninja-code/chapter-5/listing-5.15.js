function wrap(object, method, wrapper) {                        //#1

  var fn = object[method];                                      //#2

  return object[method] = function() {                          //#3
    return wrapper.apply(this, [fn.bind(this)].concat(
        Array.prototype.slice.call(arguments)));
  };
}

// Example adapted from Prototype
if (Prototype.Browser.Opera) {                                 //#4

  wrap(Element.Methods, "readAttribute",                       //#5
       function(original, elem, attr) {
    return attr == "title" ?
        elem.title :
        original(elem, attr);
  });

}
