window.onload = function() {

    /* --- Enable Audio --- */
    let currentButton = undefined;
    let currentAudio = undefined;

    /* Since controls depend on JS, they're only displayed if the user's
     * browser supports the language.
     */
    document.querySelectorAll(".controls").forEach(function(controls) {
        controls.style.display = "flex";
        controls.style.alignItems = "center";
        controls.style.justifyContent = "center";
    });

    document.querySelectorAll(".track").forEach(element => {
        element.addEventListener("click", function(event) {
            if (event.target.tagName == "BUTTON") {
                if (!currentAudio) {
                    /* The user selected a track for the first time since the
                     * page loaded.
                     */
                    currentButton = event.target;
                    currentButton.className = "pause";
                    currentAudio = this.querySelector("audio");
                    currentAudio.play();
                } else {
                    if (event.target == currentButton) {
                        /* The user clicked the button that corresponds to the
                         * same track.
                         */
                        if (currentAudio.paused) {
                            currentAudio.play();
                            currentButton.className = "pause";
                        } else {
                            currentAudio.pause();
                            currentButton.className = "play";
                        }
                    } else {
                        /* The user clicked a button that corresponds to a new
                         * track.
                         */

                        // Reset button.
                        currentButton.className = "play";

                        // Reset audio track.
                        currentAudio.pause();
                        currentAudio.load();

                        // Update current button to the one that controls the
                        // new track.
                        currentButton = this.querySelector("button");
                        currentButton.className = "pause";

                        // Update current audio to the new track and play.
                        currentAudio = this.querySelector("audio");
                        currentAudio.play();
                    }
                }
            }
        });
    });

    // Reset an audio track to the beginning and switch its pause button to a
    // play button at the end of it.
    document.querySelectorAll("audio").forEach(function(audio) {
        audio.addEventListener("ended", function() {
            currentAudio.load();
            currentButton.className = "play";
        });
    });


    /* --- Create Banner --- */
    let banner = document.querySelector("#banner");
    let bannerText = document.querySelector("#banner a");

    updateColor(bannerText);
    moveBannerText(banner, bannerText);

};

async function updateColor(bannerText) {
    const colors = [
        "#f6d758", "#fc8908", "#ec3e40", "#f7597a", "#db9c97", "#3084b0", "#5fae6c"
    ];
    while (true) {
        for (color of colors) {
            bannerText.style.color = color;
            await sleep(0.5);
        }
    }
}

async function moveBannerText(banner, bannerText) {
    const bannerWidth = 800;

    // Disable banner for smaller screens.
    // if (window.innerWidth < 800) return;

    banner.style.display = "block";

    let pos = window.innerWidth;
    bannerText.style.left = pos + "px";

    while (true) {
        bannerText.style.left = pos + "px";
        if (--pos <= -bannerWidth) pos = window.innerWidth;
        await sleep(0.001);
    }
}

function sleep(seconds) {
    return new Promise(resolve => setTimeout(resolve, seconds * 1000));
}
