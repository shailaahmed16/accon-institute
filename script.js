// Theme Toggle
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("themeToggle");

  toggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    toggle.textContent = 
      document.body.classList.contains("dark-mode") ? "☀️ Light Mode" : "🌙 Dark Mode";
  });
});

// Mobile menu functionality
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.getElementById('navMenu');

mobileMenuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    mobileMenuBtn.textContent = navMenu.classList.contains('active') ? '✕' : '☰';
});

// Scroll buttons functionality
const scrollUpBtn = document.getElementById('scrollUp');
const scrollDownBtn = document.getElementById('scrollDown');

function updateScrollButtons() {
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight;
    const winHeight = window.innerHeight;

    // Show/hide scroll up button
    if (scrollTop > 300) {
        scrollUpBtn.classList.add('visible');
    } else {
        scrollUpBtn.classList.remove('visible');
    }

    // Show/hide scroll down button
    if (scrollTop < docHeight - winHeight - 100) {
        scrollDownBtn.classList.add('visible');
    } else {
        scrollDownBtn.classList.remove('visible');
    }
}

scrollUpBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

scrollDownBtn.addEventListener('click', () => {
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
});

window.addEventListener('scroll', updateScrollButtons);
updateScrollButtons();

// Registration Modal functionality
const modal = document.getElementById('registrationModal');
const modalTitle = document.getElementById('modalTitle');
const closeBtn = document.querySelector('.close');
const registrationForm = document.getElementById('registrationForm');
const successMessage = document.getElementById('successMessage');

function openRegistrationModal(type) {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';

    // Update modal title based on button clicked
    switch (type) {
        case 'enroll':
            modalTitle.textContent = 'Enroll Now for 2025 Batches';
            break;
        case 'demo':
            modalTitle.textContent = 'Book FREE Demo Class';
            break;
        case 'register':
        default:
            modalTitle.textContent = 'Register Now';
    }
}

function closeRegistrationModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    registrationForm.style.display = 'block';
    successMessage.style.display = 'none';
    registrationForm.reset();
}

closeBtn.addEventListener('click', closeRegistrationModal);

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeRegistrationModal();
    }
});

// Form submission
registrationForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(registrationForm);
    const data = {};
    for (let [key, value] of formData.entries()) {
        data[key] = value;
    }

    // Simulate form submission (you can replace this with actual API call)
    setTimeout(() => {
        console.log('Registration data:', data);
        registrationForm.style.display = 'none';
        successMessage.style.display = 'block';
    }, 1000);
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
        // Close mobile menu after click
        navMenu.classList.remove('active');
        mobileMenuBtn.textContent = '☰';
    });
});

// Add scroll effect to header
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = 'var(--bg-primary)';
        header.style.backdropFilter = 'none';
    }
});

// Add intersection observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.trust-item, .feature-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Add click handlers for CTA buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.position = 'absolute';
        ripple.style.background = 'rgba(255,255,255,0.3)';
        ripple.style.borderRadius = '50%';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s linear';
        ripple.style.pointerEvents = 'none';

        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const plusSign = this.querySelector('.plus');
            
            faqItem.classList.toggle('active');
            
            if (faqItem.classList.contains('active')) {
                plusSign.textContent = '−';
            } else {
                plusSign.textContent = '+';
            }
        });
    });
});

// Add ripple animation CSS
const style = document.createElement('style');
style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
document.head.appendChild(style);

// Form validation enhancement
const inputs = document.querySelectorAll('.form-control');
inputs.forEach(input => {
    input.addEventListener('blur', function () {
        if (this.value.trim() === '' && this.hasAttribute('required')) {
            this.style.borderColor = 'var(--primary-color)';
        } else if (this.value.trim() !== '') {
            this.style.borderColor = 'var(--secondary-color)';
        }
    });

    input.addEventListener('input', function () {
        this.style.borderColor = 'var(--border)';
    });
});

// Phone number validation
document.getElementById('phone').addEventListener('input', function (e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 10) {
        value = value.slice(0, 10);
    }
    e.target.value = value;
});

