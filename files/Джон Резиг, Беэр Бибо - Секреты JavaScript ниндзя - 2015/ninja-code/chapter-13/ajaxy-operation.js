function performAjaxOperation(target) {

  triggerEvent(target,'ajax-start');

  window.setTimeout(function(){
    triggerEvent(target,'ajax-complete')
  },5000);

}
