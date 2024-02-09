// $("img").on("mouseenter", function(){
//     $("#info-grad-1").show()
//   })
  
  
//   $("img").on("mouseleave", function(){
//     $("#info-grad-1").hide()
//   })

  $('div[data-id]').hover(function() {
    $('p[data-id=' + $(this).attr('data-id') + ']').show();
}, function() {
    $('p[data-id=' + $(this).attr('data-id') + ']').hide();
});