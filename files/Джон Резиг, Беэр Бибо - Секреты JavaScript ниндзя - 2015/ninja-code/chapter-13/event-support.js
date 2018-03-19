function isEventSupported(eventName) {

  var element = document.createElement('div'),          //#1
      isSupported;

  eventName = 'on' + eventName;                         //#2
  isSupported = (eventName in element);                 //#2

  if (!isSupported) {                                   //#3
    element.setAttribute(eventName, 'return;');
    isSupported = typeof element[eventName] == 'function';
  }

  element = null;                                        //#4

  return isSupported;
}
