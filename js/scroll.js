if (matchMedia('(min-width: 416px)').matches) {
  const scrollContainer = document.querySelector('.image-wrapper')
  // handle up/down scrollwheel on the scroller, as most people don't have horizontal scroll
  scrollContainer.addEventListener('wheel', (evt) => {
    evt.preventDefault()
    scrollContainer.scrollLeft += evt.deltaY + evt.deltaX
  })
}
