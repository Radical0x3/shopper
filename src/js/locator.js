import $ from "jquery";

$(".locator__btn").on("click", function (e) {
  e.preventDefault();
  let form = $("#search-stores");

  form.submit();
});
