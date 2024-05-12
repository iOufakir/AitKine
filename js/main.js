/* ===================================================================
 * Main JS
 *
 * ------------------------------------------------------------------- */

(function ($) {
  "use strict";

  var cfg = {
    scrollDuration: 800, // smoothscroll duration
    mailChimpURL:
      "https://us12.list-manage.com/contact-form/post?u=2b414299b08ad29f9fc976054&form_id=65c5dfa0979d41360789e69d0047b599",
  },
    $WIN = $(window);

  // Add the User Agent to the <html>
  // will be used for IE10 detection (Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0))
  var doc = document.documentElement;
  doc.setAttribute("data-useragent", navigator.userAgent);

  /* Preloader
   * -------------------------------------------------- */
  var ssPreloader = function () {
    $WIN.on("load", function () {
      // force page scroll position to top at page refresh

      if (isCurrentWebsiteHashValid()) {
        $("html, body").animate(
          {
            scrollTop: $(window.location.hash).offset().top + 5,
          },
          "normal"
        );
      } else {
        $("html, body").animate({ scrollTop: 0 }, "normal");
      }

      // will fade out the whole preloader DIV that covers the website.
      $("#preloader").delay(500).fadeOut("slow");
    });
  };

  /* Mobile Menu
   * ---------------------------------------------------- */
  var ssMobileMenu = function () {
    var toggleButton = $(".header-menu-toggle"),
      nav = $("#header-nav-wrap");

    toggleButton.on("click", function (event) {
      event.preventDefault();

      toggleButton.toggleClass("is-clicked");
      nav.slideToggle();
    });

    if (toggleButton.is(":visible")) nav.addClass("mobile");

    $(window).resize(function () {
      if (toggleButton.is(":visible")) nav.addClass("mobile");
      else nav.removeClass("mobile");
    });

    $("#header-nav-wrap")
      .find("a")
      .on("click", function () {
        if (nav.hasClass("mobile")) {
          toggleButton.toggleClass("is-clicked");
          nav.slideToggle();
        }
      });
  };

  /* FitVids
   * ---------------------------------------------------- */
  var ssFitVids = function () {
    $(".fluid-video-wrapper").fitVids();
  };

  /* Owl Carousel
   * ------------------------------------------------------ */
  var ssOwlCarousel = function () {
    $(".owl-carousel").owlCarousel({
      loop: true,
      nav: false,
      autoHeight: true,
      items: 1,
      animateOut: "fadeOut",
    });
  };

  /* Smooth Scrolling
   * ------------------------------------------------------ */
  var ssSmoothScroll = function () {
    $(document).scroll(function () {
      $("section").each(function () {
        if (
          $(this).position().top <= $(document).scrollTop() &&
          $(this).position().top + $(this).outerHeight() >
          $(document).scrollTop() + 5
        ) {
          const sectionId = $(this).attr("id");
          document.querySelector(".current").classList.remove("current");
          const active_link = $(
            '.header-main-nav li a[href="#' + sectionId + '"]'
          );
          active_link.parent().addClass("current");
        }
      });
    });

    $(".smoothscroll").on("click", function (e) {
      e.preventDefault();
      e.stopPropagation();

      var target = this;
      $("html, body").animate(
        {
          scrollTop: $(target.hash).offset().top,
        },
        cfg.scrollDuration,
        "swing",
        function () {
          window.location.hash = target.hash;
          document.querySelector(".current").classList.remove("current");
          target.parentElement.classList.add("current");
        }
      );
      window.location.hash = target.hash;
    });
  };

  /* Placeholder Plugin Settings
   * ------------------------------------------------------ */
  var ssPlaceholder = function () {
    $("input, textarea, select").placeholder();
  };

  /* Contact US
   * ------------------------------------------------------ */
  const contactUs = () => {
    const form = document.querySelector("#contact-form");
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const data = {
        name: document.querySelector("#f-name").value,
        email: document.querySelector("#f-email").value,
        message: document.querySelector("#f-message").value,
      };

      window.open(
        `mailto:01ilyas.dev@gmail.com?from=${data.email}&subject=${data.name} | ${data.email}&body=${data.message}`
      );
    });
  };

  /* Alert Boxes
    ------------------------------------------------------- */
  var ssAlertBoxes = function () {
    $(".alert-box").on("click", ".close", function () {
      $(this).parent().fadeOut(500);
    });
  };

  /* Animate On Scroll
   * ------------------------------------------------------ */
  var ssAOS = function () {
    AOS.init({
      offset: 100,
      duration: 400,
      easing: "ease-in-sine",
      delay: 200,
      once: true,
      disable: "mobile",
    });
  };

  /* Back to Top
   * ------------------------------------------------------ */
  var ssBackToTop = function () {
    var pxShow = 500, // height on which the button will show
      fadeInTime = 400, // how slow/fast you want the button to show
      fadeOutTime = 400, // how slow/fast you want the button to hide
      scrollSpeed = 300, // how slow/fast you want the button to scroll to top. can be a value, 'slow', 'normal' or 'fast'
      goTopButton = $("#go-top");

    // Show or hide the sticky footer button
    $(window).on("scroll", function () {
      if ($(window).scrollTop() >= pxShow) {
        goTopButton.fadeIn(fadeInTime);
      } else {
        goTopButton.fadeOut(fadeOutTime);
      }
    });
  };

  const isCurrentWebsiteHashValid = () =>
    window.location.hash &&
    ["#home", "#about", "#gallery", "#weather", "#contact"].includes(
      window.location.hash
    );

  /* Initialize
   * ------------------------------------------------------ */
  (function ssInit() {
    ssPreloader();
    ssMobileMenu();
    ssFitVids();
    ssOwlCarousel();
    ssSmoothScroll();
    ssPlaceholder();
    ssAlertBoxes();
    ssAOS();
    ssBackToTop();

    // Gallery
    touchTouch(document.body.querySelectorAll(".item-image"));

    // Weather
    const TIMEZONE = "Africa/Casablanca";
    const weatherIcon = document.querySelector(".active .card__weather__icon");
    const weatherCityDate = document.querySelector(".active .card__info__date");
    const weatherCityTime = document.querySelector(".active .card__info__time");
    let currentDateTime = new Date();
    const currentDate = currentDateTime.toLocaleDateString("en-US", {
      timeZone: TIMEZONE,
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    weatherCityDate.innerHTML = currentDate;
    setInterval(() => {
      currentDateTime = new Date();
      weatherCityTime.innerHTML = currentDateTime.toLocaleTimeString("en-US", {
        timeZone: TIMEZONE,
      });
    }, 1000);

    fetch(
      "https://api.openweathermap.org/data/2.5/weather?lat=30.0202484&lon=-8.2021836&appid=8daf4c5b477f969fe88a82412b598b68&units=metric",
      { cache: "no-store" }
    )
      .then((response) => response.json())
      .then((data) => {
        const weatherTemp = document.querySelector(
          ".active .card__weather__temp"
        );
        weatherTemp.innerHTML = `${Number(data.main.temp).toFixed(0)}° C`;

        const weatherDescription = document.querySelector(
          ".active .card__weather__description"
        );
        weatherDescription.innerHTML = data.weather[0].main;

        weatherIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    contactUs();

    const actionWatchVideo = document.querySelector('#action-watch-video');
    actionWatchVideo.addEventListener('click', () => {
      document.querySelector('#aitkine-video').click();
    });
  })();
})(jQuery);
