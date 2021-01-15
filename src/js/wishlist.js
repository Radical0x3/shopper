import $ from "jquery";
import "slick-carousel";
import Scrollbar from "smooth-scrollbar";

Scrollbar.initAll({
  alwaysShowTracks: false,
  renderByPixels: true,
});

$(".nav-btn").on("click", function () {
  $(".account__mobile-nav").addClass("active");
  $("body").addClass("lock");
});

$(".account__mobile-close").on("click", function () {
  $(".account__mobile-nav").removeClass("active");
  $("body").removeClass("lock");
});

moveAside();
$(window).on("resize", function () {
  moveAside();
});

function moveAside() {
  let elem = $(".account__aside");
  let windowInnerWidth = window.innerWidth;

  if (windowInnerWidth <= 940) {
    $(".account__mobile-nav").append(elem);
  } else {
    elem.insertBefore(".wishlist__body");
  }
}

$(".account__pagination-item").on("click", function () {
  $(".account__pagination-item").removeClass("active");
  $(this).toggleClass("active");
});

$(".prev-arrow").on("click", function () {
  let parent = $(this).parent();
  let val = $(parent).find(".account__pagination-item").length - 1;
  let current = $(".account__pagination-item.active a").text() - 2;

  if (current >= val) {
    current = 0;
  } else if (current < 0) {
    current = val;
  }

  $(".account__pagination-item.active").removeClass("active");
  $(".account__pagination-item").eq(current).addClass("active");
});

$(".next-arrow").on("click", function () {
  let parent = $(this).parent();
  let val = $(parent).find(".account__pagination-item").length;
  let current = $(".account__pagination-item.active a").text();

  if (current >= val) {
    current = 0;
  } else if (current < 0) {
    current = val;
  }

  $(".account__pagination-item.active").removeClass("active");
  $(".account__pagination-item").eq(current).addClass("active");
});

$(".goods__remove").on("click", function (e) {
  e.preventDefault();
  $(this).parents(".goods__item").remove();
});

$(".goods__panel-item").on("click", function (e) {
  e.preventDefault();
  openPopup(0);

  $(".product-popup__preview-slider").slick({
    slidesToShow: 1,
    fade: true,
  });
});

function openPopup(id) {
  bodyLock();
  $(".js-popup[data-id-popup='" + id + "']").fadeIn(300);
}

function close_popup() {
  bodyUnlock();
  $(".js-popup").fadeOut(300);
}

$(".js-popup__close").click(close_popup);

$(".js-btn-popup").click(function (e) {
  e.preventDefault();
  let index_btn_popup = $(this).attr("href");
  openPopup(index_btn_popup);
});

$(".js-popup").click(function (e) {
  let popup = $(".js-popup__wrap");
  if (!popup.is(e.target) && popup.has(e.target).length === 0) {
    close_popup();
  }
});

let unlock = true;
const timeout = 200;
const body = document.querySelector("body");
const lockPadding = document.querySelectorAll(".lock-padding");

function bodyLock() {
  const lockPaddingValue =
    window.innerWidth - document.querySelector("body").offsetWidth + "px";
  if (lockPadding.length > 0) {
    for (let i = 0; i < lockPadding.length; i++) {
      const el = lockPadding[i];
      el.style.paddingRight = lockPaddingValue;
    }
  }
  body.style.paddingRight = lockPaddingValue;
  body.classList.add("lock");

  unlock = false;
  setTimeout(function () {
    unlock = true;
  }, timeout);
}

function bodyUnlock() {
  setTimeout(function () {
    for (let i = 0; i < lockPadding.length; i++) {
      const el = lockPadding[i];
      el.style.paddingRight = "0px";
    }
    body.style.paddingRight = "0px";
    body.classList.remove("lock");
  }, timeout);

  unlock = false;
  setTimeout(function () {
    unlock = true;
  }, timeout);
}

$(".product__colors-item").on("click", function () {
  let title = $(this)
    .parents(".product__colors")
    .children(".product__colors-title");
  let data = $(this).attr("data-colour");

  title.children("span").text(data);
  $(this).parent().children(".product__colors-item").removeClass("active");
  $(this).addClass("active");
});

$(".product__sizes .aside-sizes__item:not(.unavailable)").on(
  "click",
  function () {
    let title = $(this)
      .parents(".product__sizes")
      .children(".product__sizes-title");
    let data = $(this).attr("data-size");

    title.children("span").eq(0).text(data);
  }
);

$(".aside-sizes__item:not(.unavailable)").on("click", function () {
  $(this)
    .parent()
    .find(".aside-sizes__item")
    .find(".aside__input")
    .prop("checked", false);
  $(this).find(".aside__input").prop("checked", true);
});

$(".select__item").on("click", function () {
  let data = $(this).attr("data-count");
  $(this).parents(".select").find(".select__current").attr("data-count", data);
});

$(".wish-btn").on("click", function (e) {
  e.preventDefault();
  addToWish(this);
});
function addToWish(elem) {
  let label = $(".like span");
  let val = parseInt(label.text());

  if ($(elem).hasClass("active")) {
    val--;
    $(elem).removeClass("active");
  } else {
    val++;
    $(elem).addClass("active");
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
}
$(".cart-btn").on("click", function (e) {
  e.preventDefault();
  let count = $(".select__current").attr("data-count");
  let label = $(".basket span");
  let val = +label.text() + +count;

  $(label).text(val);
});
