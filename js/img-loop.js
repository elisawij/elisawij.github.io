var loop;  // Declare it on global scope.

$('img.img-loop')
    .mouseover(function() {
    $(this).data('old-src', $(this).attr('src'));
    var alt_src = $(this).data('alt-src').split(';');
    var that = $(this);
    var i=0;
    loop = setInterval(function(){  // Set an interval
        if(i==alt_src.length){
            i=0;
            that.attr("src", that.data('old-src'));
        }else{
            that.attr('src', alt_src[i]);
            i++;
        }
    },600);  // Interval delay in millisecs.
})
    .mouseout(function() {
    clearInterval(loop);  // Clear the interval
    $(this).attr('src', $(this).data('old-src'));
});