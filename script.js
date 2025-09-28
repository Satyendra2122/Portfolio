document.getElementById("toggle-mode").addEventListener("click", function () {
    const button = this;
    const body = document.body;
    const header = document.getElementById("header");
    const heroSection = document.getElementById("hero-section");
    const backgroundImage = document.getElementById("background-image");

    if (button.textContent === "DARKMODE") {
        // Apply dark mode styles
        body.classList.add("dark-mode");
        body.classList.remove("light-mode");
        header.classList.add("dark-header");
        header.classList.remove("light-header");
        heroSection.classList.add("dark-hero");
        heroSection.classList.remove("light-hero");
        backgroundImage.src = "./img/bg-img2-dark.jpg"; // Change to dark mode background image
        button.textContent = "LIGHTMODE";
    } else {
        // Apply light mode styles
        body.classList.add("light-mode");
        body.classList.remove("dark-mode");
        header.classList.add("light-header");
        header.classList.remove("dark-header");
        heroSection.classList.add("light-hero");
        heroSection.classList.remove("dark-hero");
        backgroundImage.src = "./img/bg-img4-light.jpg"; // Change to light mode background image
        button.textContent = "DARKMODE";
    }
});