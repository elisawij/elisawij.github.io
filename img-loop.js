// ----- loop specified images on hover ----- //

var loop // Declare it on global scope.

$('img.img-loop')
  .mouseover(function () {
    $(this).data('old-src', $(this).attr('src'))
    var alt_src = $(this).data('alt-src').split(';')
    var that = $(this)
    var i = 0
    loop = setInterval(function () {
      // Set an interval
      if (i == alt_src.length) {
        i = 0
        that.attr('src', that.data('old-src'))
      } else {
        that.attr('src', alt_src[i])
        i++
      }
    }, 600) // Interval delay in millisecs.
  })
  .mouseout(function () {
    clearInterval(loop) // Clear the interval
    $(this).attr('src', $(this).data('old-src'))
  })

// ----- navigation ----- //

// Function to check visibility of div#bio & div#contact
function checkVisibility() {
  $('.nav button').each(function () {
    var targetDivId = $(this).attr('id')
    if ($('div#' + targetDivId).is(':visible')) {
      $('button#' + targetDivId).addClass('active')
    } else {
      $('button#' + targetDivId).removeClass('active')
    }
  })
}
// navigation toggle (about + contact)
$(document).ready(function () {
  // toggle visibility on button click
  $('button#about').click(function () {
    $('.bio').toggle()
    $('.contact').hide()
    checkVisibility()
  })
  $('button#contact').click(function () {
    $('.contact').toggle()
    $('.bio').hide()
    checkVisibility()
  })
})

// hide div when clicking elsewhere
// $(document).mouseup(function (e) {
//   var bio = $('.bio')
//   var contact = $('.contact')
//   if (!bio.is(e.target) && bio.has(e.target).length === 0) {
//     bio.hide()
//   }
//   if (!contact.is(e.target) && contact.has(e.target).length === 0) {
//     contact.hide()
//   }
// })

// todo: zorgen dat laatste functie toggle niet tegengaat
