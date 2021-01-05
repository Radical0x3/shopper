import $ from "jquery";
import "slick-carousel";
import Scrollbar from "smooth-scrollbar";

Scrollbar.initAll({
  alwaysShowTracks: false,
  renderByPixels: true,
});

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
  infinite: false,
  asNavFor: ".product__bigslider"
})

$(".goods__list").slick({
  slidesToShow: 4,
  draggable: false,
  responsive: [
    {
      breakpoint: 769,
      settings: {
        slidesToShow: 3,
      }
    },
    {
      breakpoint: 577,
      settings: {
        slidesToShow: 2,
        arrows: false,
        dots: true
      }
    },
    {
      breakpoint: 376,
      settings: {
        slidesToShow: 1,
        arrows: false,
        dots: true
      }
    },
  ]
});

$("a").on("click", function (e) {
  e.preventDefault();
})

$(".product__slider .slick-slide").on("click", function () {
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

$(".product__sizes .aside-sizes__item:not(.unavailable)").on("click", function () {
  let title = $(".product__sizes-title");
  let data = $(this).attr("data-size");

  title.children("span").eq(0).text(data);
})

$(".aside-sizes__item:not(.unavailable)").on("click", function () {
  $(this).parent().find(".aside-sizes__item").find(".aside__input").prop("checked", false);
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
  $("body").addClass("lock-pd");
  $(".js-popup[data-id-popup='" + id + "']").fadeIn(300);
}

function close_popup() {
  $("body").removeClass("lock");
  $("body").removeClass("lock-pd");
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
  addToWish(this);
})

$(".like-action").on("click", function (e) {
  e.preventDefault();
  addToWish(this);

  let elem = document.createElement("p");
  let parentContent = $(this).parents(".goods__item-wrap").children(".goods__content");
  let parentMsg = $(this).parents(".goods__item-wrap").children(".goods__msg");

  if (parentMsg.length > 0) {
    parentMsg.remove();
  }

  if (!$(this).hasClass("active")) {
    elem.innerText = "Product removed!"
    elem.className = "goods__msg remove";
  } else {
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

  let elem = document.createElement("p");
  let parentContent = $(this).parents(".goods__item-wrap").children(".goods__content");
  let parentMsg = $(this).parents(".goods__item-wrap").children(".goods__msg");

  if (parentMsg.length > 0) {
    parentMsg.remove();
  }

  if (!$(this).hasClass("active")) {
    elem.innerText = "Product removed!"
    elem.className = "goods__msg remove";
  } else {
    elem.innerText = "Product added!"
    elem.className = "goods__msg add";
  }

  parentContent.before(elem);
})

$(".cart-btn").on("click", function (e) {
  e.preventDefault();
  let count = $(".select__current").attr("data-count");
  let label = $(".basket span");
  let val = +label.text() + +count;

  $(label).text(val);
})

$(".menu-item").on("click", function () {
  let id = $(this).attr("data-index");
  $(".description__wrap").hide();
  $(`.description__wrap[data-index="${id}"]`).show();
})

$("#sort-current").on("click", function () {
  let ul = $(this).next("ul");

  if (ul.is(":visible")) {
    ul.fadeOut(200);
    $(this).removeClass("active");
  } else {
    ul.fadeIn(200);
    $(this).addClass("active");
  }
})

$(".reviews__sort-item").on("click", function () {
  let val = $(this).text();
  let parent = $(this).parents("#sort-value").children("#sort-current");
  parent.text(val);
  $(this).parent().fadeOut(200);
  $(this).parents("div").children("p").removeClass("active");
})

let container = $("#sort-current");
$(document).mouseup(function (e) {
  let select = $(".reviews__sort-list");
  if (
    container.has(e.target).length === 0 &&
    select.has(e.target).length === 0
  ) {
    container.removeClass("active");
    select.fadeOut(200);
  }
});

$(".reviews__btn svg").on("click", function () {
  $(this).parent().toggleClass("active");
})

$(".like-btn").on("click", function () {
  let span = $(this).next("span");
  let val = +span.text();
  let opposite = $(this).parent().parent().find(".dislike-btn").parent();
  let oppositeVal = +opposite.children("span").text();

  if (opposite.hasClass("active")) {
    opposite.removeClass("active");
    opposite.children("span").text(--oppositeVal);
  }

  if (!$(this).parent().hasClass("active")) {
    val--;
  } else {
    val++;
  }

  span.text(val);
})

$(".dislike-btn").on("click", function () {
  let span = $(this).next("span");
  let val = +span.text();
  let opposite = $(this).parent().parent().find(".like-btn").parent();
  console.log(opposite)
  let oppositeVal = parseInt(opposite.children("span").text());
  console.log(oppositeVal)

  if (opposite.hasClass("active")) {
    opposite.removeClass("active");
    opposite.children("span").text(--oppositeVal);
  }

  if (!$(this).parent().hasClass("active")) {
    val--;
  } else {
    val++;
  }

  span.text(val);
})

$(".reviews__pagination-item").on("click", function () {
  $(".reviews__pagination-item").removeClass("active");
  $(this).toggleClass("active");
})

$(".prev-arrow").on("click", function () {
  let parent = $(this).parent();
  let val = $(parent).find(".reviews__pagination-item").length - 1;
  let current = $(".reviews__pagination-item.active a").text() - 2;

  if (current >= val) {
    current = 0;
  } else if (current < 0) {
    current = val;
  }

  $(".reviews__pagination-item.active").removeClass("active");
  $(".reviews__pagination-item").eq(current).addClass("active");
})

$(".next-arrow").on("click", function () {
  let parent = $(this).parent();
  let val = $(parent).find(".reviews__pagination-item").length;
  let current = $(".reviews__pagination-item.active a").text();

  if (current >= val) {
    current = 0;
  } else if (current < 0) {
    current = val;
  }

  $(".reviews__pagination-item.active").removeClass("active");
  $(".reviews__pagination-item").eq(current).addClass("active");
})