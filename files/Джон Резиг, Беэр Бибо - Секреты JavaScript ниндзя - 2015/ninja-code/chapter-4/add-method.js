function addMethod(object, name, fn) {
  var old = object[name];                        //#1
  object[name] = function(){
    if (fn.length == arguments.length)           //#2
      return fn.apply(this, arguments)           //#2
    else if (typeof old == 'function')           //#3
      return old.apply(this, arguments);         //#3
  };
}
