document.addEventListener("DOMContentLoaded", function () {
    
    // ==========================================
    // 1. GALLERY FILTER SYSTEM
    // ==========================================
    const filterButtons = document.querySelectorAll(".filter-btn");
    const galleryItems = document.querySelectorAll(".gallery-item");

    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener("click", function () {
                // Active button class toggle
                filterButtons.forEach(btn => btn.classList.remove("bg-[#B59410]", "text-white"));
                this.classList.add("bg-[#B59410]", "text-white");

                const category = this.getAttribute("data-category");

                galleryItems.forEach(item => {
                    if (category === "all" || item.classList.contains(category)) {
                        item.style.display = "block";
                        setTimeout(() => { item.style.opacity = "1"; }, 50);
                    } else {
                        item.style.opacity = "0";
                        setTimeout(() => { item.style.display = "none"; }, 300);
                    }
                });
            });
        });
    }

    // ==========================================
    // 2. BEFORE/AFTER INTERACTIVE SLIDER
    // ==========================================
    const sliderContainer = document.querySelector(".slider-container");
    const imgAfter = document.querySelector(".img-after");
    const sliderHandle = document.querySelector(".slider-handle");

    if (sliderContainer && imgAfter && sliderHandle) {
        let isDragging = false;

        const moveSlider = (clientX) => {
            const rect = sliderContainer.getBoundingClientRect();
            let position = ((clientX - rect.left) / rect.width) * 100;

            // Boundaries set karna (0% se 100% ke beech)
            if (position < 0) position = 0;
            if (position > 100) position = 100;

            // Handle aur After-image ko real-time update karna
            sliderHandle.style.left = `${position}%`;
            imgAfter.style.clipPath = `inset(0 0 0 ${position}%)`;
        };

        // Desktop Mouse Events
        sliderContainer.addEventListener("mousedown", () => isDragging = true);
        window.addEventListener("mouseup", () => isDragging = false);
        sliderContainer.addEventListener("mousemove", (e) => {
            if (!isDragging) return;
            moveSlider(e.clientX);
        });

        // Mobile Touch Events
        sliderContainer.addEventListener("touchstart", () => isDragging = true);
        window.addEventListener("touchend", () => isDragging = false);
        sliderContainer.addEventListener("touchmove", (e) => {
            if (!isDragging) return;
            moveSlider(e.touches[0].clientX);
        });
    }

    // ==========================================
    // 3. SMART BOOKING FORM VALIDATION
    // ==========================================
    const bookingForm = document.querySelector("#booking-form");
    if (bookingForm) {
        bookingForm.addEventListener("submit", function (e) {
            e.preventDefault(); // Default page refresh rokne ke liye

            // Inputs read karna
            const name = this.querySelector('input[type="text"]').value;
            const phone = this.querySelector('input[type="tel"]').value;
            const eventDate = this.querySelector('input[type="date"]').value;
            const eventType = this.querySelector('select').value;

            // Simple validation check
            if (name && phone && eventDate) {
                alert(`Thank you, ${name}! Aapki Yaseen Ed decoration enquiry (${eventType}) successfully receive ho gayi hai. Hum jald hi aapse contact karenge.`);
                bookingForm.reset(); // Form clear karne ke liye
            } else {
                alert("Kripya karke sabhi zaroori fields sahi se bharein.");
            }
        });
    }
});
const slides = document.getElementById("slides");
const totalSlides = slides.children.length;

let index = 0;

function nextSlide(){

    index++;

    slides.style.transition = "transform .8s ease";
    slides.style.transform = `translateX(-${index*100}%)`;

    if(index === totalSlides-1){

        setTimeout(()=>{

            slides.style.transition = "none";
            index = 0;
            slides.style.transform = "translateX(0)";

        },800);

    }

}

setInterval(nextSlide,2500);