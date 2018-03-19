function tidyUp(elem, type) {

  function isEmpty(object) {                         //#1
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

  if (isEmpty(data.handlers)) {                        //#3
    delete data.handlers;
    delete data.dispatcher;
  }

  if (isEmpty(data)) {                                 //#4
    removeData(elem);
  }
}
