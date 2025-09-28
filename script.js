document.getElementById("toggle-mode").addEventListener("click", function () {
    const body = document.body;
    const button = this;

    if (body.classList.contains("light-mode")) {
        body.classList.remove("light-mode");
        body.classList.add("dark-mode");
        button.textContent = "LIGHTMODE";
    } else {
        body.classList.remove("dark-mode");
        body.classList.add("light-mode");
        button.textContent = "DARKMODE";
    }
});