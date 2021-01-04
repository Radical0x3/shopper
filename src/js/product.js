import $ from "jquery";
import "slick-carousel";

$(".product__bigslider").slick({
  fade: true,
  arrows: false,
  asNavFor: ".product__slider",
  draggable: false,
  swipe: false
})

$(".product__slider").slick({
  slidesToShow: 3,
  arrows: false,
  asNavFor: ".product__bigslider"
})

$(".product__slider .slick-active").on("click", function () {
  let id = $(this).index();
  $(".product__bigslider").slick("slickGoTo", id);
})

$(".product__colors-item").on("click", function () {
  let title = $(".product__colors-title");
  let data = $(this).attr("data-colour");

  title.children("span").text(data);
  $(".product__colors-item").removeClass("active");
  $(this).addClass("active");
})

$(".aside-sizes__item:not(.unavailable)").on("click", function () {
  let title = $(".product__sizes-title");
  let data = $(this).attr("data-size");

  title.children("span").eq(0).text(data);
  $(".aside-sizes__item").find(".aside__input").prop("checked", false);
  $(this).find(".aside__input").prop("checked", true);
})

$(".product__sizes-chart a").on("click", function (e) {
  e.preventDefault();
  openPopup(0);
})

$(".product__wait").on("click", function (e) {
  e.preventDefault();
  openPopup(1);
})

function openPopup(id) {
  $("body").addClass("lock");
  $(".js-popup[data-id-popup='" + id + "']").fadeIn(300);
}

function close_popup() {
  $("body").removeClass("lock");
  $('.js-popup').fadeOut(300);
}

$('.js-popup__close').click(close_popup);

$('.js-btn-popup').click(function (e) {
  e.preventDefault();
  let index_btn_popup = $(this).attr('href');
  openPopup(index_btn_popup);
});

$('.js-popup').click(function (e) {
  let popup = $('.js-popup__wrap');
  if (!popup.is(e.target) && popup.has(e.target).length === 0) {
    close_popup();
  }
});

$(".product-popup__units-item").on("click", function () {
  $(this).parents(".product-popup__body").find(".product-popup__units-item").removeClass("active");
  $(this).addClass("active");
})

$(".select__item").on("click", function () {
  let data = $(this).attr("data-count");
  $(this).parents(".select").find(".select__current").attr("data-count", data);
})

$(".wish-btn").on("click", function (e) {
  e.preventDefault();
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

$(".cart-btn").on("click", function (e) {
  e.preventDefault();
  let count = $(".select__current").attr("data-count");
  let label = $(".basket span");
  let val = +label.text() + +count;

  $(label).text(val);
})