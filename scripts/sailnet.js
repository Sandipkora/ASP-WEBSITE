/* ===============================
   SLIDER (Auto + Buttons)
================================*/
document.addEventListener("DOMContentLoaded", () => {

    const track = document.getElementById("sliderTrack");
    const nextBtn = document.getElementById("slideNext");
    const prevBtn = document.getElementById("slidePrev");

    if (track && nextBtn && prevBtn) {

        const slides = track.querySelectorAll(".slide");
        const totalSlides = slides.length;
        let slideIndex = 0;
        let isMoving = false;

        function moveSlider() {
            if (isMoving) return;
            isMoving = true;

            track.style.transform = `translateX(-${slideIndex * 100}%)`;

            setTimeout(() => { isMoving = false; }, 550);
        }

        nextBtn.onclick = () => {
            slideIndex = (slideIndex + 1) % totalSlides;
            moveSlider();
        };

        prevBtn.onclick = () => {
            slideIndex = (slideIndex - 1 + totalSlides) % totalSlides;
            moveSlider();
        };

        setInterval(() => {
            slideIndex = (slideIndex + 1) % totalSlides;
            moveSlider();
        }, 6000);
    }
});

/* ==========================================================
   NEW TAB LINKS (SSO, IPSS, PMS, etc.)
   These URLs cannot load inside iframe.
==========================================================*/
function openLink(url) {
    window.open(url, "_blank");
}

/* ==========================================================
   ONLY FOR IFRAME SUPPORTED LINKS (SAIL Portal etc.)
==========================================================*/
function loadPage(url, element) {

    // Remove highlight from all options
    document.querySelectorAll(".list-group-item")
        .forEach(li => li.classList.remove("active"));

    // Highlight the selected one
    if (element) element.classList.add("active");

    // Load URL inside iframe
    const iframe = document.getElementById("dynamicFrame");
    if (iframe) iframe.src = url;
}
