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
  switch(build_status) {
    case ("built"):
      $('#last_deployed').html("Last built at "+last_built_on);
    case ("deployed"):
      $('#last_deployed').html("Last deployed at "+last_built_on);
      $('#build').html("DEPLOY");
      break;
      
    case ("failed"):
      $('#build').html("FAILED!");
      break;
      
    case ("building"):
      $('#build').html("BUILDING...");
      break;
      
    case ("deploying"):
      $('#build').html("DEPLOYING...");
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