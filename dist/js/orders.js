(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{113:function(n,a,i){"use strict";i.r(a);var t=i(0),c=i.n(t);function o(){var n=c()(".account__aside");window.innerWidth<=940?c()(".account__mobile-nav").append(n):n.insertBefore(".orders__body")}c()(".account__pagination-item").on("click",(function(){c()(".account__pagination-item").removeClass("active"),c()(this).toggleClass("active")})),c()(".prev-arrow").on("click",(function(){var n=c()(this).parent(),a=c()(n).find(".account__pagination-item").length-1,i=c()(".account__pagination-item.active a").text()-2;i>=a?i=0:i<0&&(i=a),c()(".account__pagination-item.active").removeClass("active"),c()(".account__pagination-item").eq(i).addClass("active")})),c()(".next-arrow").on("click",(function(){var n=c()(this).parent(),a=c()(n).find(".account__pagination-item").length,i=c()(".account__pagination-item.active a").text();i>=a?i=0:i<0&&(i=a),c()(".account__pagination-item.active").removeClass("active"),c()(".account__pagination-item").eq(i).addClass("active")})),c()(".nav-btn").on("click",(function(){c()(".account__mobile-nav").addClass("active"),c()("body").addClass("lock")})),c()(".account__mobile-close").on("click",(function(){c()(".account__mobile-nav").removeClass("active"),c()("body").removeClass("lock")})),o(),c()(window).on("resize",(function(){o()}))}},[[113,1,0]]]);