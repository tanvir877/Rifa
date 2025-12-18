document.addEventListener("DOMContentLoaded", () => {
  createFloatingButterflies()
  setupForgiveButton()
  setupBlowButton()
  createInitialConfetti()
})

function createFloatingButterflies() {
  const container = document.getElementById("butterflies")
  const butterflyEmojis = ["🦋"]
  const colors = ["#ff6b9d", "#a855f7", "#fbbf24", "#34d399"]

  for (let i = 0; i < 15; i++) {
    const butterfly = document.createElement("div")
    butterfly.className = "floating-butterfly"
    butterfly.textContent = butterflyEmojis[0]
    butterfly.style.left = Math.random() * 100 + "%"
    butterfly.style.animationDuration = 15 + Math.random() * 10 + "s"
    butterfly.style.animationDelay = Math.random() * 15 + "s"
    butterfly.style.fontSize = 1.5 + Math.random() * 1.5 + "rem"
    container.appendChild(butterfly)
  }
}

function createConfetti() {
  const container = document.getElementById("confetti")
  const colors = ["#ff6b9d", "#a855f7", "#fbbf24", "#34d399", "#f472b6", "#c084fc"]
  const shapes = ["circle", "square", "triangle"]

  for (let i = 0; i < 100; i++) {
    const confetti = document.createElement("div")
    confetti.className = "confetti"

    const color = colors[Math.floor(Math.random() * colors.length)]
    const shape = shapes[Math.floor(Math.random() * shapes.length)]

    confetti.style.left = Math.random() * 100 + "%"
    confetti.style.backgroundColor = color
    confetti.style.animationDelay = Math.random() * 2 + "s"
    confetti.style.animationDuration = 2 + Math.random() * 2 + "s"

    if (shape === "circle") {
      confetti.style.borderRadius = "50%"
    } else if (shape === "triangle") {
      confetti.style.width = "0"
      confetti.style.height = "0"
      confetti.style.backgroundColor = "transparent"
      confetti.style.borderLeft = "5px solid transparent"
      confetti.style.borderRight = "5px solid transparent"
      confetti.style.borderBottom = "10px solid " + color
    }

    container.appendChild(confetti)

    setTimeout(() => {
      confetti.remove()
    }, 5000)
  }
}

function createInitialConfetti() {
  setTimeout(createConfetti, 500)
}

function setupForgiveButton() {
  const btn = document.getElementById("forgiveBtn")
  const overlay = document.getElementById("celebration")

  btn.addEventListener("click", () => {
    createConfetti()
    createConfetti()

    overlay.classList.add("active")

    const heartsContainer = overlay.querySelector(".celebration-hearts")
    heartsContainer.innerHTML = ""

    for (let i = 0; i < 20; i++) {
      setTimeout(() => {
        const heart = document.createElement("span")
        heart.textContent = ["💕", "💖", "💗", "💓", "🦋"][Math.floor(Math.random() * 5)]
        heart.style.display = "inline-block"
        heart.style.animation = "pulse 0.5s ease-in-out infinite"
        heart.style.margin = "0 5px"
        heartsContainer.appendChild(heart)
      }, i * 100)
    }

    setTimeout(() => {
      overlay.classList.remove("active")
    }, 5000)
  })
}

function setupBlowButton() {
  const btn = document.getElementById("blowBtn")
  const flames = document.querySelectorAll(".flame")
  const cakeMessage = document.querySelector(".cake-message")

  btn.addEventListener("click", () => {
    flames.forEach((flame, index) => {
      setTimeout(() => {
        flame.classList.add("blown")
      }, index * 200)
    })

    btn.disabled = true
    btn.textContent = "Wish Made!"

    setTimeout(() => {
      cakeMessage.textContent = "May all your wishes come true!"
      cakeMessage.style.animation = "shimmer 1.5s ease-in-out infinite"
      createConfetti()
    }, 800)
  })
}

document.addEventListener("mousemove", (e) => {
  if (Math.random() > 0.97) {
    createSparkle(e.clientX, e.clientY)
  }
})

function createSparkle(x, y) {
  const sparkle = document.createElement("div")
  sparkle.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        width: 8px;
        height: 8px;
        background: #fbbf24;
        border-radius: 50%;
        pointer-events: none;
        z-index: 1000;
        animation: sparkle-fade 0.8s ease-out forwards;
    `

  document.body.appendChild(sparkle)

  setTimeout(() => sparkle.remove(), 800)
}

const style = document.createElement("style")
style.textContent = `
    @keyframes sparkle-fade {
        0% {
            transform: scale(1);
            opacity: 1;
        }
        100% {
            transform: scale(0);
            opacity: 0;
        }
    }
`
document.head.appendChild(style)
