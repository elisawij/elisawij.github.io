// let scrollInterval = null

// function startContinuousScroll(wrapper, direction = 1) {
//   if (scrollInterval) return

//   const step = 20 // pixels per tick
//   const speed = 10 // milliseconds between steps

//   scrollInterval = setInterval(() => {
//     wrapper.scrollBy({ left: direction * step, behavior: 'auto' })
//   }, speed)
// }

// function stopContinuousScroll() {
//   clearInterval(scrollInterval)
//   scrollInterval = null
// }
let scrollInterval = null
let momentumFrame = null
let lastScrollDir = 0
let lastTimestamp = 0

function startContinuousScroll(wrapper, direction = 1) {
  if (scrollInterval) return

  const step = 15
  const speed = 5 // ms between steps
  lastScrollDir = direction
  lastTimestamp = performance.now()

  scrollInterval = setInterval(() => {
    wrapper.scrollBy({ left: direction * step, behavior: 'auto' })
    lastTimestamp = performance.now()
  }, speed)
}

function stopContinuousScrollWithMomentum(wrapper) {
  clearInterval(scrollInterval)
  scrollInterval = null

  let velocity = 2 // starting momentum
  const decay = 0.88 // how quickly it slows down
  const minVelocity = 0.3 // stop threshold

  function momentumStep() {
    if (Math.abs(velocity) < minVelocity) {
      cancelAnimationFrame(momentumFrame)
      return
    }
    wrapper.scrollBy({ left: lastScrollDir * velocity * 20, behavior: 'auto' })
    velocity *= decay
    momentumFrame = requestAnimationFrame(momentumStep)
  }

  momentumFrame = requestAnimationFrame(momentumStep)
}

// SCROLL AREA FOCUS + GLOBAL KEY EVENTS
document.addEventListener('DOMContentLoaded', () => {
  const scrollArea = document.getElementById('scrollArea')

  // Auto-focus scroll area on load and on any click
  scrollArea.focus()
  document.addEventListener('click', () => scrollArea.focus())

  // document.addEventListener('keydown', (e) => {
  //   const scrollArea = document.getElementById('scrollArea')
  //   const V_SCROLL = window.innerHeight

  //   if (e.key === 'ArrowDown') {
  //     e.preventDefault()
  //     scrollArea.scrollBy({ top: V_SCROLL, behavior: 'smooth' })
  //   } else if (e.key === 'ArrowUp') {
  //     e.preventDefault()
  //     scrollArea.scrollBy({ top: -V_SCROLL, behavior: 'smooth' })
  //   } else if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
  //     e.preventDefault()
  //     const wrapper = getVisibleCardWrapper()
  //     if (wrapper) {
  //       const dir = e.key === 'ArrowRight' ? 1 : -1
  //       startContinuousScroll(wrapper, dir)
  //     }
  //   }
  // })
  document.addEventListener('keydown', (e) => {
    const scrollArea = document.getElementById('scrollArea')
    const V_SCROLL = window.innerHeight

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      scrollArea.scrollBy({ top: V_SCROLL, behavior: 'smooth' })
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      scrollArea.scrollBy({ top: -V_SCROLL, behavior: 'smooth' })
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      e.preventDefault()
      const wrapper = getVisibleCardWrapper()
      if (wrapper && !scrollInterval) {
        const dir = e.key === 'ArrowRight' ? 1 : -1
        startContinuousScroll(wrapper, dir)
      }
    }
  })

  // document.addEventListener('keyup', (e) => {
  //   if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
  //     stopContinuousScroll()
  //   }
  // })
  // window.addEventListener('blur', () => {
  //   stopContinuousScroll()
  // })
  document.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      const wrapper = getVisibleCardWrapper()
      if (wrapper) stopContinuousScrollWithMomentum(wrapper)
    }
  })
  window.addEventListener('blur', () => {
    stopContinuousScrollWithMomentum(getVisibleCardWrapper())
  })

  function getVisibleCardWrapper() {
    const wrappers = document.querySelectorAll('.card-wrapper')
    for (const wrapper of wrappers) {
      const rect = wrapper.getBoundingClientRect()
      if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
        return wrapper
      }
    }
    return null
  }
})

// SCROLL INDICATOR DOTS
// Create indicators dynamically
const sections = scrollArea.querySelectorAll('.section')
const indicatorsContainer = document.getElementById('indicators')

// Create one dot per section
sections.forEach((_, i) => {
  const dot = document.createElement('div')
  dot.classList.add('indicator-dot')
  dot.innerHTML =
    '<?xml version="1.0" encoding="UTF-8"?><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 22"><path d="M20,9.5h0c1.1.5,1.1,2.1,0,2.6h0c-3.8,1.7-6.7,4.7-8.3,8.6h0c-.5,1.2-2.2,1.2-2.6,0h0c-1.5-3.8-4.5-6.9-8.3-8.6h0c-1.1-.5-1.1-2.1,0-2.6h0C4.6,7.8,7.6,4.7,9.1.9h0c.5-1.2,2.2-1.2,2.6,0h0c1.5,3.8,4.5,6.9,8.3,8.6Z"/></svg>'
  dot.addEventListener('click', () => {
    sections[i].scrollIntoView({ behavior: 'smooth', block: 'center' })
  })
  indicatorsContainer.appendChild(dot)
})

// BACKGROUND COLOR CHANGER
const header = document.getElementById('header')
const footer = document.getElementById('footer')
const description = document.getElementById('footer-content')

function updateText(color, footerText) {
  // Update active indicator color
  document.querySelectorAll('.indicator-dot path').forEach((dot) => {
    dot.style.fill = ''
  })
  const activeDot = document.querySelector('.indicator-dot.active path')
  if (activeDot) activeDot.style.fill = color

  // Update footer content
  description.textContent = footerText
}

// Track current section using IntersectionObserver
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const index = Array.from(sections).indexOf(entry.target)
        const activeDot = indicatorsContainer.children[index]

        // Set active dot
        document
          .querySelectorAll('.indicator-dot')
          .forEach((dot) => dot.classList.remove('active'))
        activeDot.classList.add('active')

        // Get background color and footer content
        const color = entry.target.dataset.color || '#333'
        const footerText = entry.target.dataset.footer || ''

        updateText(color, footerText)
      }
    })
  },
  {
    root: scrollArea,
    threshold: 0.6,
  }
)

// Observe all sections
sections.forEach((section) => observer.observe(section))

// HOVER CURSOR
var cursor = document.getElementById('cursor')
document.addEventListener('mousemove', moveCursor)

function moveCursor(e) {
  let x = e.clientX
  let y = e.clientY
  cursor.style.left = `${x}px`
  cursor.style.top = `${y}px`
}
document.querySelectorAll('.card a').forEach((a) => {
  a.addEventListener('mousemove', function () {
    cursor.classList.add('link-cursor')
  })
  a.addEventListener('mouseleave', function () {
    cursor.classList.remove('link-cursor')
  })
})

// CONTACT BUTTON
function toggleContact() {
  const contactBtn = document.getElementById('contact-btn')
  const contactWindow = document.getElementById('contact')
  contactBtn.classList.toggle('active')
  contactWindow.classList.toggle('visible')
}
