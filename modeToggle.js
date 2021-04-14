var modeToggle = document.getElementById("modeToggle");
var logo = document.getElementById("logo");
var card = document.getElementById("card");
var search = document.getElementById("channel-input");
var menu = document.getElementById("menu");
var leftbar = document.getElementById("leftbar");
var rigthbar = document.getElementById("rigthbar");

var subLine = document.getElementById("subLine");

var navH = document.getElementById("navH");
var navHico = document.getElementById("navHico");
var navT = document.getElementById("navT");
var navTico = document.getElementById("navTico");
var navS = document.getElementById("navS");
var navSico = document.getElementById("navSico");
var navLico = document.getElementById("navLico");

var menuItems = document.getElementsByClassName("menuItems");
var categoryList = document.getElementsByClassName("categoryList");
var ai = document.getElementsByClassName("ai");

modeToggle.onclick = function () {
  document.body.classList.toggle("dark-theme");
  if (document.body.classList.contains("dark-theme")) {
    modeToggle.innerHTML = "brightness_5";
    logo.src = "./assets/yt_logo_rgb_dark.png";
    search.classList.add("bg-dark");
    search.classList.add("text-white");
  } else {
    modeToggle.innerHTML = "dark_mode";
    logo.src = "./assets/yt_logo_rgb_light.png";
    search.classList.remove("bg-dark");
    search.classList.remove("text-white");
  }
};
let menuButton = 0;

menu.onclick = function () {
  menuButton += 1;

  if ((menuOn = menuButton % 2 == 0 ? false : true)) {
    leftbar.classList.remove("col-lg-2");
    leftbar.classList.add("col-lg-1");

    rigthbar.classList.remove("col-10");
    rigthbar.classList.add("col-11");

    [...menuItems].forEach((i) => {
      i.classList.remove("col-8");
      i.classList.remove("pl-4");
      i.classList.add("col-12");
      i.classList.add("text-center");
    });
    [...categoryList].forEach((j) => {
      j.classList.add("justify-content-center");
      j.classList.remove("pl-4");
    });
  } else {
    leftbar.classList.add("col-lg-2");
    leftbar.classList.remove("col-lg-1");

    rigthbar.classList.remove("col-11");
    rigthbar.classList.add("col-10");

    [...menuItems].forEach((i) => {
      i.classList.remove("text-center");
      i.classList.add("col-8");
      i.classList.add("pl-4");
      i.classList.remove("col-12");
    });
    [...categoryList].forEach((j) => {
      j.classList.remove("justify-content-center");
      j.classList.add("pl-4");
    });
  }
};

navH.onclick = function () {
  [...categoryList].forEach((k) => {
    if (k.classList.contains("active")) {
      k.classList.remove("active");
    } else {
      navH.classList.add("active");
      subLine.innerHTML = "Home";
    }
  });
  [...ai].forEach((l) => {
    if (l.classList.contains("activeIcon")) {
      l.classList.remove("activeIcon");
    } else {
      navHico.classList.add("activeIcon");
    }
  });
};

navT.onclick = function () {
  [...categoryList].forEach((m) => {
    if (m.classList.contains("active")) {
      m.classList.remove("active");
    } else {
      navT.classList.add("active");
      subLine.innerHTML = "Trending";
    }
  });
  [...ai].forEach((n) => {
    if (n.classList.contains("activeIcon")) {
      n.classList.remove("activeIcon");
    } else {
      navTico.classList.add("activeIcon");
    }
  });
};

navS.onclick = function () {
  [...categoryList].forEach((o) => {
    if (o.classList.contains("active")) {
      o.classList.remove("active");
    } else {
      navS.classList.add("active");
      subLine.innerHTML = "Subscriptions";
    }
  });
  [...ai].forEach((p) => {
    if (p.classList.contains("activeIcon")) {
      p.classList.remove("activeIcon");
    } else {
      navSico.classList.add("activeIcon");
    }
  });
};

navL.onclick = function () {
  [...categoryList].forEach((q) => {
    if (q.classList.contains("active")) {
      q.classList.remove("active");
    } else {
      navL.classList.add("active");
      subLine.innerHTML = "Library";
    }
  });
  [...ai].forEach((r) => {
    if (r.classList.contains("activeIcon")) {
      r.classList.remove("activeIcon");
    } else {
      navLico.classList.add("activeIcon");
    }
  });
};

logo.onclick = function () {
  location.reload();
};
