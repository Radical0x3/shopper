import $ from "jquery";
import Scrollbar from "smooth-scrollbar";
import "slick-carousel";

Scrollbar.initAll({
  alwaysShowTracks: false,
  renderByPixels: true,
});

$(".aside__title").on("click", function () {
  $(this).next(".aside__expanded").toggle(300);
  $(this).toggleClass("active");
})

$(".aside-check").on("click", function () {
  let check = $(this).next(".aside__expanded-check");

  if ($(check).is(":visible")) {
    $(check).hide(200);
    $(this).removeClass("active");
  } else {
    $(".aside__expanded-item").removeClass("active");
    $(".aside__expanded-check").hide(200);
    $(check).show(200);
    $(this).toggleClass("active");
  }
})

$(".aside__label").on("click", function () {
  $(this).parent("li").toggleClass("active");
})

$(".aside-reset").on("click", function () {
  $(".aside__expanded-item").removeClass("active");
  $(".aside__expanded-check").hide(200);
  $(this).addClass("active");
  $("[data-title='category']").children(".aside__expanded").find(".aside__input").prop("checked", false);
})

$(".slider").slick({
  arrows: false,
  slidesToShow: 1,
  dots: true
});

$(".goods__item-link").on("click", function (e) {
  e.preventDefault();
})

$(".quick-action").on("click", function (e) {
  e.preventDefault();
  let elem = document.createElement("p");
  let parentContent = $(this).parents(".goods__item-wrap").children(".goods__content");
  let parentMsg = $(this).parents(".goods__item-wrap").children(".goods__msg");

  if (parentMsg.length > 0) {
    parentMsg.remove();
  }

  if ($(this).hasClass("active")) {
    // $(this).removeClass("active");
    elem.innerText = "Product removed!"
    elem.className = "goods__msg remove";
  } else {
    // $(this).addClass("active");
    elem.innerText = "Product added!"
    elem.className = "goods__msg add";
  }

  parentContent.before(elem);
})

$(".goods__item").on("mouseleave", function () {
  let elem = $(this).find(".goods__msg");
  setTimeout(function () {
    elem.hide("fast", () => elem.remove());
  }, 0);
})

$(".like-action").on("click", function () {
  let label = $(".like span");
  let val = parseInt(label.text());

  if ($(this).hasClass("active")) {
    val--;
    $(this).removeClass("active");
  } else {
    val++;
    $(this).addClass("active");
  }

  $(label).text(val);

  if (val < 1) {
    if (!$(label).parent().hasClass("hide")) {
      $(label).parent().addClass("hide");
    }
  } else {
    if ($(label).parent().hasClass("hide")) {
      $(label).parent().removeClass("hide");
    }
  }
})

$(".cart-action").on("click", function () {
  let label = $(".basket span");
  let val = parseInt(label.text());

  if ($(this).hasClass("active")) {
    val--;
    $(this).removeClass("active");
  } else {
    val++;
    $(this).addClass("active");
  }

  $(label).text(val);

  if (val < 1) {
    if (!$(label).parent().hasClass("hide")) {
      $(label).parent().addClass("hide");
    }
  } else {
    if ($(label).parent().hasClass("hide")) {
      $(label).parent().removeClass("hide");
    }
  }
})


