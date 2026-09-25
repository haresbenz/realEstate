

    /* =====================================================
       ADD AS MANY IMAGES/VIDEOS AS YOU WANT
    ===================================================== */

    const slides = [

        {
            image: "img/palm/coraldune.webp",
            video: "videos/coralF.mp4",
            title: "Villa Coral Dune "
        },

        {
            image: "img/palm/sunsetMiraage.webp",
            video: "videos/beachF.mp4",
            title: "Villa Sunset Mirage"
        },

        {
            image: "img/palm/Amberreef.webp",
            video: "videos/pvtResF.mp4",
            title: "Villa Amber Reef"
        },

        {
            image: "img/palm/redaurora.webp",
            video: "videos/first.mp4",
            title: "Villa Red Aurora"
        },

        {
            image: "img/palm/rosewood.webp",
            video: "videos/video5.mp4",
            title: "Villa RedWood"
        },

        {
            image: "img/palm/porcelain.webp",
            video: "videos/video6.mp4",
            title: "Villa Porcelain Roses"
        },

        // {
        //     image: "images/gallery/image7.webp",
        //     video: "videos/video7.mp4",
        //     title: "Private Residences"
        // },

        // {
        //     image: "images/gallery/image8.webp",
        //     video: "videos/video8.mp4",
        //     title: "Exclusive Spaces"
        // }

    ];


    /* =====================================================
       ELEMENTS
    ===================================================== */

    const track =
        document.getElementById("carouselTrack");

    const dotsContainer =
        document.getElementById("carouselDots");

    const prevBtn =
        document.getElementById("prevBtn");

    const nextBtn =
        document.getElementById("nextBtn");

    const fullscreen =
        document.getElementById("fullscreenVideo");

    const fullscreenPlayer =
        document.getElementById("fullscreenPlayer");

    const closeVideo =
        document.getElementById("closeVideo");


    let currentIndex = 0;


    /* =====================================================
       CREATE SLIDES
    ===================================================== */

    slides.forEach((slide, index) => {

        const card =
            document.createElement("div");

        card.className = "media-card";


        card.innerHTML = `

            <img
                class="media-image"
                src="${slide.image}"
                alt="${slide.title}"
                draggable="false"
            >

            <video
                class="media-video"
                muted
                playsinline
                preload="metadata"
            >
                <source
                    src="${slide.video}"
                    type="video/mp4">
            </video>

            <!-- Final image shown after video -->
            <img
                class="final-image"
                src="${slide.image}"
                alt=""
                draggable="false"
            >

            <div class="media-overlay"></div>

            <div class="card-content">

                <div class="card-number">
                    ${String(index + 1).padStart(2, "0")}
                </div>

                <div class="card-title">
                    ${slide.title}
                </div>

                <div class="video-hint">
                    Hover to preview · Click to watch
                </div>

            </div>

        `;


        track.appendChild(card);


        /* =================================================
           HOVER → PLAY VIDEO
        ================================================= */

        card.addEventListener("mouseenter", () => {

            /*
                If this video has already finished,
                don't restart it.
            */

            if (card.classList.contains("video-finished")) {
                return;
            }

            const video =
                card.querySelector(".media-video");

            card.classList.add("is-video");

            video.currentTime = 0;

            video.play().catch(() => {});

        });


        /* =================================================
           MOUSE LEAVE → STOP VIDEO
        ================================================= */

        card.addEventListener("mouseleave", () => {

            if (card.classList.contains("video-finished")) {
                return;
            }

            const video =
                card.querySelector(".media-video");

            video.pause();

            video.currentTime = 0;

            card.classList.remove("is-video");

        });


        /* =================================================
           VIDEO FINISHED
        ================================================= */

        const video =
            card.querySelector(".media-video");


        video.addEventListener("ended", () => {

            /*
                Video finished:
                show final image.
            */

            card.classList.remove("is-video");

            card.classList.add("video-finished");

        });


        /* =================================================
           CLICK → FULLSCREEN
        ================================================= */

        card.addEventListener("click", () => {

            /*
                Don't open fullscreen if the final
                image is currently displayed.
            */

            if (card.classList.contains("video-finished")) {
                return;
            }

            openFullscreen(slide.video);

        });

    });


    /* =====================================================
       CREATE DOTS
    ===================================================== */

    slides.forEach((slide, index) => {

        const dot =
            document.createElement("button");

        dot.className = "carousel-dot";

        if (index === 0) {
            dot.classList.add("active");
        }

        dot.addEventListener("click", () => {

            currentIndex = index;

            updateCarousel();

        });

        dotsContainer.appendChild(dot);

    });


    /* =====================================================
       GET NUMBER OF VISIBLE CARDS
    ===================================================== */

    function getVisibleCards() {

        if (window.innerWidth <= 500) {
            return 1;
        }

        if (window.innerWidth <= 750) {
            return 2;
        }

        if (window.innerWidth <= 1100) {
            return 3;
        }

        return 4;

    }


    /* =====================================================
       UPDATE CAROUSEL
    ===================================================== */

    function updateCarousel() {

        const cards =
            document.querySelectorAll(".media-card");

        if (!cards.length) return;


        const visible =
            getVisibleCards();

        const maxIndex =
            Math.max(0, slides.length - visible);


        currentIndex =
            Math.min(currentIndex, maxIndex);


        const cardWidth =
            cards[0].offsetWidth;

        const gap = 20;


        track.style.transform =
            `translateX(-${currentIndex * (cardWidth + gap)}px)`;


        /* Update dots */

        const dots =
            document.querySelectorAll(".carousel-dot");

        dots.forEach((dot, index) => {

            dot.classList.toggle(
                "active",
                index === currentIndex
            );

        });

    }


    /* =====================================================
       NEXT
    ===================================================== */

    nextBtn.addEventListener("click", () => {

        const visible =
            getVisibleCards();

        const maxIndex =
            Math.max(0, slides.length - visible);


        if (currentIndex < maxIndex) {

            currentIndex++;

            updateCarousel();

        }

    });


    /* =====================================================
       PREVIOUS
    ===================================================== */

    prevBtn.addEventListener("click", () => {

        if (currentIndex > 0) {

            currentIndex--;

            updateCarousel();

        }

    });


    /* =====================================================
       FULLSCREEN VIDEO
    ===================================================== */

    function openFullscreen(videoSource) {

        fullscreenPlayer.src =
            videoSource;

        fullscreen.classList.add("active");

        document.body.style.overflow =
            "hidden";


        fullscreenPlayer.currentTime = 0;


        fullscreenPlayer.play().catch(() => {});


        /*
            Try browser's REAL fullscreen API
        */

        if (fullscreen.requestFullscreen) {

            fullscreen.requestFullscreen().catch(() => {});

        }

    }


    /* =====================================================
       CLOSE FULLSCREEN
    ===================================================== */

    function closeFullscreen() {

        fullscreenPlayer.pause();

        fullscreenPlayer.removeAttribute("src");

        fullscreenPlayer.load();

        fullscreen.classList.remove("active");

        document.body.style.overflow = "";


        if (document.fullscreenElement) {

            document.exitFullscreen().catch(() => {});

        }

    }


    closeVideo.addEventListener(
        "click",
        closeFullscreen
    );


    /* ESC KEY */

    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {

            closeFullscreen();

        }

    });


    /* =====================================================
       WHEN FULLSCREEN VIDEO ENDS
    ===================================================== */

    fullscreenPlayer.addEventListener("ended", () => {

        closeFullscreen();

    });


    /* =====================================================
       RESPONSIVE RESIZE
    ===================================================== */

    window.addEventListener(
        "resize",
        updateCarousel
    );


    /* =====================================================
       INITIALIZE
    ===================================================== */

    window.addEventListener(
        "load",
        updateCarousel
    );
