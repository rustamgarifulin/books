Function.prototype.partial = function() {
  var fn = this, args = Array.prototype.slice.call(arguments);  //#1
  return function() {
    return fn.apply(this, args.concat(
      Array.prototype.slice.call(arguments)));
  };
};
