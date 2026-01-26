gsap.registerPlugin(ScrollTrigger);


/* HERO TEXT ON LOAD */
gsap.from(".hero-heading", {
  y: 80,
  opacity: 0,
  duration: 1.2,
  ease: "power4.out"
});




/* HERO BACKGROUND CINEMATIC MOTION */
gsap.fromTo(".hero-bg",
  { scale: 1.05 },
  {
    scale: 1.15,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero-section",
      start: "top top",
      end: "bottom top",
      scrub: true
    }
  }
);




/* OUR PROJECTS HEADER */
gsap.from(".projects-header h2", {
  scrollTrigger: {
    trigger: ".projects-header",
    start: "top 85%",
    once: true
  },
  y: 80,
  opacity: 0,
  duration: 1,
  ease: "power4.out"
});


gsap.from(".projects-header p", {
  scrollTrigger: {
    trigger: ".projects-header",
    start: "top 85%",
    once: true
  },
  y: 50,
  opacity: 0,
  duration: 0.9,
  delay: 0.15,
  ease: "power3.out"
});




/* CARDS — EACH FROM DIFFERENT DIRECTION */
gsap.utils.toArray(".card").forEach((card, i) => {


  const dirs = [
    { x: -120, y: 0 },
    { x: 120, y: 0 },
    { x: 0, y: 120 },
    { x: 0, y: -120 }
  ];


  const d = dirs[i % dirs.length];


  gsap.set(card, { x: d.x, y: d.y, opacity: 0 });


  ScrollTrigger.create({
    trigger: card,
    start: "top 95%",
    once: true,
    onEnter: () => {
      gsap.to(card, {
        x: 0,
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: "power3.out"
      });
    }
  });
});




/* HOVER LIFT */
document.querySelectorAll(".card").forEach(card => {
  card.addEventListener("mouseenter", () => {
    gsap.to(card, { y: -10, duration: 0.25, ease: "power2.out" });
  });
  card.addEventListener("mouseleave", () => {
    gsap.to(card, { y: 0, duration: 0.25, ease: "power2.out" });
  });
});




ScrollTrigger.refresh();


