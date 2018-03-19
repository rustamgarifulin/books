function triggerEvent(elem, event) {

  var elemData = getData(elem),                         //#1 Fetch element data and parent reference.
      parent = elem.parentNode || elem.ownerDocument;

  if (typeof event === "string") {                      //#2 If passed as a string, create an event out out of it
    event = { type:event, target:elem };
  }
  event = fixEvent(event);                              //#3 Normalize the event

  if (elemData.dispatcher) {                             //#4 If the passed element has a dispatcher, execute the established handlers
    elemData.dispatcher.call(elem, event);
  }

  if (parent && !event.isPropagationStopped()) {        //#5 Unless explicitly stopped, recursively call this function to bubble the event up the DOM
    triggerEvent(parent, event);
  }

  else if (!parent && !event.isDefaultPrevented()) {    //#6 We're at the top of the DOM, so trigger the default action unless disabled

    var targetData = getData(event.target);

    if (event.target[event.type]) {                     //#7 If event has a default action for this event..

      targetData.disabled = true;                       //#8 Temporarily disable event dispatching on the target as we already executed the handler

      event.target[event.type]();                       //#9 Execute the default action

      targetData.disabled = false;                      //#10 Re-enable the delagator

    }

  }
}
