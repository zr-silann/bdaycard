
const fetchData = () => {
  fetch("customize.json")
    .then(res => res.json())
    .then(data => {
      Object.keys(data).forEach(key => {
        if (data[key] !== "") {
          const el = document.querySelector(`[data-node-name*="${key}"]`);
          if (el) {
            if (key === "imagePath") {
              el.setAttribute("src", data[key]);
            } else {
              el.innerText = data[key];
            }
          }
        }
      });
      animationTimeline();
    })
    .catch(err => {
      console.warn("Using defaults due to fetch error:", err);
      animationTimeline();
    });
};


let activePopSound = null;

const playSong = () => {
  const bdaySong = new Audio("sound/bday-song.mp3");
  bdaySong.volume = 0.4;
  bdaySong.play().catch(e => console.log("Audio blocked:", e));
};

const playPopSoundInstantly = () => {
  activePopSound = new Audio("sound/fireworks.mp3");
  activePopSound.volume = 0.1;
  activePopSound.play().catch(e => console.log("Audio blocked:", e));
};

const stopPopSound = () => {
  if (activePopSound) {
    const fade = setInterval(() => {
      if (activePopSound.volume > 0.05) {
        activePopSound.volume -= 0.05;
      } else {
        clearInterval(fade);
        activePopSound.pause();
        activePopSound.currentTime = 0;
      }
    }, 30);
  }
};



const animationTimeline = () => {
  const textBoxChars = document.querySelector(".hbd-chatbox");
  const hbd = document.querySelector(".wish-hbd");

  if (textBoxChars) {
    textBoxChars.innerHTML = `<span>${textBoxChars.innerHTML.split("").join("</span><span>")}</span>`;
  }
  if (hbd) {
    hbd.innerHTML = `<span>${hbd.innerHTML.split("").join("</span><span>")}</span>`;
  }

  const tl = new TimelineMax();

  tl.to(".container", 0.1, { visibility: "visible" })
    .from(".one", 0.7, { opacity: 0, y: 10 })
    .from(".two", 0.4, { opacity: 0, y: 10 })
    // … keep your other steps …
    .staggerTo(".eight svg", 1.5, {
      visibility: "visible",
      opacity: 0,
      scale: 80,
      repeat: 3,
      repeatDelay: 1.4,
      onStart: playPopSoundInstantly,
      onRepeat: playPopSoundInstantly,
      onComplete: stopPopSound
    }, 0.3)
    .to("#cardWrapper", 1, { autoAlpha: 1 });

  const replyBtn = document.getElementById("replay");
  if (replyBtn) replyBtn.addEventListener("click", () => tl.restart());
};

// 🚀 Init
document.addEventListener("DOMContentLoaded", () => {
  playSong();   // 🎵 Play birthday song
  fetchData();  // Load data + run animation
});

