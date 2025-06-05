import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function ProductGallery({ images }) {
  if (!images || images.length === 0) {
    return <p className="text-gray-500">No hay imagenes disponibles.</p>;
  }

  return (
    <div className="w-full h-[500px] relative">
      <Swiper
        modules={[Navigation, Pagination, A11y]}
        navigation={true}
        pagination={{ clickable: true }}
        spaceBetween={10}
        slidesPerView={1}
        grabCursor={true}
        style={{
          '--swiper-navigation-color': '#f472b6',
          '--swiper-pagination-color': '#f472b6',
        }}
        className="h-full"
      >
        {images.map((src, index) => (
          <SwiperSlide key={index} className="flex justify-center items-center h-full">
            <img
              src={src}
              alt={`Imagen ${index + 1}`}
              className="max-h-full max-w-full object-contain rounded-xl"
              loading="lazy"
              draggable={false}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
