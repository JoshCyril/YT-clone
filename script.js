var modeToggle = document.getElementById("modeToggle");
var logo = document.getElementById("logo");

modeToggle.onclick = function () {
  document.body.classList.toggle("dark-theme");
  if (document.body.classList.contains("dark-theme")) {
    modeToggle.innerHTML = "brightness_5";
    logo.src = "./assets/yt_logo_rgb_dark.png";
  } else {
    modeToggle.innerHTML = "dark_mode";
    logo.src = "./assets/yt_logo_rgb_light.png";
  }
};
