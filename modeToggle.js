var modeToggle = document.getElementById("modeToggle");
var logo = document.getElementById("logo");
var card = document.getElementById("card");
var search = document.getElementById("search");

modeToggle.onclick = function () {
  document.body.classList.toggle("dark-theme");
  if (document.body.classList.contains("dark-theme")) {
    modeToggle.innerHTML = "brightness_5";
    logo.src = "./assets/yt_logo_rgb_dark.png";
    card.classList.add("bg-dark");
    search.classList.add("bg-dark");
    search.classList.add("text-white");
  } else {
    modeToggle.innerHTML = "dark_mode";
    logo.src = "./assets/yt_logo_rgb_light.png";
    card.classList.remove("bg-dark");
    search.classList.remove("bg-dark");
    search.classList.remove("text-white");
  }
};
