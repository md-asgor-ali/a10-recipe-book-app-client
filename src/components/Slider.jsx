import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const slides = [
  {
    id: 1,
    title: "Delicious Recipes Await 🍲",
    desc: "Explore thousands of flavorful dishes curated for every mood and moment.",
    image: "https://cdn.pixabay.com/photo/2016/03/05/19/02/hamburger-1238246_1280.jpg",
  },
  {
    id: 2,
    title: "Healthy Meals, Happy You 🥗",
    desc: "Wholesome meals made easy for a better lifestyle.",
    image: "https://images.unsplash.com/photo-1494390248081-4e521a5940db?q=80&w=2006&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    title: "Cook Like a Chef 👨‍🍳",
    desc: "Step-by-step recipes to help you master the art of cooking.",
    image: "https://cdn.pixabay.com/photo/2015/04/08/13/13/food-712665_1280.jpg",
  },
];

const Slider = () => {
  return (
    <div className="w-11/12 mx-auto my-8 rounded-xl overflow-hidden shadow-lg">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        loop={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-[500px]">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex flex-col justify-center px-6 md:px-20 text-white">
                <h2 className="text-3xl md:text-5xl font-bold mb-4 drop-shadow-md">
                  {slide.title}
                </h2>
                <p className="text-sm md:text-lg max-w-xl drop-shadow">
                  {slide.desc}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;



