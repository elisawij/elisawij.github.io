const mediaQuery = '(min-width: 900px)'
const mediaQueryMatch = window.matchMedia(mediaQuery)
const imageWrapper = $('.image-wrapper')

// Function to convert vertical to horizontal scrolling (horizontal layout)
function HorScroll(vertscroll) {
  vertscroll.preventDefault()
  imageWrapper.scrollLeft(
    imageWrapper.scrollLeft() +
      vertscroll.originalEvent.deltaY +
      vertscroll.originalEvent.deltaX
  )
}
// Function to show p's for each div hovered (horizontal layout)
function pHover() {
  // Add event listener for each "kolom" element
  $('.kolom').hover(
    function () {
      // todo: functie isoleren, definiëren & hergebruiken hier + in pScroll
      // Find the corresponding hidden p element
      var hiddenP = $(this).find('.hidden')
      var color = hiddenP.attr('style')

      // Display the content and style of the hidden p in .img-info
      $('.img-info').html(hiddenP.html()).attr('style', color)
      $('h1').attr('style', color)
    },
    function () {
      // Clear .img-info when mouse leaves
      $('.img-info').empty().removeAttr('style')
    }
  )
}

// Function to check if an element overlaps the vertical center of the viewport (vertical layout)
function isInViewport(element) {
  const rect = element[0].getBoundingClientRect()
  return (
    rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2
  )
}
// Function to show p's for each div passing the center of the viewport (vertical layout)
function pScroll() {
  // Check if each "kolom" element is in the viewport and update .img-info
  $('.kolom').each(function () {
    if (isInViewport($(this))) {
      // Find the corresponding hidden p element
      var hiddenP = $(this).find('.hidden')
      var color = hiddenP.attr('style')

      // Display the content and style of the hidden p in .img-info
      $('.img-info').html(hiddenP.html()).attr('style', color)
      $('h1').attr('style', color)
    }
  })
}

// On initial window size:
// horizontal
if (mediaQueryMatch.matches) {
  imageWrapper.on('wheel', HorScroll)
  pHover()
}
// vertical
else {
  $('.image-container').on('scroll', pScroll)
  pScroll()
}

// On resize:
mediaQueryMatch.onchange = (event) => {
  // horizontal
  if (event.matches) {
    $('.image-container').off()
    $('.img-info').empty().removeAttr('style')
    $('h1').removeAttr('style')

    imageWrapper.on('wheel', HorScroll)
    pHover()
  }
  // vertical
  else {
    imageWrapper.off()
    $('.kolom').off()
    $('h1').removeAttr('style')

    $('.image-container').on('scroll', pScroll)
    pScroll()
  }
}
