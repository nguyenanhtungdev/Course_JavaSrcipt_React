import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useRef } from "react";

export default function ImageSlider() {
  const timer = useRef();
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    slides: { perView: 1 },
    created() {
      startAutoSlide();
    },
    destroyed() {
      clearInterval(timer.current);
    },
  });

  // Auto slide mỗi 3 giây
  const startAutoSlide = () => {
    clearInterval(timer.current);
    timer.current = setInterval(() => {
      instanceRef.current?.next();
    }, 3000);
  };

  return (
    <div
      ref={sliderRef}
      className="keen-slider h-64 md:h-96 overflow-hidden rounded-xl"
    >
      <div className="keen-slider__slide number-slide1">
        <img
          src="/images/image1.png"
          className="w-full h-full object-cover"
          alt="Slide 1"
        />
      </div>
      <div className="keen-slider__slide number-slide2">
        <img
          src="/images/image2.png"
          className="w-full h-full object-cover"
          alt="Slide 2"
        />
      </div>
      <div className="keen-slider__slide number-slide3">
        <img
          src="/images/image3.png"
          className="w-full h-full object-cover"
          alt="Slide 3"
        />
      </div>
    </div>
  );
}