// Email validation
document.getElementById('email').addEventListener('blur', function (e) {
    const email = e.target.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) {
        e.target.style.borderColor = 'var(--primary-color)';
        e.target.setCustomValidity('Please enter a valid email address');
    } else {
        e.target.setCustomValidity('');
        if (email) {
            e.target.style.borderColor = 'var(--secondary-color)';
        }
    }
});

// Keyboard accessibility for modal
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal.style.display === 'block') {
        closeRegistrationModal();
    }
});

// Make openRegistrationModal globally accessible
window.openRegistrationModal = openRegistrationModal;
window.closeRegistrationModal = closeRegistrationModal;

// Loading animation for form submission
registrationForm.addEventListener('submit', (e) => {
    const submitBtn = document.querySelector('.submit-btn');
    submitBtn.innerHTML = '<span style="display: inline-block; animation: spin 1s linear infinite;">⟳</span> Processing...';
    submitBtn.disabled = true;

    setTimeout(() => {
        submitBtn.innerHTML = 'Submit Registration';
        submitBtn.disabled = false;
    }, 1000);
});

// Select all flip cards
const flipCards = document.querySelectorAll('.flip-card');

flipCards.forEach(card => {
  card.addEventListener('click', () => {
    card.classList.toggle('flipped');
  });
});
const slides = document.querySelector(".slides");
  const slideCount = document.querySelectorAll(".testimonial-card").length;
  let index = 0;

  document.querySelector(".next").addEventListener("click", () => {
    index = (index + 1) % slideCount;
    slides.style.transform = `translateX(-${index * 100}%)`;
  });

  document.querySelector(".prev").addEventListener("click", () => {
    index = (index - 1 + slideCount) % slideCount;
    slides.style.transform = `translateX(-${index * 100}%)`;
  });

  // Auto-slide every 5 sec
  setInterval(() => {
    index = (index + 1) % slideCount;
    slides.style.transform = `translateX(-${index * 100}%)`;
  }, 5000);

   function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  }

  document.querySelector("form").addEventListener("submit", function(e) {
  e.preventDefault(); // Prevent page reload

  // Collect form data
  const formData = {
    firstName: document.querySelector('input[placeholder="Enter your first name"]').value,
    lastName: document.querySelector('input[placeholder="Enter your last name"]').value,
    email: document.querySelector('input[type="email"]').value,
    phone: document.querySelector('input[type="tel"]').value,
    city: document.querySelector('input[placeholder="City / Pincode (Delhi preferred)"]').value,
    program: document.querySelector("select").value,
    message: document.querySelector("textarea").value
  };

  // Simple validation
  if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.program) {
    alert("⚠️ Please fill in all required fields!");
    return;
  }

  // Show data in console (testing purpose)
  console.log("Form Submitted:", formData);

  // Show success message to user
  alert("✅ Thank you, " + formData.firstName + "! Your form has been submitted.");
   document.querySelector("form").reset();
});

document.addEventListener("DOMContentLoaded", () => {
  const boxes = document.querySelectorAll(".reason-box");
  const images = document.querySelectorAll(".reasons-slider img");

  let currentIndex = 0;
  let autoSlide;

  function showSlide(index) {
    // reset all
    boxes.forEach(b => b.classList.remove("active"));
    images.forEach(img => img.classList.remove("active"));

    // set active
    boxes[index].classList.add("active");
    images[index].classList.add("active");

    currentIndex = index;
  }

  // Manual click
  boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
      showSlide(index);
      resetAutoSlide();
    });
  });

  // Auto change every 2 seconds
  function startAutoSlide() {
    autoSlide = setInterval(() => {
      let nextIndex = (currentIndex + 1) % images.length;
      showSlide(nextIndex);
    }, 2000); // 2000ms = 2 sec
  }

  function resetAutoSlide() {
    clearInterval(autoSlide);
    startAutoSlide();
  }

  // Init
  showSlide(0);
  startAutoSlide();
});

document.querySelectorAll(".trust-item").forEach(item => {
  item.addEventListener("click", () => {
    const url = item.getAttribute("data-link");
    window.open(url, "_blank");
  });
});




