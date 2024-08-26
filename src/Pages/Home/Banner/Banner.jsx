
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// import required modules
import { Autoplay, Navigation } from 'swiper/modules';


const Banner = () => {
    return (
        <div className='pt-16'>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}

                modules={[Autoplay, Navigation]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <img className='lg:h-[550px] lg:w-full' src="https://i.ibb.co/0hZykMM/one.jpg" alt="" />
                </SwiperSlide>
                <SwiperSlide>
                    <img className='lg:h-[550px] lg:w-full' src="https://i.ibb.co/MfvZJvg/three.jpg" alt="" />
                </SwiperSlide>
                <SwiperSlide>
                    <img className='lg:h-[550px] lg:w-full' src="https://i.ibb.co/85Tr62B/two.jpg" alt="" />
                </SwiperSlide>
                <SwiperSlide>
                    <img className='lg:h-[550px] lg:w-full' src="https://i.ibb.co/b1WD2Ch/four.jpg" alt="" />
                </SwiperSlide>

            </Swiper>
        </div>
    );
};

export default Banner;