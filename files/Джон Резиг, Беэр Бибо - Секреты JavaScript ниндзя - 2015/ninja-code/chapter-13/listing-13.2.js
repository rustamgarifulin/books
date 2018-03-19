addEvent(window, "load", function () {                       //#1

  var elems = document.getElementsByTagName("div");          //#2

  for (var i = 0; i < elems.length; i++) (function (elem) {
    var handler = addEvent(elem, "click", function () {      //#3
      this.style.backgroundColor =
          this.style.backgroundColor == '' ? 'green' : '';
      removeEvent(elem, "click", handler);                   //#4
    });
  })(elems[i]);

});
