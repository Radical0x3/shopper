import $ from "jquery";

let time = 5607408;
let parts = $(".soon__item .soon__title");

let timerId = setInterval(function () {
  time--;
  let d = Math.floor(time / 60 / 60 / 24);
  let h = Math.floor((time - d * 24 * 60 * 60) / 60 / 60);
  let m = Math.floor((time - d * 24 * 60 * 60 - h * 60 * 60) / 60);
  let s = time - d * 60 * 60 * 24 - h * 60 * 60 - m * 60;

  if (d < 10) {
    d = `0${d}`;
  }

  if (h < 10) {
    h = `0${h}`;
  }

  if (m < 10) {
    m = `0${m}`;
  }

  if (s < 10) {
    s = `0${s}`;
  }

  let res = [d, h, m, s];

  for (let i = 0; i < res.length; i++) {
    $(parts[i]).text(res[i]);
  }

  if (time <= 0) {
    clearInterval(timerId);
  }
}, 1000);
