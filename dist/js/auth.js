(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{112:function(t,e,n){"use strict";n.r(e);var i=n(0),o=n.n(i);n(4).a.initAll({alwaysShowTracks:!1,renderByPixels:!0}),o()(document).ready((function(){var t=document.getElementById("pass"),e=document.getElementById("confirm-pass");function n(t){!function(){var t=window.innerWidth-document.querySelector("body").offsetWidth+"px";if(a.length>0)for(var e=0;e<a.length;e++)a[e].style.paddingRight=t;s.style.paddingRight=t,s.classList.add("lock"),setTimeout((function(){}),200)}(),o()(".js-popup[data-id-popup='"+t+"']").fadeIn(300)}function i(){setTimeout((function(){for(var t=0;t<a.length;t++)a[t].style.paddingRight="0px";s.style.paddingRight="0px",s.classList.remove("lock")}),200),setTimeout((function(){}),200),o()(".js-popup").fadeOut(300)}t.addEventListener("input",(function(){this.value!=e.value?e.setCustomValidity("Passwords do not match"):e.setCustomValidity("")})),e.addEventListener("input",(function(){this.value!=t.value?this.setCustomValidity("Passwords do not match"):this.setCustomValidity("")})),o()(".auth__forgot").on("click",(function(t){t.preventDefault(),n(0)})),o()(".js-popup__close").click(i),o()(".js-btn-popup").click((function(t){t.preventDefault(),n(o()(this).attr("href"))})),o()(".js-popup").click((function(t){var e=o()(".js-popup__wrap");e.is(t.target)||0!==e.has(t.target).length||i()}));var s=document.querySelector("body"),a=document.querySelectorAll(".lock-padding")}))}},[[112,1,0,4,2,3,5,6]]]);