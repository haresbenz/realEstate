
(function () {
    const markers = Array.from(document.querySelectorAll(".marker"));
    const infoTitle = document.getElementById("infoTitle");
    let currentIndex = 0;
    let autoRotateTimer = null;

    const routeData = {
        "Ibn Battuta Mall & Metro": "M25.5 70.2 Q37.2 50.5 48.9 58.5",
        "Jebel Ali Port & Free Zone": "M25.5 70.2 Q31.85 59 38.2 67",
        "Dubai Marina & JBR": "M25.5 70.2 Q39.1 43.1 52.7 51.1",
        "Al Maktoum International Airport": "M25.5 70.2 Q41 62.2 56.5 90.2",
        "Palm Jumeirah": "M25.5 70.2 Q38.95 35.4 52.4 43.4",
        "Expo City Dubai": "M25.5 70.2 Q40 62.2 54.5 76.6",
        "Downtown Dubai & Burj Khalifa": "M25.5 70.2 Q51.3 18.2 77.1 26.2",
        "Dubai International Airport (DXB)": "M25.5 70.2 Q59.55 6.3 93.6 14.3"
    };

    const activeRoute = document.getElementById("activeRoute");

    function selectDestination(marker) {
        const name = marker.dataset.name;
        const time = marker.dataset.time;

        markers.forEach(item => item.classList.remove("active"));
        marker.classList.add("active");

        infoTitle.textContent = `${name} · ${time} minutes`;
        activeRoute.setAttribute("d", routeData[name]);

        // Synchronize table active state
        document.querySelectorAll(".destination-row").forEach(item => item.classList.remove("active"));
        const row = document.querySelector(`.destination-row button[data-target="${CSS.escape(name)}"]`);
        if (row) {
            row.closest(".destination-row").classList.add("active");
        }

        currentIndex = markers.indexOf(marker);
    }

    function rotateNext() {
        currentIndex = (currentIndex + 1) % markers.length;
        selectDestination(markers[currentIndex]);
    }

    function startAutoRotate() {
        stopAutoRotate();
        autoRotateTimer = setInterval(rotateNext, 10000); // 10000ms = 10 seconds
    }

    function stopAutoRotate() {
        if (autoRotateTimer) {
            clearInterval(autoRotateTimer);
            autoRotateTimer = null;
        }
    }

    // User Interaction events
    markers.forEach(marker => {
        marker.addEventListener("click", function () {
            selectDestination(this);
            startAutoRotate(); // Reset interval countdown on click
        });
    });

    document.querySelectorAll(".destination-row button").forEach(button => {
        button.addEventListener("click", function () {
            const marker = markers.find(item => item.dataset.name === this.dataset.target);
            if (marker) {
                selectDestination(marker);
                startAutoRotate(); // Reset interval countdown on click
            }
        });
    });

    const map = document.getElementById("driveMap");
    const mapCanvas = document.getElementById("mapCanvas");

    // function resizeMapCanvas() {
    //     if (!map || !mapCanvas) return;
    //     const scale = Math.min(1, map.clientWidth / 800.9955555555644);
    //     mapCanvas.style.transform = `scale(${scale})`;
    // }
    function resizeMapCanvas() {
        if (!map || !mapCanvas) return;
    
        const MAP_WIDTH = 800.9955555555644;
        const MAP_HEIGHT = 755.7746720949362;
    
        const availableWidth = map.clientWidth;
        const availableHeight = map.clientHeight;
    
        const scaleX = availableWidth / MAP_WIDTH;
        const scaleY = availableHeight / MAP_HEIGHT;
    
        const scale = Math.min(1, scaleX, scaleY);
    
        const scaledWidth = MAP_WIDTH * scale;
    
        // Center horizontally if there is extra space
        const offsetX = Math.max(0, (availableWidth - scaledWidth) / 2);
    
        mapCanvas.style.transform =
            `translateX(${offsetX}px) scale(${scale})`;
    }

    window.addEventListener("resize", resizeMapCanvas);

    if ("ResizeObserver" in window) {
        new ResizeObserver(resizeMapCanvas).observe(map);
    }

    resizeMapCanvas();

    // Initial load selection and timer start
    const initialMarker = markers.find(m => m.dataset.name === "Downtown Dubai & Burj Khalifa") || markers[0];
    selectDestination(initialMarker);
    startAutoRotate();
})();
