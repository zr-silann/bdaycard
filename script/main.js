```javascript
// Import the data to customize and insert them into page


const fetchData = () => {
  fetch("customize.json")
    .then(data => data.json())
    .then(data => {
      dataArr = Object.keys(data);
      dataArr.map(customData => {
        if (data[customData] !== "") {
          if (customData === "imagePath") {
            document
              .querySelector(`[data-node-name*="${customData}"]`)
              .setAttribute("src", data[customData]);
          } else {
            document.querySelector(`[data-node-name*="${customData}"]`).innerText = data[customData];
          }
        }

        // Check if iteration is complete to trigger timeline
        if (dataArr.length === dataArr.indexOf(customData) + 1) {
          animationTimeline();
        }
      });
    })
    .catch(() => {
      // Fallback if fetch fails so animation still runs
      animationTimeline();
    });
};


// ==========================================================
// MUSIC PLAYER - ONLY PART CHANGED
// ==========================================================

let activePopSound = null;

let bdaySong = new Audio("sound/bday-song.mp3");

bdaySong.volume = 0.4;
bdaySong.loop = true;
bdaySong.preload = "auto";


// This attempts to start the birthday song
// when the page receives the user's first interaction.
const playSong = () => {
  bdaySong.play().catch(e => {
    console.log("Birthday song autoplay blocked:", e);
  });
};


// Start music from the first click/tap.
// This DOES NOT control or start the animation.
document.addEventListener("click", playSong, { once: true });
document.addEventListener("touchstart", playSong, { once: true });


// ==========================================================
// FIREWORK SOUNDS
// ==========================================================

// Starts the main pop sound instantly when the animation comes in
const playPopSoundInstantly = () => {
  activePopSound = new Audio("sound/fireworks.mp3");
  activePopSound.volume = 0.1;
  activePopSound.play().catch(e => console.log("Audio play blocked by browser:", e));
};


// Delays any extra/repeated pops by half a second (500ms)
const playDelayedPopSound = () => {
  setTimeout(() => {
    const delayedPop = new Audio("sound/fireworks.mp3");
    delayedPop.volume = 0.1;
    delayedPop.play().catch(e => console.log("Audio play blocked by browser:", e));
  }, 500);
};


// Stops the sounds when the "eight vg" animation ends
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




// Animation Timeline
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

  
  tl

    .to(".container", 0.1, {
      visibility: "visible"
    })

    .from(".one", 0.7, {
      opacity: 0,
      y: 10
    })

    .from(".two", 0.4, {
      opacity: 0,
      y: 10
    })

    .to(
      ".one",
      0.7,
      {
        opacity: 0,
        y: 10
      },
      "+=2.5"
    )

    .to(
      ".two",
      0.7,
      {
        opacity: 0,
        y: 10
      },
      "-=1"
    )

    .from(".three", 0.7, {
      opacity: 0,
      y: 10
    })

    .to(
      ".three",
      0.7,
      {
        opacity: 0,
        y: 10
      },
      "+=2"
    )

    .from(".four", 0.7, {
      scale: 0.2,
      opacity: 0
    })

    .from(".fake-btn", 0.3, {
      scale: 0.2,
      opacity: 0
    })

    .staggerTo(
      ".hbd-chatbox span",
      0.5,
      {
        visibility: "visible"
      },
      0.05
    )

    .to(".fake-btn", 0.1, {
      backgroundColor: "rgb(127, 206, 248)"
    })

    .to(
      ".four",
      0.5,
      {
        scale: 0.2,
        opacity: 0,
        y: -150
      },
      "+=0.7"
    )

    .from(".idea-1", 0.7, ideaTextTrans)

    .to(".idea-1", 0.7, ideaTextTransLeave, "+=1.5")

    .from(".idea-2", 0.7, ideaTextTrans)

    .to(".idea-2", 0.7, ideaTextTransLeave, "+=1.5")

    .from(".idea-3", 0.7, ideaTextTrans)

    .to(".idea-3 strong", 0.5, {
      scale: 1.2,
      x: 10,
      backgroundColor: "rgb(21, 161, 237)",
      color: "#fff"
    })

    .to(".idea-3", 0.7, ideaTextTransLeave, "+=1.5")

    .from(".idea-4", 0.7, ideaTextTrans)

    .to(".idea-4", 0.7, ideaTextTransLeave, "+=1.5")

    .from(
      ".idea-5",
      0.7,
      {
        rotationX: 15,
        rotationZ: -10,
        skewY: "-5deg",
        y: 50,
        z: 10,
        opacity: 0
      },
      "+=0.5"
    )

    .to(
      ".idea-5 .smiley",
      0.7,
      {
        rotation: 90,
        x: 8
      },
      "+=0.4"
    )

    .to(
      ".idea-5",
      0.7,
      {
        scale: 0.2,
        opacity: 0
      },
      "+=2"
    )

    .staggerFrom(
      ".idea-6 span",
      0.8,
      {
        scale: 3,
        opacity: 0,
        rotation: 15,
        ease: Expo.easeOut
      },
      0.2
    )

    .staggerTo(
      ".idea-6 span",
      0.8,
      {
        scale: 3,
        opacity: 0,
        rotation: -15,
        ease: Expo.easeOut
      },
      0.2,
      "+=1"
    )

    .call(() => {
      const cakeAnim = document.getElementById("bizcocho_1");
      if (cakeAnim) cakeAnim.beginElement();
    })

    .to(".cake-container", 0.5, {
      autoAlpha: 1
    })

    .staggerFromTo(
      ".baloons img",
      2.5,
      {
        opacity: 0.9,
        y: 1400
      },
      {
        opacity: 1,
        y: -1000
      },
      0.2
    )

    .to(".cake-container", 0.5, {
      autoAlpha: 0
    })

    .from(
      ".lydia-dp",
      0.5,
      {
        scale: 3.5,
        opacity: 0,
        x: 25,
        y: -25,
        rotationZ: -45
      }
    )

    .staggerFrom(
      ".wish-hbd span",
      0.7,
      {
        opacity: 0,
        y: -50,
        rotation: 150,
        skewX: "30deg",
        ease: Elastic.easeOut.config(1, 0.5)
      },
      0.1
    )

    .staggerFromTo(
      ".wish-hbd span",
      0.7,
      {
        scale: 1.4,
        rotationY: 150
      },
      {
        scale: 1,
        rotationY: 0,
        color: "#743e12",
        ease: Expo.easeOut
      },
      0.1,
      "party"
    )

    .from(
      ".wish h5",
      0.5,
      {
        opacity: 0,
        y: 10,
        skewX: "-15deg"
      },
      "party"
    )

    .staggerTo(
      ".eight svg",
      1.5,
      {
        visibility: "visible",
        opacity: 0,
        scale: 80,
        repeat: 3,
        repeatDelay: 1.4,
        onStart: playPopSoundInstantly,
        onRepeat: playPopSoundInstantly,
        onComplete: stopPopSound
      },
      0.3
    )

    .to(".six", 0.5, {
      opacity: 0,
      y: 30,
      zIndex: "-1"
    })

    .staggerFrom(".nine p", 1, ideaTextTrans, 1.2)

    .to(
      ".last-smile",
      0.5,
      {
        rotation: 90
      },
      "+=1"
    )

    .to(
      ".nine",
      0.8,
      {
        opacity: 0,
        y: -20
      },
      "+=1.5"
    )

    .to("#cardWrapper", 1, {
      autoAlpha: 1
    });


  // Safe restart button binding
  const replyBtn = document.getElementById("replay");

  if (replyBtn) {
    replyBtn.addEventListener("click", () => {

      // Restart birthday song
      if (bdaySong) {
        bdaySong.currentTime = 0;

        bdaySong.play().catch(e => {
          console.log("Audio play blocked by browser:", e);
        });
      }

      tl.restart();
    });
  }
};


// Run fetch and animation sequence
fetchData();
```
