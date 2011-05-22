jQuery( function() {
  $("#build").click(function (){
    $.post("deploy", { 'status': "deploying" } );    
  })
});