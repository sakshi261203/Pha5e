gsap.registerPlugin(ScrollTrigger);

gsap.to(".main", {
    y: () => -document.documentElement.scrollHeight + window.innerHeight,
    ease: "power1.inOut",
    scrollTrigger: {
        trigger: ".main",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5, 
        pin: false, 
    }
});

    const images = document.querySelectorAll(".hero img");
    const heading = document.querySelector(".hero h1");

    images.forEach(img => {
        img.addEventListener("mousemove", (e) => {
            const { left, top, width, height } = img.getBoundingClientRect();
            const moveX = (e.clientX - left - width / 2) * 1.9; 
            const moveY = (e.clientY - top - height / 2) * 1.9; 
            
            img.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });

        img.addEventListener("mouseleave", () => {
            img.style.transition = "transform 0.5s ease-out"; 
            img.style.transform = "translate(0, 0)";
            heading.style.color = ""; 
            heading.style.webkitTextStroke = ""; 
        });

        img.addEventListener("mouseenter", (e) => {
            console.log(e.target.next);
            heading.style.color = "transparent";
            heading.style.webkitTextStroke = "1px rgb(75, 75, 75)";
        });
    });

images.forEach((img) => {
    img.addEventListener("mouseenter", () => {
        images.forEach((otherImg) => {
            if (otherImg !== img) {
                gsap.to(otherImg, {
                    opacity: 0,
                    ease: "power2.out",
                    duration: 0.3,
                });

                if (!otherImg.querySelector(".image-overlay")) {
                    let overlay = document.createElement("div");
                    overlay.classList.add("image-overlay");
                    otherImg.parentElement.appendChild(overlay);

                    let { width, height, top, left } = otherImg.getBoundingClientRect();
                    overlay.style.width = `${width}px`;
                    overlay.style.height = `${height}px`;
                    overlay.style.top = `${top}px`;
                    overlay.style.left = `${left}px`;
                }
            }
        });
    });

    img.addEventListener("mouseleave", () => {
        images.forEach((otherImg) => {
            if (otherImg !== img) {
                gsap.to(otherImg, {
                    opacity: 1,
                    ease: "power2.out",
                    duration: 0.3,
                });

                let overlay = document.querySelector(".image-overlay");
                if (overlay) overlay.remove();
            }
        });
    });
});

const style = document.createElement("style");
style.innerHTML = `
    .image-overlay {
        position: absolute;
        border: 1px solid rgb(75,75,75) ;
        background-color: #212121;
        display: flex;
        align-items: center;
        justify-content: center;
        pointer-events: none;
        z-index: 1;
    }

    .image-overlay::before, .image-overlay::after {
        content: "";
        position: absolute;
        width: 116.5%;
        height: 1px;
        background-color: rgb(75,75,75);
    }

    .image-overlay::before {
        transform: rotate(31.7deg);
    }

    .image-overlay::after {
        transform: rotate(-31.7deg);
    }
`;
document.head.appendChild(style);



