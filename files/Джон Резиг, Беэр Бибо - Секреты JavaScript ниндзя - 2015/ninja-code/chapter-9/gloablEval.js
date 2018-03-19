function globalEval(data) {
  data = data.replace(/^\s*|\s*$/g, "");
  if (data) {
    var head = document.getElementsByTagName("head")[0] ||
               document.documentElement,
        script = document.createElement("script");
    script.type = "text/javascript";
    script.text = data;
    head.appendChild(script);
    head.removeChild(script);
  }
}
