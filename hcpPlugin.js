videojs.registerPlugin("hcpPlugin", function () {
  this.on("ready", function () {
    var myPlayer = this;
    // Add the class which hides the player controls and the big play button
    var gatekeeper = document.createElement("div");
    gatekeeper.class = "vjs-overlay";
    gatekeeper.style.width = "100%";
    gatekeeper.style.height = "100%";
    gatekeeper.style.color = "#333333";
    gatekeeper.style.background = "#ffffff";
    gatekeeper.style.left = 0;
    gatekeeper.style.top = 0;
    gatekeeper.style.opacity = "0.9";
    gatekeeper.style.fontSize = "26px";
    gatekeeper.style.position = "absolute";
    gatekeeper.style.zIndex = "99999";
    var confirm = document.createElement("div");
    confirm.style.display = "flex";
    confirm.style.alignItems = "center";
    confirm.style.justifyContent = "center";
    confirm.style.height = "100%";
    confirm.style.textAlign = "center";
    gatekeeper.prepend(confirm);
    myPlayer.el_.prepend(gatekeeper);

    var button = document.createElement("button");
    button.id = "confirm-hcp";
    button.innerHTML = "Confirm";
    button.style.borderRadius = "2px";
    button.style.color = "#ffffff";
    button.style.backgroundColor = "#007c89";
    button.style.transition =
      "background-color 0.2s ease-in-out 0s, opacity 0.2s ease-in-out 0s";
    button.style.display = "block";
    button.style.padding = "4px 7px";
    button.style.margin = "5px auto";
    button.style.cursor = "pointer";
    confirm.innerHTML =
      "<div>" +
      +"<input type='checkbox' id='cb_patient' /> <label for='cb_patient'>I am a Cuvitru patient</label>" +
      +"<input type='checkbox' id='cb_video' /> <label for='cb_patient'>I am authorised to watch the Cuvitru Administration video</label>" +
      button.outerHTML +
      "</div>";

    // +++ Set up listening for when the user clicks the age verification text +++
    // Listen for when the player has initial duration and dimension information
    document.getElementById("confirm-hcp").addEventListener(
      "click",
      function () {
        var cb_patient = document.getElementById("cb_patient");
        var cb_video = document.getElementById("cb_video");
        if (cb_patient.checked && cb_video.checked) {
          gatekeeper.style.display = "none";
          // Start video playback
          myPlayer.play();
        }
      },
      false
    );
  });
});
