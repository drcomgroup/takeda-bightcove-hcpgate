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
    gatekeeper.style.fontSize = "16px";
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
    var unnotice_style = "dotted 1px transparent";
    var notice_style = "dotted 1px red";
    var html =
      "<div>" +
      "<div style='margin-bottom:5px'><input type='checkbox' id='cb_patient' /> <label id='cb_patient_lbl' for='cb_patient' style='border-bottom: " +
      unnotice_style +
      "'>I am a Cuvitru patient</label></div>" +
      "<div style='margin-bottom:5px'><input type='checkbox' id='cb_video' /> <label id='cb_video_lbl' for='cb_video' style='border-bottom: " +
      unnotice_style +
      "'>I am authorised to watch the Cuvitru Administration video</label></div>" +
      button.outerHTML +
      "</div>";
    confirm.innerHTML = html;

    document.getElementById("confirm-hcp").addEventListener(
      "click",
      function () {
        var cb_patient = document.getElementById("cb_patient");
        var cb_video = document.getElementById("cb_video");
        var lbl_patient = document.getElementById("cb_patient_lbl");
        var lbl_video = document.getElementById("cb_video_lbl");
        lbl_patient.style.borderBottom = unnotice_style;
        lbl_video.style.borderBottom = unnotice_style;
        if (cb_patient.checked && cb_video.checked) {
          gatekeeper.style.display = "none";
          // Start video playback
          myPlayer.play();
        } else {
          console.log('got to here');
          if (!cb_patient.checked) lbl_patient.style.borderBottom = notice_style;
          if (!cb_video.checked) lbl_video.style.borderBottom = notice_style;
        }
      },
      false
    );
  });
});
