import $ from "jquery";
import "./slider";

window.onload = function () {
  // <------ Button scroll-up START ------>
  $("a").on("click", function (e) {
    let href = $(this).attr("href");

    if (href.startsWith("#") && href !== "#" & href !== "##") {
      $("html, body").animate(
        {
          scrollTop: $(href).offset().top - 55,
        },
        {
          duration: 600,
          easing: "linear",
        }
      );

      return false;
    }
  });

  $(window).scroll(function () {
    toggleBtnUp();
  });
  toggleBtnUp();

  function toggleBtnUp() {
    let btnUp = $(".button-up");
    if ($(window).scrollTop() > 0) {
      btnUp.addClass("show");
    } else {
      btnUp.removeClass("show");
    }
  }

  // <------ Button scroll-up END ------>

  // <------ Header menu  START ------>
  $(".menu-item").on("click", function () {
    if (!$(this).hasClass("active")) {
      $(this).parent().children(".menu-item").removeClass("active");
      $(this).addClass("active");
    }
  });

  $(".drop-menu__item").on("click", function () {
    $(this)
      .parent()
      .parent()
      .children(".header__actions-value")
      .text($(this).text());
  });

  menuToggle();
  $(window).on("resize", function () {
    menuToggle();
  });

  function menuToggle() {
    let menu = $(".drop-menu");
    let windowInnerWidth = window.innerWidth;

    if (windowInnerWidth > 768) {
      menu.on("mouseover", function () {
        $(this).children("ul").addClass("active");
      });

      menu.on("mouseout", function () {
        $(this).children("ul").removeClass("active");
      });
    } else {
      $(".drop-menu div").on("click", function () {
        // $(this).children("ul").toggleClass("active");
        let elem = $(this).next("ul");

        if (!elem.hasClass("active")) {
          $(".drop-menu ul.active").removeClass("active");
          elem.addClass("active");
        } else {
          elem.removeClass("active");
        }
      });
    }
  }

  $(".drop-menu > ul > li").on("click", function () {
    let li = $(this).parent().parent();
    let picture = $(li).children("div").children("picture").children("source");
    let img = $(li).children("div").children("picture").children("img");
    let span = $(li).children("div").children("span");
    if (
      typeof picture.attr("srcset") !== typeof undefined &&
      typeof picture.attr("srcset") !== false
    ) {
      $(picture).attr(
        "srcset",
        $(this).children("picture").children("source").attr("srcset")
      );
      $(img).attr(
        "src",
        $(this).children("picture").children("img").attr("src")
      );
    }
    span.text($(this).text());
    $(this).parent().parent().triggerHandler("mouseout");
    $(this).parent().removeClass("active");
  });
  // <------ Header menu END ------>

  // <------ Email check START ------>
  let pattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,4})+$/;
  let mail = $(".newsletter__email");
  let mail_btn = $(".newsletter__submit");
  let label = $("#label");

  mail.on("input", function () {
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

  // <------ Video control START ------>
  $(".collection__video-btn").on("click", function () {
    let video = $(".collection__video");
    document.getElementById("video").play();
    if (video.hasClass("active")) {
      video.removeClass("active");
      document.getElementById("video").pause();
    } else {
      video.addClass("active");
    }
  });

  $("#video").on("ended", function () {
    $(".collection__video").removeClass("active");
  });
  // <------ Video control END ------>

  // <------ Goods color's picker START ------>
  let colors = $(".goods__colors-item");
  colors.on("click", function () {
    let img = $(this)
      .parents(".goods__item-wrap")
      .children("a")
      .children("picture");
    if (!$(this).hasClass("active")) {
      $(this).parents(".goods__item").find(colors).removeClass("active");
      $(this).toggleClass("active");
      img.children("img").attr("src", $(this).attr("data-img"));
      img.children("source").attr("srcset", $(this).attr("data-img"));
    }
  });
  // $(".goods__item-link").on("click", function (e) {
  //   e.preventDefault();
  // })
  // <------ Goods color's picker END ------>

  // <------ Goods select START ------>
  let select = $(".select");
  select.on("click", function () {
    let selectBody = $(this).find(".select__body");
    if (!selectBody.hasClass("active")) {
      select.find(".select__body").removeClass("active");
      selectBody.addClass("active");
    } else {
      selectBody.removeClass("active");
    }
  });

  $(".select__item").on("click", function () {
    let text = $(this).children("span").text();
    let picture = $(this).children("picture");
    let parent = $(this).parents(".select").children(".select__header");
    let main = $(this).parents(".goods__item-wrap").children("a");
    let mainPicture = main.children("picture");
    let parentPicture = parent.children("picture");

    parentPicture
      .children("img")
      .attr("src", picture.children("img").attr("src"));
    parentPicture
      .children("source")
      .attr("srcset", picture.children("source").attr("srcset"));
    parent.children("span").text(text);
    mainPicture
      .children("img")
      .attr("src", picture.children("img").attr("src"));
    mainPicture
      .children("source")
      .attr("srcset", picture.children("source").attr("srcset"));
  });

  let container = $(".select__header");
  $(document).mouseup(function (e) {
    let select = $(".select__body");
    if (
      container.has(e.target).length === 0 &&
      select.has(e.target).length === 0
    ) {
      select.removeClass("active");
    }
  });
  // <------ Goods select END ------>

  let btn = $(".like span");
  let val = parseInt(btn.text());

  if (val < 1) {
    if (!$(btn).parent().hasClass("hide")) {
      $(btn).parent().addClass("hide");
    }
  } else {
    if ($(btn).parent().hasClass("hide")) {
      $(btn).parent().removeClass("hide");
    }
  }
};

$(".header__label").on("click", function () {
  $(".header__search").toggleClass("active");
});

// <------ Burger menu START ------>
const btnUp = $(".button-up");
$(".hamburger").on("click", function () {
  $(this).toggleClass("is-active");
  $(".header__body").toggleClass("active");
  $(".header__mobile .container").toggleClass("active");
  $(".header__close").toggleClass("active");
  $("body").toggleClass("lock");
  $(".main").toggleClass("active");
  $(".footer").toggleClass("active");
  btnUp.toggleClass("lock");
});

$(".header__close").on("click", function () {
  $(".hamburger").removeClass("is-active");
  $(".header__body").removeClass("active");
  $(".header__mobile .container").removeClass("active");
  $(".header__close").removeClass("active");
  $(".main").removeClass("active");
  $(".footer").removeClass("active");
  $("body").removeClass("lock");
  btnUp.removeClass("lock");
});
// <------ Burger menu END ------>

// <------ Form submit START ------>
let form = document.getElementById("header-form");
$(".header__label").on("click", function (e) {
  form.submit();
  e.preventDefault();
});

// <------ Form submit  END ------>

function mobileToggle() {
  if ($(window).width() < 769) {
    $(".categories__titles-item p").on("touchend", function () {
      let id = $(this).parent().attr("data-category-id");
      let elem = $(`.categories__details-wrap[data-category-id="${id}"]`);
      $(this).toggleClass("active");
      elem.slideToggle(300);
    });

    $("#catalog .header__list-link").on("touchend", function () {
      let elem = $(".categories__wrap");

      if (!elem.is(":visible")) {
        elem.slideDown(300);
        $(this).addClass("active");
      } else {
        elem.slideUp(300);
        $(this).removeClass("active");
        $(".categories__titles-item .categories__details-wrap").hide();
        $(".categories__titles-item p").removeClass("active");
      }
    });
  }
}

mobileToggle();
$(window).resize(function () {
  mobileToggle();
});

// <------ WebP compatibility START ------>
function testWebP(callback) {
  let webP = new Image();
  webP.onload = webP.onerror = function () {
    callback(webP.height === 2);
  };
  webP.src =
    "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function (support) {
  if (support === true) {
    document.querySelector("body").classList.add("webp");
  }
});
// <------ WebP compatibility END ------>
