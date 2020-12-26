// import $ from "jquery";
// import {gsap} from "gsap";
// import {ScrollTrigger} from "gsap/ScrollTrigger";
// import {ScrollToPlugin} from "gsap/ScrollToPlugin";
// import "./slider";
// import Scrollbar from "smooth-scrollbar";
// import 'lazysizes';
// import 'lazysizes/plugins/parent-fit/ls.parent-fit';
@@include("jquery.min.js")
@@include("slick.min.js")
@@include("slider.js")
@@include("gsap.min.js")
@@include("ScrollToPlugin.min.js")
@@include("ScrollTrigger.min.js")
@@include("lazysizes.min.js")

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
// Scrollbar.initAll();

window.onload = function () {
  document.querySelector(".button-up").addEventListener("click", function (e) {
    e.preventDefault();
    gsap.to(window, {duration: 1.5, scrollTo: e.target.getAttribute("href")})
  })

  $(window).scroll(function () {
    toggleBtnUp();
  })
  toggleBtnUp();


  $(".menu-item").on("click", function () {
    if (!$(this).hasClass("active")) {
      $(this).parent().children(".menu-item").removeClass("active");
      $(this).addClass("active");
    }
  });

  $(".drop-menu__item").on("click", function () {
    $(this).parent().parent().children(".header__actions-value").text($(this).text());
  });

  let menu = $(".drop-menu");
  menu.on("mouseover", function () {
    $(this).children("ul").addClass("active");
  });

  menu.on("mouseout", function () {
    $(this).children("ul").removeClass("active");
  })

  $(".drop-menu > ul > li").on("click", function () {
    let li = $(this).parent().parent();
    let picture = $(li).children("picture").children("source");
    let img = $(li).children("picture").children("img");
    let span = $(li).children("span");
    if (
      typeof picture.attr("srcset") !== typeof undefined &&
      typeof picture.attr("srcset") !== false
    ) {
      $(picture).attr("srcset", $(this).children("picture").children("source").attr("srcset"));
      $(img).attr("src", $(this).children("picture").children("img").attr("src"));
    }
    span.text($(this).text());
  })

  // <------ Email check START ------>
  let pattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,4})+$/;
  let mail = $(".newsletter__email");
  let mail_btn = $(".newsletter__submit");
  let label = $("#label");

  mail.on("input", function (e) {
    if (mail.val() !== " ") {
      if (mail.val().search(pattern) === 0) {
        mail.removeClass("error");
        label.removeClass("error");
        label.addClass("valid");
        mail_btn.attr("disabled", false);
      } else {
        label.removeClass("valid");
        mail.addClass("error");
        label.addClass("error");
        mail_btn.attr("disabled", true);
      }
    }
  });
// <------ Email check END ------>

  $(".collection__video-btn").on("click", function () {
    let video = $(".collection__video");
    document.getElementById("video").play();
    if (video.hasClass("active")) {
      video.removeClass("active");
      document.getElementById("video").pause();
    } else {
      video.addClass("active");
    }
  })

  $("#video").on("ended", function () {
    $(".collection__video").removeClass("active");
  })

  let colors = $(".goods__colors-item");
  colors.on("click", function () {
    let img = $(this).parents(".goods__item-wrap").children("a").children("picture");
    if (!$(this).hasClass("active")) {
      $(this).parents(".goods__item").find(colors).removeClass("active");
      $(this).toggleClass("active");
      img.children("img").attr("src", $(this).attr("data-img"));
      img.children("source").attr("srcset", $(this).attr("data-img"));
    }
  })

  // <------ Custom select START ------>
  let select = $(".select");
  select.on("click", function () {
    let selectBody = $(this).find(".select__body");
    if (!selectBody.hasClass("active")) {
      select.find(".select__body").removeClass("active");
      selectBody.addClass("active");
    } else {
      selectBody.removeClass("active");
    }
  })

  $(".select__item").on("click", function () {
    let text = $(this).children("span").text();
    let picture = $(this).children("picture");
    let parent = $(this).parents(".select").children(".select__header");
    let main = $(this).parents(".goods__item-wrap").children("a");
    let mainPicture = main.children("picture");
    let parentPicture = parent.children("picture");

    parentPicture.children("img").attr("src", picture.children("img").attr("src"));
    parentPicture.children("source").attr("srcset", picture.children("source").attr("srcset"));
    parent.children("span").text(text);
    mainPicture.children("img").attr("src", picture.children("img").attr("src"));
    mainPicture.children("source").attr("srcset", picture.children("source").attr("srcset"));
  })
// <------ Custom select END ------>
}

function toggleBtnUp() {
  let btnUp = $(".button-up");
  if ($(window).scrollTop() > 0) {
    btnUp.addClass("show");
  } else {
    btnUp.removeClass("show");
  }
}

function testWebP(callback) {
  let webP = new Image();
  webP.onload = webP.onerror = function () {
    callback(webP.height === 2);
  };
  webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
};

testWebP(function (support) {
  if (support === true) {
    document.querySelector("body").classList.add("webp");
  }
});