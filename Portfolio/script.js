const mobileMenu = document.getElementById("mobile-menu")
const navMenu = document.getElementById("nav-menu")

mobileMenu.addEventListener("click", () => {
  mobileMenu.classList.toggle("active")
  navMenu.classList.toggle("active")
})

document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("active")
    navMenu.classList.remove("active")
  })
})

const navbar = document.getElementById("navbar")

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled")
  } else {
    navbar.classList.remove("scrolled")
  }
})

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      const offsetTop = target.offsetTop - 70
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      })
    }
  })
})

const contactForm = document.getElementById("contact-form")
const nameInput = document.getElementById("name")
const emailInput = document.getElementById("email")
const messageInput = document.getElementById("message")

function validateName(name) {
  return name.trim().length >= 2
}

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

function validateMessage(message) {
  return message.trim().length >= 10
}

function showError(inputId, message) {
  const errorElement = document.getElementById(inputId + "-error")
  errorElement.textContent = message
  errorElement.style.display = "block"
}

function clearError(inputId) {
  const errorElement = document.getElementById(inputId + "-error")
  errorElement.textContent = ""
  errorElement.style.display = "none"
}

nameInput.addEventListener("blur", () => {
  if (!validateName(nameInput.value)) {
    showError("name", "Name must be at least 2 characters long")
  } else {
    clearError("name")
  }
})

emailInput.addEventListener("blur", () => {
  if (!validateEmail(emailInput.value)) {
    showError("email", "Please enter a valid email address")
  } else {
    clearError("email")
  }
})

messageInput.addEventListener("blur", () => {
  if (!validateMessage(messageInput.value)) {
    showError("message", "Message must be at least 10 characters long")
  } else {
    clearError("message")
  }
})

contactForm.addEventListener("submit", (e) => {
  e.preventDefault()
  clearError("name")
  clearError("email")
  clearError("message")

  let isValid = true

  if (isValid) {
    const submitButton = contactForm.querySelector('button[type="submit"]')
    const originalText = submitButton.textContent

    submitButton.textContent = "Sending..."
    submitButton.disabled = true

    setTimeout(() => {
      alert("Thank you for your message! I'll get back to you soon.")
      contactForm.reset()
      submitButton.textContent = originalText
      submitButton.disabled = false
    }, 2000)
  }
})

const downloadResumeBtn = document.getElementById("download-resume");

downloadResumeBtn.addEventListener("click", function (e) {
  e.preventDefault();
  const resumeFileName = "Resume.pdf"; 
  const resumeUrl = "./Assets/Resume.pdf";

  const tempLink = document.createElement("a");
  tempLink.href = resumeUrl;
  tempLink.download = resumeFileName;
  document.body.appendChild(tempLink);
  tempLink.click();
  document.body.removeChild(tempLink);
});

const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)


document.querySelectorAll(".skill-card, .project-card").forEach((el) => {
  el.style.opacity = "0"
  el.style.transform = "translateY(20px)"
  el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
  observer.observe(el)
})


window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section[id]")
  const navLinks = document.querySelectorAll(".nav-link")

  let current = ""

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100
    const sectionHeight = section.clientHeight

    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute("id")
    }
  })

  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active")
    }
  })
})


const style = document.createElement("style")
style.textContent = `
    .nav-link.active {
        color: #2563eb !important;
    }
    .nav-link.active::after {
        width: 100% !important;
    }
`
document.head.appendChild(style)