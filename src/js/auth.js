import $ from "jquery";
import Scrollbar from "smooth-scrollbar";

Scrollbar.initAll({
  alwaysShowTracks: false,
  renderByPixels: true,
});

$(document).ready(function () {
  let pass = document.getElementById("pass");
  let confirmPass = document.getElementById("confirm-pass");

  pass.addEventListener("input", function () {
    this.value != confirmPass.value
      ? confirmPass.setCustomValidity("Passwords do not match")
      : confirmPass.setCustomValidity("");
  });

  confirmPass.addEventListener("input", function () {
    this.value != pass.value
      ? this.setCustomValidity("Passwords do not match")
      : this.setCustomValidity("");
  });

  $(".auth__forgot").on("click", function (e) {
    e.preventDefault();
    openPopup(0);
  });

  function openPopup(id) {
    bodyLock();
    $(".js-popup[data-id-popup='" + id + "']").fadeIn(300);
  }

  function close_popup() {
    bodyUnlock();
    $(".js-popup").fadeOut(300);
  }

  $(".js-popup__close").click(close_popup);

  $(".js-btn-popup").click(function (e) {
    e.preventDefault();
    let index_btn_popup = $(this).attr("href");
    openPopup(index_btn_popup);
  });

  $(".js-popup").click(function (e) {
    let popup = $(".js-popup__wrap");
    if (!popup.is(e.target) && popup.has(e.target).length === 0) {
      close_popup();
    }
  });

  let unlock = true;
  const timeout = 200;
  const body = document.querySelector("body");
  const lockPadding = document.querySelectorAll(".lock-padding");
  const header = document.querySelector(".header");

  function bodyLock() {
    const lockPaddingValue =
      window.innerWidth - document.querySelector("body").offsetWidth + "px";
    if (lockPadding.length > 0) {
      for (let i = 0; i < lockPadding.length; i++) {
        const el = lockPadding[i];
        el.style.paddingRight = lockPaddingValue;
      }
    }
    header.style.paddingRight = lockPaddingValue;
    body.style.paddingRight = lockPaddingValue;
    body.classList.add("lock");

    unlock = false;
    setTimeout(function () {
      unlock = true;
    }, timeout);
  }

  function bodyUnlock() {
    setTimeout(function () {
      for (let i = 0; i < lockPadding.length; i++) {
        const el = lockPadding[i];
        el.style.paddingRight = "0px";
      }
      body.style.paddingRight = "0px";
      header.style.paddingRight = "0px";
      body.classList.remove("lock");
    }, timeout);

    unlock = false;
    setTimeout(function () {
      unlock = true;
    }, timeout);
  }
});
