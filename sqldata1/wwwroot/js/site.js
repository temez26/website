     // Scroll animation
        function scrollAnimation() {
            const galleryItems = document.querySelectorAll(".scroll-animation");

            function fadeIn(item) {
                item.style.animation = "fadeIn 0.5s forwards";
            }

            function fadeOut(item) {
                item.style.animation = "fadeOut 0.5s forwards";
            }

            function handleScroll() {
                const windowHeight = window.innerHeight;

                galleryItems.forEach((item) => {
                    const itemTop = item.getBoundingClientRect().top;

                    if (itemTop < windowHeight) {
                        fadeIn(item);
                    } else {
                        fadeOut(item);
                    }
                });
            }

            window.addEventListener("scroll", handleScroll);
            handleScroll();
        }

        var currentIndex = 0; // Track the current image index globally

        // Open the modal and display the clicked image in full-screen
        function openModal(element) {
            var modal = document.getElementById("myModal");
            var modalImg = document.getElementById("modalImg");

            modal.style.display = "block";
            modalImg.src = element.src;
            modalImg.classList.add("open");

            currentIndex = Array.prototype.indexOf.call(
                document.getElementsByClassName("scroll-animation"),
                element
            );

            modalImg.onclick = function () {
                changePicture(1);
            };

            var prev = document.getElementsByClassName("prev")[0];
            var next = document.getElementsByClassName("next")[0];

            prev.onclick = function () {
                changePicture(-1);
            };

            next.onclick = function () {
                changePicture(1);
            };
        }

        
// Change picture in fullscreen mode
function changePicture(n) {
    var modalImg = document.getElementById("modalImg");
    var galleryItems = document.getElementsByClassName("scroll-animation");

    currentIndex += n; // Update the current index based on the direction

    if (currentIndex < 0) {
        currentIndex = galleryItems.length - 1;
    } else if (currentIndex >= galleryItems.length) {
        currentIndex = 0;
    }

    modalImg.src = galleryItems[currentIndex].src;

    var prev = document.getElementsByClassName("prev")[0];
    var next = document.getElementsByClassName("next")[0];

    // Position the left arrow based on the current index
    if (currentIndex === 0) {
        prev.style.left = "-9999px"; // Hide the left arrow when viewing the first image
    } else {
        prev.style.left = "10px"; // Position the left arrow
    }
}


        // Close the modal
        function closeModal() {
            var modal = document.getElementById("myModal");
            var modalImg = document.getElementById("modalImg");

            modalImg.classList.remove("open");
            modalImg.classList.add("closed");
            setTimeout(function () {
                modal.style.display = "none";
                modalImg.classList.remove("closed");
            }, 600);
        }

scrollAnimation();
// Check if dark mode state is stored in localStorage
function toggleDarkMode() {
    var body = document.body;
    var darkModeToggle = document.getElementById("darkModeToggle");
    var darkModeIcon = document.getElementById("darkModeIcon");
    var darkModeText = document.getElementById("darkModeText");

    if (darkModeToggle.checked) {
        // Enable dark mode
        body.classList.add("dark-mode");
        darkModeIcon.classList.remove("fa-sun");
        darkModeIcon.classList.add("fa-moon");
        darkModeText.textContent = "Dark Mode";
        saveModePreference("dark-mode");
    } else {
        // Enable light mode
        body.classList.remove("dark-mode");
        darkModeIcon.classList.remove("fa-moon");
        darkModeIcon.classList.add("fa-sun");
        darkModeText.textContent = "Light Mode";
        saveModePreference("light-mode");
    }
}

function saveModePreference(mode) {
    localStorage.setItem("modePreference", mode);
}

function applySavedMode() {
    var savedMode = localStorage.getItem("modePreference");
    var body = document.body;
    var darkModeToggle = document.getElementById("darkModeToggle");
    var darkModeIcon = document.getElementById("darkModeIcon");
    var darkModeText = document.getElementById("darkModeText");

    if (savedMode === "dark-mode") {
        // Enable dark mode
        body.classList.add("dark-mode");
        darkModeToggle.checked = true;
        darkModeIcon.classList.remove("fa-sun");
        darkModeIcon.classList.add("fa-moon");
        darkModeText.textContent = "Dark Mode";
    } else {
        // Enable light mode (default)
        body.classList.remove("dark-mode");
        darkModeToggle.checked = false;
        darkModeIcon.classList.remove("fa-moon");
        darkModeIcon.classList.add("fa-sun");
        darkModeText.textContent = "Light Mode";
    }

    // Show the content after the preferred mode is applied
    var contentWrapper = document.getElementById("contentWrapper");
    contentWrapper.classList.remove("content-hidden");
}