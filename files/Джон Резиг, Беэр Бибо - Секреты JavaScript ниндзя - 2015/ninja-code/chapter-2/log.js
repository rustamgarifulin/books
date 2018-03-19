function log() {
  try {
    console.log.apply(console, arguments);                  //#1
  }
  catch(e) {                                                //#2
    try {
      opera.postError.apply(opera, arguments);              //#3
    }
    catch(e){
      alert(Array.prototype.join.call( arguments, " "));    //#4
    }
  }
}
