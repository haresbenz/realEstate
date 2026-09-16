


document.addEventListener("DOMContentLoaded", function () {


    const slider =
        document.getElementById("paymentSlider");


    const prevButton =
        document.getElementById("paymentPrev");


    const nextButton =
        document.getElementById("paymentNext");


    /*
     * Desktop:
     *
     * Card width = 240px
     * Gap = 14px
     *
     * Total movement = 254px
     */

    function getScrollAmount() {

        if (window.innerWidth <= 768) {

            return 232;

        }

        return 254;
    }



    /* =====================================
       NEXT
    ===================================== */

    nextButton.addEventListener("click", function () {

        slider.scrollBy({

            left: getScrollAmount(),

            behavior: "smooth"

        });

    });



    /* =====================================
       PREVIOUS
    ===================================== */

    prevButton.addEventListener("click", function () {

        slider.scrollBy({

            left: -getScrollAmount(),

            behavior: "smooth"

        });

    });



    /* =====================================
       MOUSE WHEEL
    ===================================== */

    slider.addEventListener("wheel", function (event) {

        /*
         * Only convert vertical wheel movement
         * into horizontal scrolling.
         */

        if (event.deltaY !== 0) {

            event.preventDefault();

            slider.scrollLeft += event.deltaY;

        }

    }, {
        passive: false
    });


});

