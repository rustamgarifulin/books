(function(){

  var nextGuid = 1;

  this.addEvent = function (elem, type, fn) {

    var data = getData(elem);                           //#1

    if (!data.handlers) data.handlers = {};             //#2

    if (!data.handlers[type])                           //#3
    data.handlers[type] = [];                           //#3

    if (!fn.guid) fn.guid = nextGuid++;                 //#4

    data.handlers[type].push(fn);                       //#5

    if (!data.dispatcher) {                            // #6
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

})();
