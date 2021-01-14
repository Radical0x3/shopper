import $ from "jquery";

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
    elem.insertBefore(".orders__body");
  }
}
