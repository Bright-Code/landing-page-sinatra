jQuery(function($){
  $("form").submit(function(e){
     e.preventDefault();
     $.ajax({
       type: "POST",
       url: $(this).attr('action'),
       data: $(this).serialize(),
       success: function(data){
         $("body").append(data).fadeIn(500);;
         $("div[id=flash]").delay(5000).fadeOut(300, function() { $(this).remove(); });
       }
     });
  });
});