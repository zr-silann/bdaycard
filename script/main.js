const fetchData = () => {
  fetch("customize.json")
    .then(response => {
      if (!response.ok) {
        throw new Error(`Failed to load customize.json: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      const dataArr = Object.keys(data);
      dataArr.forEach(customData => {
        if (data[customData] !== "") {
          const element = document.querySelector(`[data-node-name*="${customData}"]`);
          if (element) {
            if (customData === "imagePath") {
              element.setAttribute("src", data[customData]);
            } else {
              element.innerText = data[customData];
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

let activePopSound = null;

const playPopSoundInstantly = () => {
  activePopSound = new Audio("sound/fireworks.mp3"); 
  activePopSound.volume = 0.1; 
  activePopSound.play().catch(e => console.log("Audio play blocked by browser:", e));
};

const playDelayedPopSound = () => {
  setTimeout(() => {
    const delayedPop = new Audio("sound/fireworks.mp3"); 
    delayedPop.volume = 0.1; 
    delayedPop.play().catch(e => console.log("Audio play blocked by browser:", e));
  }, 500);
};

const stopPopSound = () => {
  if (activePopSound) {
    let fadeAudio = setInterval(() => {
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
  bdaySong.play().catch(e => console.log("Audio play blocked by browser:", e));
};

const animationTimeline = () => {
  const textBoxChars = document.getElementsByClassName("hbd-chatbox")[0];
  const hbd = document.getElementsByClassName("wish-hbd")[0];

  if (textBoxChars) {
    textBoxChars.innerHTML = `<span>${textBoxChars.innerHTML
      .split("")
      .join("</span><span>")}</span>`;
  }

  if (hbd) {
    hbd.innerHTML = `<span>${hbd.innerHTML
      .split("")
      .join("</span><span>")}</span>`;
  }

  const ideaTextTrans = {
    opacity: 0,
    y: -20,
    rotationX: 5,
    skewX: "15deg"
  };

  const ideaTextTransLeave = {
    opacity: 0,
    y: 20,
    rotationY: 5,
    skewX: "-15deg"
  };

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
    .staggerTo(".hbd-chatbox span", 0.5, { visibility: "visible" }, 0.05)
    .to(".fake-btn", 0.1, { backgroundColor: "rgb(127, 206, 248)" })
    .to(".four", 0.5, { scale: 0.2, opacity: 0, y: -150 }, "+=0.7")
    .from(".idea-1", 0.7, ideaTextTrans)
    .to(".idea-1", 0.7, ideaTextTransLeave, "+=1.5")
    .from(".idea-2", 0.7, ideaTextTrans)
    .to(".idea-2", 0.7, ideaTextTransLeave, "+=1.5")
    .from(".idea-3", 0.7, ideaTextTrans)
    .to(".idea-3 strong", 0.5, { scale: 1.2, x: 10, backgroundColor: "rgb(21, 161, 237)", color: "#fff" })
    .to(".idea-3", 0.7, ideaTextTransLeave, "+=1.5")
    .from(".idea-4", 0.7, ideaTextTrans)
    .to(".idea-4", 0.7, ideaTextTransLeave, "+=1.5")
    .from(".idea-5", 0.7, { rotationX: 15, rotationZ: -10, skewY: "-5deg", y: 50, z: 10, opacity: 0 }, "+=0.5")
    .to(".idea-5 .smiley", 0.7, { rotation: 90, x: 8 }, "+=0.4")
    .to(".idea-5", 0.7, { scale: 0.2, opacity: 0 }, "+=2")
    .staggerFrom(".idea-6 span", 0.8, { scale: 3, opacity: 0, rotation: 15, ease: Expo.easeOut }, 0.2)
    .staggerTo(".idea-6 span", 0.8, { scale: 3, opacity: 0, rotation: -15, ease: Expo.easeOut }, 0.2, "+=1")
    .call(() => {
      const cakeAnim = document.getElementById("bizcocho_1");
      if (cakeAnim) cakeAnim.beginElement();
    })
    .to(".cake-container", 0.5, { autoAlpha: 1 })
    .staggerFromTo(".baloons img", 2.5, { opacity: 0.9, y: 1400 }, { opacity: 1, y: -1000 }, 0.2)
    .to(".cake-container", 0.5, { autoAlpha: 0 })
    .from(".lydia-dp", 0.5, { scale: 3.5, opacity: 0, x: 25, y: -25, rotationZ: -45 })
    .staggerFrom(".wish-hbd span", 0.7, { opacity: 0, y: -50, rotation: 150, skewX: "30deg", ease: Elastic.easeOut.config(1, 0.5) }, 0.1)
    .staggerFromTo(".wish-hbd span", 0.7, { scale: 1.4, rotationY: 150 }, { scale: 1, rotationY: 0, color: "#743e12", ease: Expo.easeOut }, 0.1, "party")
    .from(".wish h5", 0.5, { opacity: 0, y: 10, skewX: "-15deg" }, "party")
    .staggerTo(".eight svg", 1.5, { visibility: "visible", opacity: 0, scale: 80, repeat: 3, repeatDelay: 1.4, onStart: playPopSoundInstantly, onRepeat: playPopSoundInstantly, onComplete: stopPopSound }, 0.3)
    .to(".six", 0.5, { opacity: 0, y: 30, zIndex: "-1" })
    .staggerFrom(".nine p", 1, ideaTextTrans, 1.2)
    .to(".last-smile", 0.5, { rotation: 90 }, "+=1")
    .to(".nine", 0.8, { opacity: 0, y: -20 }, "+=1.5")
    .to("#cardWrapper", 1, { autoAlpha: 1 });

  const replyBtn = document.getElementById("replay");
  if (replyBtn) {
    replyBtn.addEventListener("click", () => {
      tl.restart();
    });
  }
};

const initStartButton = () => {
  const startBtn = document.getElementById("start-btn") || document.getElementById("start") || document.querySelector("button");
  const introContainer = document.getElementById("intro-container");

  if (startBtn) {
    startBtn.addEventListener("click", () => {
      if (introContainer) {
        introContainer.style.display = "none";
      }
      playSong();
      fetchData();
    });
  } else {
    console.warn("Start button not found in the DOM.");
  }
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initStartButton);
} else {
  initStartButton();
}
