Function.prototype.partial = function() {
  var fn = this, args = Array.prototype.slice.call(arguments);
  return function() {
    var arg = 0;
    for (var i = 0; i < args.length && arg < arguments.length; i++) {
      if (args[i] === undefined) {
        args[i] = arguments[arg++];
      }
    }
    return fn.apply(this, args);
  };
};

Function.prototype.partialNew = function() {
  var fn = this, args = Array.prototype.slice.call(arguments);
  return function() {
    var arg = 0, iargs = args.slice();
    for (var i = 0; i < args.length && arg < arguments.length; i++) {
      if (args[ i ] === undefined) {
        iargs[ i ] = arguments[arg++];
      }
    }
    return fn.apply(this, iargs);
  };
};
