import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function ProductGallery({ images }) {
  if (!images || images.length === 0) {
    return <p className="text-gray-500">No hay imágenes disponibles.</p>;
  }

  return (
    <div className="my-6 w-full max-w-[600px] h-auto aspect-[4/5] sm:aspect-[4/5] md:aspect-[4/5]">
      <Swiper
        modules={[Navigation, Pagination, A11y]}
        navigation={true}
        pagination={{ clickable: true }}
        spaceBetween={10}
        slidesPerView={1}
        grabCursor={true}
        style={{ '--swiper-navigation-color': '#f472b6', '--swiper-pagination-color': '#f472b6' }}
      >
        {images.map((src, index) => (
          <SwiperSlide key={index}>
            <img
              src={src}
              alt={`Imagen ${index + 1}`}
              className="w-full h-auto max-h-[500px] object-contain rounded-xl"
              loading="lazy"
              draggable={false}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
