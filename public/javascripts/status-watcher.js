function checkStatus() {
  $.getJSON('/status.json', function(data) {
    console.log(data['status']);
    updateButton(data['status'], data['last_built']);
  });
  
  setTimeout(function() {
    checkStatus();
  }, 6000);
}

function updateButton(build_status, last_built_on) {
  $('#build').stripClasses().addClass(build_status);
  $('#last_deployed').html("Last built on "+last_built_on);
  switch(build_status) {
    case ("built"):
      $('#build').html("DEPLOY");
      break;
      
    case ("failed"):
      $('#build').html("FAILED!");
      break;
      
    case ("building"):
      $('#build').html("TESTING...");
      break;
  }
}

jQuery.fn.stripClasses = function() {
  var classList = $(this).attr('class').split(/\s+/);
  for (i = 0; i < classList.length; i++) {
    if(classList[i].length > 0 && classList[i] != 'deployment' ){
      $(this).removeClass(classList[i]).attr('disabled', false);
    }
  }
  return this;
};

jQuery( function() {
  checkStatus();
});