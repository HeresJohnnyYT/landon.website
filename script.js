// Array of image URLs
let images = [
    "https://myschief.net/landon.jpg",
    "https://myschief.net/landon2.jpg",
    "https://myschief.net/landon3.jpg"
];

let currentImageIndex = 0;
let isAnimating = false; // Prevent multiple animations

// Preload images
images.forEach(src => {
    const img = new Image();
    img.src = src;
});

function changeImage(direction) {
    // Prevent a new animation if one is already running
    if (isAnimating) return;
    isAnimating = true;

    const imageElement = document.getElementById('landonImage');
    // Calculate the new index
    currentImageIndex = (currentImageIndex + direction + images.length) % images.length;

    // Start fade-out animation
    imageElement.classList.add('animate__animated', 'animate__fadeOut');

    // When fade-out completes, update the image and fade it in
    imageElement.addEventListener('animationend', function handleFadeOut() {
        imageElement.removeEventListener('animationend', handleFadeOut);
        imageElement.classList.remove('animate__fadeOut');
        imageElement.src = images[currentImageIndex];
        updateButtons();

        // Start fade-in animation
        imageElement.classList.add('animate__fadeIn');
        imageElement.addEventListener('animationend', function handleFadeIn() {
            imageElement.removeEventListener('animationend', handleFadeIn);
            imageElement.classList.remove('animate__animated', 'animate__fadeIn');
            isAnimating = false;
        }, { once: true });
    }, { once: true });
}

function updateButtons() {
    document.getElementById('prevButton').disabled = currentImageIndex === 0;
    document.getElementById('nextButton').disabled = currentImageIndex === images.length - 1;
}

function celebrate() {
    for (let i = 0; i < 50; i++) {
        createConfetti();
    }
}

function createConfetti() {
    const confetti = document.createElement('div');
    confetti.classList.add('confetti');
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
    confetti.style.animationDuration = (Math.random() * 2 + 1) + 's';
    document.body.appendChild(confetti);

    setTimeout(() => {
        confetti.remove();
    }, 3000);
}

window.onload = function() {
    updateButtons();
};

document.addEventListener('keydown', function(event) {
    if (event.key === 'e' || event.key === 'E') {
        alert("Thanks for visiting my webpage! You're awesome! 🌟");
    }
});
