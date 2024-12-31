import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/components/Slider.css";


const sliderData = [
  {
    image: require("../assets/kurs.jpeg"), 
    title: "MetalCore Infantry Genesis",
    price: "0.01 ETH",
  },
  {
    image: require("../assets/kurs.jpeg"), 
    title: "In Resonance",
    price: "0.05 ETH",
  },
  {
    image: require("../assets/js.png"), 
    title: "Less Than Three",
    price: "0.04 ETH",
  },
  {
    image: require("../assets/htmlc.jpg"), 
    title: "Emby",
    price: "0.23 ETH",
  },
];

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="carousel-container">
      <h2>Explore Courses</h2>
      <Slider {...settings}>
        {sliderData.map((item, index) => (
          <div className="carousel-slide" key={index}>
            <img src={item.image} alt={item.title} />
            <h3>{item.title}</h3>
            <p>Floor: {item.price}</p>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
