
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// import required modules
import { Autoplay } from 'swiper/modules';



const BrandsLogo = () => {
    return (
        <div className='mt-5 mb-5 p-4'>
            <Swiper
                spaceBetween={30}
                slidesPerView={5}
                centeredSlides={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}

                modules={[Autoplay]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <img className='h-[30px]' src="https://i.ibb.co/5110PgS/samsung-removebg-preview.png" alt="" />
                </SwiperSlide>

                <SwiperSlide>
                    <img className='h-[30px]' src="https://i.ibb.co/Yh5ZstX/One-Plus-Logo-removebg-preview.png" alt="" />
                </SwiperSlide>
                <SwiperSlide>
                    <img className='h-[30px]' src="https://i.ibb.co/dfvZYm0/lenevo-removebg-preview.png" alt="" />
                </SwiperSlide>
                <SwiperSlide>
                    <img className='h-[30px]' src="https://i.ibb.co/FhQjPzz/Wi-WU-removebg-preview.png" alt="" />
                </SwiperSlide>
                <SwiperSlide>
                    <img className='h-[30px]' src="https://i.ibb.co/X7RNqwn/Xiaomi-logo-removebg-preview.png" alt="" />
                </SwiperSlide>
                <SwiperSlide>
                    <img className='h-[30px]' src="https://i.ibb.co/fq8qh68/infinix-removebg-preview.png" alt="" />
                </SwiperSlide>
                <SwiperSlide>
                    <img className='h-[20px]' src="https://i.ibb.co/J3Z3TPc/oraimo-removebg-preview.png" alt="" />
                </SwiperSlide>

            </Swiper>
        </div>
    );
};

export default BrandsLogo;