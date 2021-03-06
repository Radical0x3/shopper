import $ from "jquery";

$(".aside__title").on("click", function () {
  $(this).next(".aside__expanded").slideToggle(300);
  $(this).toggleClass("active");
  $(this).next(".aside-sizes").toggleClass("active");
});

$(".aside-check").on("click", function () {
  let check = $(this).next(".aside__expanded-check");

  if ($(check).is(":visible")) {
    $(check).hide(200);
    $(this).removeClass("active");
  } else {
    $(".aside__expanded-item").removeClass("active");
    $(".aside__expanded-check").hide(200);
    $(check).show(200);
    $(this).toggleClass("active");
  }
});

$(".aside__label").on("click", function () {
  toggleElements(this);

  $(this).parent("li").toggleClass("active");
});

function toggleElements(elem) {
  let val = $(elem).text();
  let newVal = $("<a href='#' class='content__tag'></a>").text(val);
  newVal.attr("data-parent", val);

  if ($(elem).parents(".aside-category").length > 0) {
    newVal.attr("data-category", "Category");
  }

  if ($(elem).hasClass("active")) {
    $(`.content__tag[data-parent='${val}']`).remove();
    $(elem).removeClass("active");
  } else {
    $(elem).addClass("active");
    $(".content__bottom").append(newVal);
  }
}

$(".aside-reset").on("click", function () {
  $(".aside__expanded-item").removeClass("active");
  $(".aside__expanded-check").hide(200);
  $(this).addClass("active");
  $("[data-title='category']")
    .children(".aside__expanded")
    .find(".aside__input")
    .prop("checked", false);
  $(".content__tag[data-category='Category']").remove();
});

$(".quick-action").on("click", function (e) {
  e.preventDefault();
  let elem = document.createElement("p");
  let parentContent = $(this)
    .parents(".goods__item-wrap")
    .children(".goods__content");
  let parentMsg = $(this).parents(".goods__item-wrap").children(".goods__msg");

  if (parentMsg.length > 0) {
    parentMsg.remove();
  }

  if ($(this).hasClass("active")) {
    // $(this).removeClass("active");
    elem.innerText = "Product removed!";
    elem.className = "goods__msg remove";
  } else {
    // $(this).addClass("active");
    elem.innerText = "Product added!";
    elem.className = "goods__msg add";
  }

  parentContent.before(elem);
});

$(".goods__item").on("mouseleave", function () {
  let elem = $(this).find(".goods__msg");
  setTimeout(function () {
    elem.hide("fast", () => elem.remove());
  }, 0);
});

$(".like-action").on("click", function () {
  let label = $(".like span");
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
});

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
});

$(".content__pagination-item").on("click", function () {
  $(".content__pagination-item").removeClass("active");
  $(this).toggleClass("active");
});

$(".prev-arrow").on("click", function () {
  let parent = $(this).parent();
  let val = $(parent).find(".content__pagination-item").length - 1;
  let current = $(".content__pagination-item.active a").text() - 2;

  if (current >= val) {
    current = 0;
  } else if (current < 0) {
    current = val;
  }

  $(".content__pagination-item.active").removeClass("active");
  $(".content__pagination-item").eq(current).addClass("active");
});

$(".next-arrow").on("click", function () {
  let parent = $(this).parent();
  let val = $(parent).find(".content__pagination-item").length;
  let current = $(".content__pagination-item.active a").text();

  if (current >= val) {
    current = 0;
  } else if (current < 0) {
    current = val;
  }

  $(".content__pagination-item.active").removeClass("active");
  $(".content__pagination-item").eq(current).addClass("active");
});

$(".content__bottom").on("click", ".content__tag", function (e) {
  e.preventDefault();
  let label = $(".aside__list").find(
    `.aside__label.active:contains("${$(this).text()}")`
  );

  label.removeClass("active");
  label.parent().removeClass("active");
  label.prev().prop("checked", false);
  $(this).remove();

  let col = $(".content__tag").length;
  if (col === 0) {
    $(".slider").show();
  }
});

$(".aside-category .aside__label").on("click", function () {
  let title = $(".content__title");
  let routes = $(".content__routes");
});

function checkGoods() {
  let goods = $(".goods__item:visible");
  let pages = $(".content__pagination");

  if (goods.length < 10) {
    pages.hide();
  } else {
    pages.show();
  }
}

let target = $(".content__bottom")[0];
let config = { childList: true, subtree: true };

const callback = function (target, observer) {
  let arr = $(".content__bottom").children(".content__tag");
  let opts = [];

  for (let item of arr) {
    opts.push($(item).text());
  }

  if (opts.length === 0) {
    $(".goods__item").show();
  } else {
    let res = "";
    for (let i = 0; i < opts.length; i++) {
      if (i === opts.length - 1) {
        res += opts[i];
      } else {
        res += opts[i] + ", ";
      }
    }

    $(".goods__item").each(function () {
      let attr = $(this).attr("data-options");
      if (typeof attr !== typeof undefined && attr !== false) {
        let arr = $(this).attr("data-options").split(", ");
        opts.every((elem) => arr.indexOf(elem) > -1)
          ? $(this).show()
          : $(this).hide();
      } else {
        $(this).hide();
      }
    });
  }

  checkGoods();
};

const observer = new MutationObserver(callback);
observer.observe(target, config);

// moveSort();
hideSort();
moveAside();
$(window).on("resize", function () {
  // moveSort();
  hideSort();
  moveAside();
});

function moveAside() {
  let elem = $(".aside");
  let windowInnerWidth = window.innerWidth;

  if (windowInnerWidth <= 940) {
    // elem.insertAfter(".content__actions");
    $(".content__mobile-filters").append(elem);
  } else {
    elem.insertBefore(".site");
  }
}

function hideSort() {
  let elem = $(".select");
  let windowInnerWidth = window.innerWidth;

  if (windowInnerWidth <= 940) {
    elem.addClass("hide");
  } else {
    elem.removeClass("hide");
  }
}

$(".filter-btn").on("click", function () {
  $(".content__mobile-filters").addClass("active");
  $("body").addClass("lock");
});

$(".sort-btn").on("click", function () {
  $(".content__mobile-sort").addClass("active");
  $("body").addClass("lock");
});

$(".content__mobile-close").on("click", function () {
  $(".content__mobile-filters").removeClass("active");
  $(".content__mobile-sort").removeClass("active");
  $("body").removeClass("lock");
});

$(".content__mobile-item").on("click", function () {
  $(".content__mobile-item").removeClass("active");
  $(this).addClass("active");
});

$(".content__mobile-bg").on("click", function () {
  $(this).parent().removeClass("active");
  $("body").removeClass("lock");
});

let container = $(".content__filter");
$(document).mouseup(function (e) {
  let select = $(".aside");
  if (
    container.has(e.target).length === 0 &&
    select.has(e.target).length === 0
  ) {
    select.removeClass("active");
  }
});
