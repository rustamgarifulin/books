this.removeEvent = function (elem, type, fn) {      // #1

  var data = getData(elem);                          //#2

  if (!data.handlers) return;                        //#3

  var removeType = function(t){                      //#4
      data.handlers[t] = [];
    tidyUp(elem,t);
  };

  if (!type) {                                       //#5
    for (var t in data.handlers) removeType(t);
    return;
  }

  var handlers = data.handlers[type];              //#6
      if (!handlers) return;

  if (!fn) {                                          //#7
    removeType(type);
    return;
  }

  if (fn.guid) {                              //#8
    for (var n = 0; n < handlers.length; n++) {
      if (handlers[n].guid === fn.guid) {
        handlers.splice(n--, 1);
      }
    }
  }
  tidyUp(elem, type);
};
