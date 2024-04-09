import gsap from "gsap";

// Declare a general timeline to use in all the animation functions.

const tl = gsap.timeline();

// Preloader Animation
export const preLoaderAnim = () => {
  tl.to(".texts-container", {
    duration: 0,
    opacity: 1,
    ease: "Power3.easeOut",
  })
    .from(".texts-container span", {
      duration: 1.5,
      delay: 1,
      y: 70,
      skewY: 10,
      stagger: 0.5,
      ease: "Power3.easeOut",
    })
    .to(".texts-container span", {
      duration: 1.5,
      y: 100,
      skewY: -15,
      stagger: 0.4,
      ease: "Power3.easeOut",
    })
    .to("body", {
      duration: 0.01,
      css: { overflowY: "scroll" },
      ease: "power3.inOut",
    })
    .from(".sub", {
      // waiting wala div
      duration: 2,
      opacity: 0,
      y: 80,
      ease: "expo.easeOut",
    })
    .to(
      ".preloader",
      // muni kasne animation
      {
        duration: 1.5,
        height: "0vh",
        ease: "Power3.easeOut",
        onComplete: mobileLanding(),
      },
      "-=2"
    )
    .to(".preloader", {
      // Once the preloader animation sequence is complete and the page is ready for interaction, 
      //the preloader itself should be hidden from view.
      duration: 0,
      css: { display: "none" },
    });
};

export const mobileLanding = () => {
  window.innerWidth < 763 &&
    tl.from(".landing__main2", {
      duration: 1,
      delay: 0,
      opacity: 0,
      y: 80,
      ease: "expo.easeOut",
    });
};

