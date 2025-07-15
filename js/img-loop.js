document.addEventListener('DOMContentLoaded', function () {
  // === IMG LOOP ON SCROLL INTO VIEW ===
  document.querySelectorAll('img.img-loop').forEach((img) => {
    let loop
    let i = 0
    const altSrcs = img.dataset.altSrc.split(';')
    const originalSrc = img.src

    const imgObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            loop = setInterval(() => {
              if (i >= altSrcs.length) {
                i = 0
                img.src = originalSrc
              } else {
                img.src = altSrcs[i]
                i++
              }
            }, 800)
          } else {
            clearInterval(loop)
            img.src = originalSrc
            i = 0
          }
        })
      },
      { threshold: 0.1 }
    )

    imgObserver.observe(img)
  })

  // === VIDEO PLAY/PAUSE ON SCROLL INTO VIEW ===
  document.querySelectorAll('video.auto-play-on-view').forEach((video) => {
    const videoObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {}) // Avoid uncaught errors if autoplay is blocked
          } else {
            video.pause()
          }
        })
      },
      { threshold: 0.1 }
    )

    videoObserver.observe(video)
  })
})
