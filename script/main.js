```javascript
// ============================================================
// BIRTHDAY WEBSITE - COMPLETE JAVASCRIPT
// ============================================================


// ============================================================
// GLOBAL VARIABLES
// ============================================================

let bdaySong = null;
let activePopSound = null;
let animationStarted = false;
let songStarted = false;


// ============================================================
// BIRTHDAY SONG
// ============================================================

const setupBirthdaySong = () => {

  // Create the audio only once
  if (!bdaySong) {
    bdaySong = new Audio("./sound/bday-song.mp3");

    bdaySong.volume = 0.4;
    bdaySong.loop = true;
    bdaySong.preload = "auto";

    // Debugging
    bdaySong.addEventListener("canplaythrough", () => {
      console.log("🎵 Birthday song loaded successfully.");
    });

    bdaySong.addEventListener("error", () => {
      console.error("❌ Could not load birthday song.");
      console.error("Trying to load:", bdaySong.src);
    });
  }

  return bdaySong;
};


// ============================================================
// PLAY BIRTHDAY SONG
// ============================================================

const playSong = () => {

  const song = setupBirthdaySong();

  if (songStarted) {
    return;
  }

  song.currentTime = 0;
  song.volume = 0.4;

  const playPromise = song.play();

  if (playPromise !== undefined) {

    playPromise
      .then(() => {

        songStarted = true;

        console.log("🎵 Birthday song is now playing!");

      })
      .catch(error => {

        console.error("❌ Birthday song could not play:", error);

      });
  }
};


// ============================================================
// POP / FIREWORK SOUND
// ============================================================


// Plays the main pop sound instantly
const playPopSoundInstantly = () => {

  activePopSound = new Audio("./sound/fireworks.mp3");

  activePopSound.volume = 0.1;

  activePopSound
    .play()
    .catch(error => {
      console.log(
        "Firework sound blocked:",
        error
      );
    });
};


// Extra delayed pop
const playDelayedPopSound = () => {

  setTimeout(() => {

    const delayedPop =
      new Audio("./sound/fireworks.mp3");

    delayedPop.volume = 0.1;

    delayedPop
      .play()
      .catch(error => {
        console.log(
          "Delayed firework sound blocked:",
          error
        );
      });

  }, 500);
};


// Fade out firework sound
const stopPopSound = () => {

  if (!activePopSound) {
    return;
  }

  let fadeAudio = setInterval(() => {

    if (activePopSound.volume > 0.05) {

      activePopSound.volume -= 0.05;

    } else {

      clearInterval(fadeAudio);

      activePopSound.pause();

      activePopSound.currentTime = 0;

    }

  }, 30);
};


// ============================================================
// MAIN ANIMATION
// ============================================================

const animationTimeline = () => {

  // Prevent animation from being created twice
  if (animationStarted) {
    return;
  }

  animationStarted = true;


  // ==========================================================
  // GET TEXT ELEMENTS
  // ==========================================================

  const textBoxChars =
    document.getElementsByClassName(
      "hbd-chatbox"
    )[0];

  const hbd =
    document.getElementsByClassName(
      "wish-hbd"
    )[0];


  // ==========================================================
  // SPLIT CHATBOX TEXT INTO CHARACTERS
  // ==========================================================

  if (textBoxChars) {

    textBoxChars.innerHTML =
      `<span>${textBoxChars.innerHTML
        .split("")
        .join("</span><span>")}</span>`;

  }


  // ==========================================================
  // SPLIT BIRTHDAY TEXT INTO CHARACTERS
  // ==========================================================

  if (hbd) {

    hbd.innerHTML =
      `<span>${hbd.innerHTML
        .split("")
        .join("</span><span>")}</span>`;

  }


  // ==========================================================
  // TEXT TRANSITIONS
  // ==========================================================

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


  // ==========================================================
  // GSAP TIMELINE
  // ==========================================================

  const tl = new TimelineMax();


  tl

    // --------------------------------------------------------
    // SHOW CONTAINER
    // --------------------------------------------------------

    .to(".container", 0.1, {

      visibility: "visible"

    })


    // --------------------------------------------------------
    // FIRST TEXT
    // --------------------------------------------------------

    .from(".one", 0.7, {

      opacity: 0,

      y: 10

    })


    // --------------------------------------------------------
    // SECOND TEXT
    // --------------------------------------------------------

    .from(".two", 0.4, {

      opacity: 0,

      y: 10

    })


    // --------------------------------------------------------
    // HIDE FIRST TEXT
    // --------------------------------------------------------

    .to(
      ".one",
      0.7,
      {

        opacity: 0,

        y: 10

      },

      "+=2.5"
    )


    // --------------------------------------------------------
    // HIDE SECOND TEXT
    // --------------------------------------------------------

    .to(
      ".two",
      0.7,
      {

        opacity: 0,

        y: 10

      },

      "-=1"
    )


    // --------------------------------------------------------
    // THIRD TEXT
    // --------------------------------------------------------

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


    // --------------------------------------------------------
    // FOURTH SECTION
    // --------------------------------------------------------

    .from(".four", 0.7, {

      scale: 0.2,

      opacity: 0

    })


    .from(".fake-btn", 0.3, {

      scale: 0.2,

      opacity: 0

    })


    // --------------------------------------------------------
    // CHATBOX CHARACTERS
    // --------------------------------------------------------

    .staggerTo(
      ".hbd-chatbox span",
      0.5,
      {

        visibility: "visible"

      },

      0.05
    )


    // --------------------------------------------------------
    // BUTTON COLOR
    // --------------------------------------------------------

    .to(".fake-btn", 0.1, {

      backgroundColor:
        "rgb(127, 206, 248)"

    })


    // --------------------------------------------------------
    // HIDE FOURTH SECTION
    // --------------------------------------------------------

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


    // --------------------------------------------------------
    // IDEA 1
    // --------------------------------------------------------

    .from(
      ".idea-1",
      0.7,
      ideaTextTrans
    )


    .to(
      ".idea-1",
      0.7,
      ideaTextTransLeave,
      "+=1.5"
    )


    // --------------------------------------------------------
    // IDEA 2
    // --------------------------------------------------------

    .from(
      ".idea-2",
      0.7,
      ideaTextTrans
    )


    .to(
      ".idea-2",
      0.7,
      ideaTextTransLeave,
      "+=1.5"
    )


    // --------------------------------------------------------
    // IDEA 3
    // --------------------------------------------------------

    .from(
      ".idea-3",
      0.7,
      ideaTextTrans
    )


    .to(
      ".idea-3 strong",
      0.5,
      {

        scale: 1.2,

        x: 10,

        backgroundColor:
          "rgb(21, 161, 237)",

        color: "#fff"

      }
    )


    .to(
      ".idea-3",
      0.7,
      ideaTextTransLeave,
      "+=1.5"
    )


    // --------------------------------------------------------
    // IDEA 4
    // --------------------------------------------------------

    .from(
      ".idea-4",
      0.7,
      ideaTextTrans
    )


    .to(
      ".idea-4",
      0.7,
      ideaTextTransLeave,
      "+=1.5"
    )


    // --------------------------------------------------------
    // IDEA 5
    // --------------------------------------------------------

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


    // --------------------------------------------------------
    // IDEA 6
    // --------------------------------------------------------

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


    // --------------------------------------------------------
    // CAKE ANIMATION
    // --------------------------------------------------------

    .call(() => {

      const cakeAnim =
        document.getElementById(
          "bizcocho_1"
        );

      if (cakeAnim) {

        cakeAnim.beginElement();

      }

    })


    .to(
      ".cake-container",
      0.5,
      {

        autoAlpha: 1

      }
    )


    // --------------------------------------------------------
    // BALLOONS
    // --------------------------------------------------------

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


    // --------------------------------------------------------
    // HIDE CAKE
    // --------------------------------------------------------

    .to(
      ".cake-container",
      0.5,
      {

        autoAlpha: 0

      }
    )


    // --------------------------------------------------------
    // PHOTO
    // --------------------------------------------------------

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


    // --------------------------------------------------------
    // BIRTHDAY WISH
    // --------------------------------------------------------

    .staggerFrom(
      ".wish-hbd span",
      0.7,
      {

        opacity: 0,

        y: -50,

        rotation: 150,

        skewX: "30deg",

        ease:
          Elastic.easeOut.config(
            1,
            0.5
          )

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


    // --------------------------------------------------------
    // WISH SUBTITLE
    // --------------------------------------------------------

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


    // --------------------------------------------------------
    // FIREWORKS
    // --------------------------------------------------------

    .staggerTo(
      ".eight svg",
      1.5,
      {

        visibility: "visible",

        opacity: 0,

        scale: 80,

        repeat: 3,

        repeatDelay: 1.4,

        onStart:
          playPopSoundInstantly,

        onRepeat:
          playPopSoundInstantly,

        onComplete:
          stopPopSound

      },

      0.3
    )


    // --------------------------------------------------------
    // HIDE SIX
    // --------------------------------------------------------

    .to(
      ".six",
      0.5,
      {

        opacity: 0,

        y: 30,

        zIndex: "-1"

      }
    )


    // --------------------------------------------------------
    // FINAL TEXT
    // --------------------------------------------------------

    .staggerFrom(
      ".nine p",
      1,
      ideaTextTrans,
      1.2
    )


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


    // --------------------------------------------------------
    // SHOW CARD
    // --------------------------------------------------------

    .to(
      "#cardWrapper",
      1,
      {

        autoAlpha: 1

      }
    );


  // ==========================================================
  // REPLAY BUTTON
  // ==========================================================

  const replyBtn =
    document.getElementById("replay");


  if (replyBtn) {

    replyBtn.addEventListener(
      "click",
      () => {

        // Restart music
        if (bdaySong) {

          bdaySong.currentTime = 0;

          bdaySong.play()
            .catch(error => {

              console.log(
                "Could not restart song:",
                error
              );

            });

        }


        // Restart animation
        tl.restart();

      }
    );

  }

};


// ============================================================
// LOAD CUSTOMIZE.JSON
// ============================================================

const fetchData = () => {

  fetch("./customize.json")

    .then(response => {

      if (!response.ok) {

        throw new Error(
          `Could not load customize.json: ${response.status}`
        );

      }

      return response.json();

    })


    .then(data => {

      const dataArr =
        Object.keys(data);


      dataArr.forEach(customData => {

        // Ignore empty values
        if (data[customData] === "") {
          return;
        }


        const element =
          document.querySelector(
            `[data-node-name*="${customData}"]`
          );


        // Prevent errors if an element
        // doesn't exist in the HTML

        if (!element) {

          console.warn(
            `No element found for data-node-name="${customData}"`
          );

          return;

        }


        // Image
        if (
          customData === "imagePath"
        ) {

          element.setAttribute(
            "src",
            data[customData]
          );

        }

        // Text
        else {

          element.innerText =
            data[customData];

        }

      });


      console.log(
        "✅ customize.json loaded."
      );

    })


    .catch(error => {

      console.error(
        "⚠️ customize.json error:",
        error
      );

    });

};


// ============================================================
// START EVERYTHING AFTER USER INTERACTION
// ============================================================

const startBirthday = () => {

  // Don't start twice
  if (animationStarted) {
    return;
  }


  console.log(
    "👆 User interaction detected."
  );


  // IMPORTANT:
  // Music starts FIRST because this function
  // is being called directly from the click/tap.
  playSong();


  // Then start animation
  animationTimeline();


  // Remove listeners
  document.removeEventListener(
    "click",
    startBirthday
  );

  document.removeEventListener(
    "touchstart",
    startBirthday
  );

};


// ============================================================
// FIRST CLICK / TAP
// ============================================================

document.addEventListener(
  "click",
  startBirthday
);

document.addEventListener(
  "touchstart",
  startBirthday
);


// ============================================================
// LOAD DATA
// ============================================================

fetchData();


// ============================================================
// PRELOAD THE SONG
// ============================================================

setupBirthdaySong();
```
