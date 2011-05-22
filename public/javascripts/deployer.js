jQuery( function() {
  $("#build").click(function (){
    $.post("build.json", { 'status': "deploying" } );    
  })
});