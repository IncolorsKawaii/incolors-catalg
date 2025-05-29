// src/components/ProductGallery.jsx
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

export default function ProductGallery({ images = [] }) {
  if (!images.length) return null;

  return (
    <Swiper
      modules={[Pagination]}
      spaceBetween={10}
      slidesPerView={1}
      loop={true}
      pagination={{ clickable: true }}
      className="rounded-xl shadow-md mb-4"
    >
      {images.map((src, i) => (
        <SwiperSlide key={i}>
          <img
            src={src}
            alt={`Imagen ${i + 1}`}
            className="w-full h-auto rounded-lg object-cover"
            loading="lazy"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
