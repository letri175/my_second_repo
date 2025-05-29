// Navigation dropdown functionality
document.addEventListener("DOMContentLoaded", () => {
  // Handle dropdown menus
  const dropdowns = document.querySelectorAll(".dropdown")

  dropdowns.forEach((dropdown) => {
    const button = dropdown.querySelector(".nav-button")
    const content = dropdown.querySelector(".dropdown-content")

    // Close dropdown when clicking outside
    document.addEventListener("click", (event) => {
      if (!dropdown.contains(event.target)) {
        content.style.opacity = "0"
        content.style.visibility = "hidden"
        content.style.transform = "translateY(-0.5rem)"
      }
    })

    // Toggle dropdown on button click (for mobile)
    button.addEventListener("click", (event) => {
      event.stopPropagation()

      // Close other dropdowns
      dropdowns.forEach((otherDropdown) => {
        if (otherDropdown !== dropdown) {
          const otherContent = otherDropdown.querySelector(".dropdown-content")
          otherContent.style.opacity = "0"
          otherContent.style.visibility = "hidden"
          otherContent.style.transform = "translateY(-0.5rem)"
        }
      })

      // Toggle current dropdown
      const isVisible = content.style.visibility === "visible"
      if (isVisible) {
        content.style.opacity = "0"
        content.style.visibility = "hidden"
        content.style.transform = "translateY(-0.5rem)"
      } else {
        content.style.opacity = "1"
        content.style.visibility = "visible"
        content.style.transform = "translateY(0)"
      }
    })
  })

  // Search functionality
  const searchInput = document.querySelector(".search-input")
  const searchButton = document.querySelector(".search-button")

  function performSearch() {
    const searchTerm = searchInput.value.trim()
    if (searchTerm) {
      // Here you would typically send the search query to your backend
      console.log("Searching for:", searchTerm)
      alert("Tìm kiếm: " + searchTerm)
    }
  }

  searchButton.addEventListener("click", performSearch)

  searchInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      performSearch()
    }
  })

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })

  // Add loading state for news items
  const newsItems = document.querySelectorAll(".news-item")
  newsItems.forEach((item) => {
    item.addEventListener("click", function () {
      // Add a subtle loading effect
      this.style.opacity = "0.7"
      setTimeout(() => {
        this.style.opacity = "1"
      }, 200)
    })
  })

  // Chatbot iframe error handling
  const chatbotIframe = document.querySelector(".chatbot-iframe")
  if (chatbotIframe) {
    chatbotIframe.addEventListener("error", function () {
      console.error("Chatbot failed to load")
      this.style.display = "none"
      const errorMessage = document.createElement("div")
      errorMessage.innerHTML =
        '<p style="text-align: center; padding: 2rem; color: #6b7280;">Chatbot hiện không khả dụng. Vui lòng thử lại sau.</p>'
      this.parentNode.appendChild(errorMessage)
    })
  }

  // Add intersection observer for animations
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

  // Observe news items for scroll animations
  newsItems.forEach((item) => {
    item.style.opacity = "0"
    item.style.transform = "translateY(20px)"
    item.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(item)
  })

  // Mobile menu toggle (if needed)
  function createMobileMenu() {
    if (window.innerWidth <= 768) {
      const nav = document.querySelector(".navigation")
      const navContent = document.querySelector(".nav-content")

      // Create mobile menu button if it doesn't exist
      let mobileMenuBtn = document.querySelector(".mobile-menu-btn")
      if (!mobileMenuBtn) {
        mobileMenuBtn = document.createElement("button")
        mobileMenuBtn.className = "mobile-menu-btn"
        mobileMenuBtn.innerHTML = "☰"
        mobileMenuBtn.style.cssText = `
                    display: block;
                    background: none;
                    border: none;
                    color: white;
                    font-size: 1.5rem;
                    padding: 0.5rem;
                    cursor: pointer;
                    margin-bottom: 1rem;
                `

        nav.insertBefore(mobileMenuBtn, navContent)

        // Toggle menu visibility
        mobileMenuBtn.addEventListener("click", () => {
          const isVisible = navContent.style.display === "flex"
          navContent.style.display = isVisible ? "none" : "flex"
        })

        // Hide menu by default on mobile
        navContent.style.display = "none"
      }
    } else {
      // Remove mobile menu button on desktop
      const mobileMenuBtn = document.querySelector(".mobile-menu-btn")
      if (mobileMenuBtn) {
        mobileMenuBtn.remove()
      }
      // Show menu on desktop
      document.querySelector(".nav-content").style.display = "flex"
    }
  }

  // Initialize mobile menu
  createMobileMenu()

  // Handle window resize
  window.addEventListener("resize", createMobileMenu)
})

// Add some utility functions
function showNotification(message, type = "info") {
  const notification = document.createElement("div")
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === "error" ? "#ef4444" : "#3b82f6"};
        color: white;
        border-radius: 0.5rem;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 9999;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
    `
  notification.textContent = message

  document.body.appendChild(notification)

  // Animate in
  setTimeout(() => {
    notification.style.opacity = "1"
    notification.style.transform = "translateX(0)"
  }, 100)

  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.opacity = "0"
    notification.style.transform = "translateX(100%)"
    setTimeout(() => {
      document.body.removeChild(notification)
    }, 300)
  }, 3000)
}

// Export functions for potential use in other scripts
window.BankingAcademy = {
  showNotification,
}


