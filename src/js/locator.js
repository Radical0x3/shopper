import $ from "jquery";
import Scrollbar from "smooth-scrollbar";

Scrollbar.initAll({
  alwaysShowTracks: false,
  renderByPixels: true,
});

$(".locator__btn").on("click", function (e) {
  e.preventDefault();
  let form = $("#search-stores");

  form.submit();
});
