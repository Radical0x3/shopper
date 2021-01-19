import $ from "jquery";
import "slick-carousel";

$(".reviews__slider").slick({
  slidesToShow: 1,
  dots: true,
  draggable: false,
});

hideImages();
$(window).on("resize", function () {
  hideImages();
});

function hideImages() {
  let elems = $(".instagram__img");
  let windowInnerWidth = window.innerWidth;

  if (windowInnerWidth <= 580) {
    for (let i = 8; i < elems.length; i++) {
      $(elems[i]).addClass("hide");
    }
  } else {
    for (let i = 8; i < elems.length; i++) {
      $(elems[i]).removeClass("hide");
    }
  }
}
