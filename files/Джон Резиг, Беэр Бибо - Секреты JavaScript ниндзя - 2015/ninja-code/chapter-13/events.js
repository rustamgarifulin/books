(function() {

  var nextGuid = 1;

  this.addEvent = function (elem, type, fn) {

    var data = getData(elem);                           //#1

    if (!data.handlers) data.handlers = {};             //#2

    if (!data.handlers[type])                           //#3
      data.handlers[type] = [];                         //#3

    if (!fn.guid) fn.guid = nextGuid++;                 //#4

    data.handlers[type].push(fn);                       //#5

    if (!data.dispatcher) {                             //#6
      data.disabled = false;
      data.dispatcher = function (event) {

        if (data.disabled) return;
        event = fixEvent(event);

        var handlers = data.handlers[event.type];       //#7
        if (handlers) {
          for (var n = 0; n < handlers.length; n++) {   //#7
            handlers[n].call(elem, event);              //#7
          }
        }
      };
    }

    if (data.handlers[type].length == 1) {              //#8
      if (document.addEventListener) {
        elem.addEventListener(type, data.dispatcher, false);
      }
      else if (document.attachEvent) {
        elem.attachEvent("on" + type, data.dispatcher);
      }
    }

  };

  function tidyUp(elem, type) {

    function isEmpty(object) {                          //#1
      for (var prop in object) {
        return false;
      }
      return true;
    }

    var data = getData(elem);

    if (data.handlers[type].length === 0) {             //#2

      delete data.handlers[type];

      if (document.removeEventListener) {
        elem.removeEventListener(type, data.dispatcher, false);
      }
      else if (document.detachEvent) {
        elem.detachEvent("on" + type, data.dispatcher);
      }
    }

    if (isEmpty(data.handlers)) {                        //#3 no types at all left?
      delete data.handlers;
      delete data.dispatcher;
    }

    if (isEmpty(data)) {                                 //#4 no handlers at all?
      removeData(elem);
    }
  }

  this.removeEvent = function (elem, type, fn) {       //#1 variable length argument list

    var data = getData(elem);                          //#2 fetch data

    if (!data.handlers) return;                        //#3 no handlers!

    var removeType = function(t){                      //#4 utility function
      data.handlers[t] = [];
      tidyUp(elem,t);
    };

    if (!type) {                                       //#5 remove all types
      for (var t in data.handlers) removeType(t);
      return;
    }

    var handlers = data.handlers[type];                 //#6 get handlers for type
    if (!handlers) return;

    if (!fn) {                                          //#7 remove all of type
      removeType(type);
      return;
    }

    if (fn.guid) {                                      //#8 remove one bound function?
      for (var n = 0; n < handlers.length; n++) {
        if (handlers[n].guid === fn.guid) {
          handlers.splice(n--, 1);
        }
      }
    }
    tidyUp(elem, type);

  };

  this.proxy = function (context, fn) {
    if (!fn.guid) {
      fn.guid = nextGuid++;
    }
    var ret = function () {
      return fn.apply(context, arguments);
    };
    ret.guid = fn.guid;
    return ret;
  };

})();
