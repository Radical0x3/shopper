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
  let elem = $(".blog-menu");
  let windowInnerWidth = window.innerWidth;

  if (windowInnerWidth <= 400) {
    $(".account__mobile-nav").append(elem);
  } else {
    elem.insertAfter(".account__mobile-nav");
  }
}

function changeProgress() {
  let currentPosts = $(".blog__item:visible").length;
  let maxPosts = $(".blog__item").length;
  let currentLabel = $(".blog__progress-cur");
  let maxLabel = $(".blog__progress-max");
  let percent = (currentPosts / maxPosts) * 100;

  percent = percent.toFixed(2);
  $(".blog__progress").css("--elem-width", `${percent}%`);

  currentLabel.text(currentPosts);
  maxLabel.text(maxPosts);
}

changeProgress();

$(".blog__load-more").on("click", function (e) {
  e.preventDefault();
  let posts = $(".blog__item.hidden");

  if (posts.length < 6) {
    $(this).addClass("hidden");
  }

  for (let i = 0; (i < 6) & (i < posts.length); i++) {
    $(posts[i]).removeClass("hidden");
  }

  changeProgress();
});
