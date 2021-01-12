import $ from "jquery";

$(".checkmark__container").on("click", function () {
  let elem = $(this).parents("tr");

  if (!elem.hasClass("active")) {
    $(".checkout__shipping tr").removeClass("active");
    elem.addClass("active");
  }
});
