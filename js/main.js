(function () {
  /* Mobile menu: scroll lock + chrome stay fixed mid-scroll */
  var burger = document.querySelector(".burger");
  var panel = document.getElementById("mobile-nav");
  if (burger && panel) {
    var scrollY = 0;
    var labelOpen = "Открыть меню";
    var labelClose = "Закрыть меню";

    function openMenu() {
      scrollY = window.scrollY || window.pageYOffset;
      burger.setAttribute("aria-expanded", "true");
      burger.setAttribute("aria-label", labelClose);
      panel.classList.add("is-open");
      document.body.classList.add("menu-open");
      document.body.style.top = "-" + scrollY + "px";
      document.documentElement.style.overflow = "hidden";
    }

    function closeMenu() {
      if (burger.getAttribute("aria-expanded") !== "true") return;
      burger.setAttribute("aria-expanded", "false");
      burger.setAttribute("aria-label", labelOpen);
      panel.classList.remove("is-open");
      document.body.classList.remove("menu-open");
      document.body.style.top = "";
      document.documentElement.style.overflow = "";
      window.scrollTo(0, scrollY);
      burger.focus();
    }

    function toggleMenu() {
      if (burger.getAttribute("aria-expanded") === "true") closeMenu();
      else openMenu();
    }

    burger.addEventListener("click", toggleMenu);

    panel.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        closeMenu();
      });
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeMenu();
    });
  }

  /* Hero crossfade: 2–3 interior slides */
  var slides = document.querySelectorAll(".hero-slide");
  var dots = document.querySelectorAll(".hero-dot");
  if (slides.length > 1) {
    var idx = 0;
    var timer = null;
    var INTERVAL = 5200;

    function show(n) {
      slides[idx].classList.remove("is-active");
      if (dots[idx]) dots[idx].classList.remove("is-active");
      idx = n;
      slides[idx].classList.add("is-active");
      if (dots[idx]) dots[idx].classList.add("is-active");
    }

    function next() {
      show((idx + 1) % slides.length);
    }

    function start() {
      stop();
      timer = window.setInterval(next, INTERVAL);
    }

    function stop() {
      if (timer) window.clearInterval(timer);
      timer = null;
    }

    dots.forEach(function (dot, i) {
      dot.addEventListener("click", function () {
        show(i);
        start();
      });
    });

    var hero = document.querySelector(".hero-photo");
    if (hero) {
      hero.addEventListener("mouseenter", stop);
      hero.addEventListener("mouseleave", start);
    }

    start();
  }
})();
