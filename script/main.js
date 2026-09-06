<!-- Include GSAP -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/2.1.3/TweenMax.min.js"></script>

<script>
const fetchData = () => {
  fetch("customize.json")
    .then(response => {
      if (!response.ok) throw new Error(`Failed to load customize.json: ${response.status}`);
      return response.json();
    })
    .then(data => {
      Object.keys(data).forEach(key => {
        if (data[key] !== "") {
          const element = document.querySelector(`[data-node-name="${key}"]`);
          if (element) {
            if (key === "imagePath") {
              element.setAttribute("src", data[key]);
            } else {
              element.innerText = data[key];
            }
          }
        }
      });
      animationTimeline();
    })
    .catch(error => {
      console.warn("Using default text due to fetch error:", error);
      animationTimeline();
    });
};

// 🔊 Audio helpers
let activePopSound = null;

const playPopSoundInstantly = () => {
  activePopSound = new Audio("sound/fireworks.mp3");
  activePopSound.volume = 0.1;
  activePopSound.play().catch(e => console.log("Audio blocked:", e));
};

const stopPopSound = () => {
  if (activePopSound) {
    const fadeAudio = setInterval(() => {
      if (activePopSound.volume > 0.05) {
        activePopSound.volume -= 0.05;
      } else {
        clearInterval(fadeAudio);
        activePopSound.pause();
        activePopSound.currentTime = 0;
      }
    }, 30);
  }
};

const playSong = () => {
  const bdaySong = new Audio("sound/bday-song.mp3");
  bdaySong.volume = 0.4;
  bdaySong.play().catch(e => console.log("Audio blocked:", e));
};

// 🎉 Animation timeline
const animationTimeline = () => {
  const tl = new TimelineMax();

  tl.to(".container", 0.1, { autoAlpha: 1 })
    .from(".one", 0.7, { opacity: 0, y: 10 })
    .from(".two", 0.4, { opacity: 0, y: 10 })
    .to(".one", 0.7, { opacity: 0, y: 10 }, "+=2.5")
    .to(".two", 0.7, { opacity: 0, y: 10 }, "-=1")
    .from(".three", 0.7, { opacity: 0, y: 10 })
    .to(".three", 0.7, { opacity: 0, y: 10 }, "+=2")
    .from(".four", 0.7, { scale: 0.2, opacity: 0 })
    .from(".fake-btn", 0.3, { scale: 0.2, opacity: 0 })
    .to(".fake-btn", 0.1, { backgroundColor: "rgb(127, 206, 248)" })
    .to(".four", 0.5, { scale: 0.2, opacity: 0, y: -150 }, "+=0.7")
    .from(".idea-1", 0.7, { opacity: 0, y: -20 })
    .to(".idea-1", 0.7, { opacity: 0, y: 20 }, "+=1.5")
    .from(".idea-2", 0.7, { opacity: 0, y: -20 })
    .to(".idea-2", 0.7, { opacity: 0, y: 20 }, "+=1.5")
    .from(".idea-3", 0.7, { opacity: 0, y: -20 })
    .to(".idea-3 strong", 0.5, { scale: 1.2, x: 10, backgroundColor: "rgb(21, 161, 237)", color: "#fff" })
    .to(".idea-3", 0.7, { opacity: 0, y: 20 }, "+=1.5")
    .from(".idea-4", 0.7, { opacity: 0, y: -20 })
    .to(".idea-4", 0.7, { opacity: 0, y: 20 }, "+=1.5")
    .from(".idea-5", 0.7, { rotationX: 15, y: 50, opacity: 0 }, "+=0.5")
    .to(".idea-5", 0.7, { scale: 0.2, opacity: 0 }, "+=2")
    .to(".cake-container", 0.5, { autoAlpha: 1 })
    .staggerFromTo(".baloons img", 2.5, { opacity: 0.9, y: 1400 }, { opacity: 1, y: -1000 }, 0.2)
    .to(".cake-container", 0.5, { autoAlpha: 0 })
    .from(".lydia-dp", 0.5, { scale: 3.5, opacity: 0 })
    .staggerFrom(".wish-hbd span", 0.7, { opacity: 0, y: -50, rotation: 150 }, 0.1)
    .staggerTo(".eight svg", 1.5, { visibility: "visible", opacity: 0, scale: 80, repeat: 3, repeatDelay: 1.4, onStart: playPopSoundInstantly, onComplete: stopPopSound }, 0.3)
    .to("#cardWrapper", 1, { autoAlpha: 1 });

  const replyBtn = document.getElementById("replay");
  if (replyBtn) replyBtn.addEventListener("click", () => tl.restart());
};

// 🚀 Init
const initStartButton = () => {
  const startBtn = document.getElementById("start-btn") || document.querySelector("button");
  const introContainer = document.getElementById("intro-container");

  if (startBtn) {
    startBtn.addEventListener("click", () => {
      if (introContainer) introContainer.style.display = "none";
      playSong();
      fetchData();
    });
  } else {
    console.warn("Start button not found in the DOM.");
  }
};

document.addEventListener("DOMContentLoaded", initStartButton);
</script>
