import $ from "jquery";

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
    elem.insertBefore(".address__body");
  }
}

$(".remove-btn").on("click", function (e) {
  e.preventDefault();
  $(this).parents(".address__item").remove();
});
