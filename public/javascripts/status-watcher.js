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
      $('#build').html("DEPLOY TO STAGING");
      break;
      
    case ("failed"):
      $('#build').html("BUILD FAILED!");
      $('#build').attr('disabled', true);
      break;
      
    case ("building"):
      $('#build').html("RUNNING ACCEPTANCE TESTS");
      $('#build').attr('disabled', true);
      break;
      
    case ("deploying"):
      $('#build').html("DEPLOYING APPLICATION");
      $('#build').attr('disabled', true);
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

$("#build").click(function (){
  $('#build').html("DEPLOYING...");
  $('#build').stripClasses().addClass("deploying").attr('disabled', true);
  $.getJSON('/status.json', function(data) {
    $.ajax({
      type: 'post',
      url: "/deploy", 
      data: { 'status': "deploying", 'last_built': data['last_built'] },
      success: function(){
        $('#build').html("DEPLOYED!");
        $('#build').addClass("deployed").attr('disabled', false);
      }
    });
  });
});

jQuery( function() {
  checkStatus();
});