import $ from "jquery";
import "slick-carousel";

$("#new-arrivals").slick({
  slidesToShow: 3,
  speed: 700,
  autoplay: true,
  autoplaySpeed: 3000,
  pauseOnHover: true,
  responsive: [
    {
      breakpoint: 851,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 769,
      settings: {
        arrows: false,
        slidesToShow: 2,
        dots: true,
      },
    },
    {
      breakpoint: 577,
      settings: {
        arrows: false,
        slidesToShow: 1,
        dots: true,
      },
    },
  ],
});
