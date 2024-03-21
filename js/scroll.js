const mediaQuery = '(min-width: 800px)'
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
// function to check if a color is dark
function isDark(color) {
  var match = /rgb\((\d+).*?(\d+).*?(\d+)\)/.exec(color)
  return (
    parseFloat(match[1]) + parseFloat(match[2]) + parseFloat(match[3]) <
    3 * (256 / 2)
  ) // r+g+b should be less than half of max (3 * 256)
}

// function to change content & color of specified elements based on current div.kolom (vertical & horizontal)
function changeContent() {
  // Find the corresponding hidden p element for this div.kolom & get it's color
  var hiddenP = $(this).find('.hidden')
  var scrollColor = hiddenP.css('color')

  // Display the content of p.hidden in .img-info
  $('.img-info').html(hiddenP.html())

  // Change the color of selected elements accordingly
  $('header, .nav, button, footer').css('background-color', scrollColor)
  $('.site-title, .img-info, button').css(
    'color',
    // Change text color based on darkness of background color
    isDark($('header').css('background-color')) ? 'white' : 'black'
  )
  $('#colorWord').css('color', scrollColor)
}

// extra functionalities for horizontal layout
function changeContentHover() {
  changeContent.call($(this))
  $('.nav, button').css('background-color', 'whitesmoke')
  $('button').css('color', 'black')
}

// Function to show p's for each div hovered (horizontal layout)
function pHover() {
  // Add event listener for each div.kolom
  $('.kolom').hover(changeContentHover, function () {
    // Clear .img-info when mouse leaves
    // $('.img-info').empty().removeAttr('style')
  })
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
  // Check if each "kolom" element is in the viewport and update the content
  $('.kolom').each(function () {
    if (isInViewport($(this))) {
      changeContent.call($(this))
    }
  })
}

// On initial window size:
// horizontal
if (mediaQueryMatch.matches) {
  imageWrapper.on('wheel', HorScroll)

  // changeContentHover but with different variable
  var firstHiddenP = $('.kolom:first-child .hidden')
  $('.img-info').html(firstHiddenP.html())
  var scrollColor = firstHiddenP.css('color')
  $('header, .nav, button, footer').css('background-color', scrollColor)
  $('.site-title, .img-info, button').css(
    'color',
    isDark($('header').css('background-color')) ? 'white' : 'black'
  )
  $('#colorWord').css('color', scrollColor)
  $('.nav, button').css('background-color', 'whitesmoke')
  $('button').css('color', 'black')

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
    $('h1, button').removeAttr('style')
    $('.nav').css('background-color', 'whitesmoke')

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
