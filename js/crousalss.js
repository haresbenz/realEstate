

    /* ============================= */
    /* CAROUSEL */
    /* ============================= */

    function movePlans(direction) {

        const carousel = document.getElementById("plansCarousel");

        const card = carousel.querySelector(".plan-card");

        if (!card) return;

        const cardWidth = card.offsetWidth + 15;

        carousel.scrollBy({
            left: direction * cardWidth,
            behavior: "smooth"
        });
    }


    /* ============================= */
    /* OPEN LARGE IMAGE */
    /* ============================= */

    function openPlan(imageSrc) {

        const lightbox = document.getElementById("planLightbox");
        const largeImage = document.getElementById("largePlanImage");

        largeImage.src = imageSrc;

        lightbox.classList.add("active");

        document.body.style.overflow = "hidden";
    }


    /* ============================= */
    /* CLOSE LARGE IMAGE */
    /* ============================= */

    function closePlan(event) {

        if (event) {
            event.stopPropagation();
        }

        const lightbox = document.getElementById("planLightbox");

        lightbox.classList.remove("active");

        document.body.style.overflow = "";
    }


    /* ============================= */
    /* ESC KEY TO CLOSE */
    /* ============================= */

    document.addEventListener("keydown", function(event) {

        if (event.key === "Escape") {
            closePlan();
        }

    });

