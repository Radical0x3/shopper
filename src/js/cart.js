import $ from "jquery";
import Scrollbar from "smooth-scrollbar";

Scrollbar.initAll({
  alwaysShowTracks: false,
  renderByPixels: true,
});

$("a").on("click", function (e) {
  e.preventDefault();
});

$(".cart__products-remove").on("click", function () {
  $(this).parents(".cart__products-item").remove();
});

$("#back-btn").on("click", function () {
  history.back();
});
