import { ReactNode } from "react";
import { Swiper } from "swiper/react";

import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { Autoplay, FreeMode, Pagination } from "swiper/modules";

export default function SwiperBox({ children }: { children: ReactNode }) {
  return (
    <Swiper
      modules={[FreeMode, Pagination, Autoplay]}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
        waitForTransition: true,
      }}
      speed={1000}
      slidesPerView="auto"
      freeMode={true}
      className="mySwiper mb-6 py-6 px-6"
      spaceBetween={20}
    >
      {children}
    </Swiper>
  );
}
