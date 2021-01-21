import $ from "jquery";

$(".cart__products-remove").on("click", function () {
  $(this).parents(".cart__products-item").remove();
});

$("#back-btn").on("click", function () {
  history.back();
});

$(".cart__quantity-minus").on("click", function () {
  let elem = $(this).next(".cart__quantity-current");
  let val = parseInt(elem.text());

  if (val <= 1) {
    elem.text(1);
  } else {
    elem.text(val - 1);
  }
});

$(".cart__quantity-plus").on("click", function () {
  let elem = $(this).prev(".cart__quantity-current");
  let val = parseInt(elem.text());

  elem.text(val + 1);
});
