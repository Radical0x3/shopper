import $ from "jquery";

$(".checkout__shipping .checkmark__container").on("click", function () {
  let elem = $(this).parents("tr");

  if (!elem.hasClass("active")) {
    $(".checkout__shipping tr").removeClass("active");
    elem.addClass("active");
  }
});

$(".checkout__payment-item .checkmark__container").on("click", function () {
  let elem = $(this).parents("li");

  if (!elem.hasClass("active")) {
    $(".checkout__payment-item").removeClass("active");
    elem.addClass("active");
  }
});

$(".select__item").on("click", function () {
  $(this).parents(".select").find(".select__header").addClass("active");
});

$(".checkout__wrap svg").on("click", function () {
  let elem = $(this).parent().children(".checkout__note");
  let wrap = $(this).parent();

  elem.toggleClass("active");
  wrap.toggleClass("active");
});

let container = $(".checkout__wrap");
$(document).mouseup(function (e) {
  let elem = $(".checkout__note");

  if (elem.has(e.target).length === 0 && container.has(e.target).length === 0) {
    elem.removeClass("active");
    container.removeClass("active");
  }
});

$(".checkout__payment-wrap .checkmark__container").on("click", function () {
  $(".checkout__payment-wrap .checkmark__container input").prop(
    "checked",
    false
  );
  $(this).children("input").prop("checked", true);
});

$(".checkout__checkout-btn").on("click", function (e) {
  $(".hidden-input").each(function () {
    let val = $(this).parent(".select__header.active").children("span").text();
    $(this).val(val);
  });
});
