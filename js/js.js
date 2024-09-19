
// ---------- Clickable boxes ----------
function handleNavigation(event) {
    const targetUrl = event.currentTarget.getAttribute('data-target');
    window.location.href = targetUrl;
  }
  
  const clickableElements = document.querySelectorAll('.grid-card');
  
  clickableElements.forEach(element => {
    element.addEventListener('click', handleNavigation);
    element.addEventListener('keydown', function(event) {
      if (event.key === 'Enter' || event.key === ' ') {
        handleNavigation(event);
      }
    });
  });
  

// ---------- Accordion ---------
document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
        const isExpanded = header.getAttribute('aria-expanded') === 'true';
        const contentId = header.getAttribute('aria-controls');
        const content = document.getElementById(contentId);

        // Toggle expanded state
        header.setAttribute('aria-expanded', !isExpanded);
        content.setAttribute('aria-hidden', isExpanded);
    });
});

// ---------- Clickable images ----------
// Get the modal, modal image, and caption elements
var modal = document.getElementById("myModal");
var modalImg = document.getElementById("img01");
var captionText = document.getElementById("caption");

// Get all image containers (each contains an image and a "Click to enlarge" text)
var containers = document.getElementsByClassName("image-container");

// Get the close button
var closeBtn = document.getElementsByClassName("close")[0];

// Keep track of the last focused element before opening the modal
var lastFocusedElement;

// Focusable elements inside the modal (you can add more if needed)
function getFocusableElements() {
    return modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
}

// Add click and keyboard event listeners to each container (image and text)
for (var i = 0; i < containers.length; i++) {
    containers[i].onclick = function() {
        openModal(this);
    }
    
    containers[i].addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            openModal(this);
        }
    });
}

// Function to open the modal
function openModal(container) {
    lastFocusedElement = document.activeElement; // Store the last focused element
    var img = container.querySelector('.clickable-image');
    modal.style.display = "block";
    modalImg.src = img.src;
    modalImg.alt = img.alt;
    captionText.innerHTML = img.alt;
    closeBtn.focus(); // Set focus on the close button when the modal opens
    trapFocus(modal); // Activate focus trap
}

// Close the modal when the user clicks on <span> (X) or outside the image
closeBtn.onclick = function() {
    closeModal();
}

// Close the modal when clicking anywhere outside the modal content
modal.onclick = function(event) {
    if (event.target === modal) {
        closeModal();
    }
}

// Add keyboard accessibility: close the modal when pressing the Esc key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && modal.style.display === "block") {
        closeModal();
    }
});

// Close the modal and restore focus to the last focused element
function closeModal() {
    modal.style.display = "none";
    lastFocusedElement.focus(); // Return focus to the element that triggered the modal
}

// Trap focus inside the modal
function trapFocus(modal) {
    var focusableElements = getFocusableElements();
    var firstFocusableElement = focusableElements[0];
    var lastFocusableElement = focusableElements[focusableElements.length - 1];

    // Add keydown event listener to trap focus
    modal.addEventListener('keydown', function(event) {
        if (event.key === 'Tab') {
            if (event.shiftKey) {
                // If shift + tab is pressed, move focus backward
                if (document.activeElement === firstFocusableElement) {
                    event.preventDefault();
                    lastFocusableElement.focus(); // Loop focus back to last element
                }
            } else {
                // Move focus forward
                if (document.activeElement === lastFocusableElement) {
                    event.preventDefault();
                    firstFocusableElement.focus(); // Loop focus to the first element
                }
            }
        }
    });
}

// Make the close button navigable via keyboard (Enter or Space)
closeBtn.addEventListener('keydown', function(event) {
    if (event.key === 'Enter' || event.key === ' ') {
        closeModal(); // Close modal when Enter or Space is pressed on close button
    }
});


