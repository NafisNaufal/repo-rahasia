'use client'
import React, { useEffect, useRef } from 'react'
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react'
import { cardItemsMenu } from '@/data/data'
import CardItemMenu from '../component/CardItemMenu'
import 'swiper/css';
import 'swiper/css/navigation';
import prevButton from '@/Assets/Menu/icons/Vector (2).png'
import nextButton from '@/Assets/Menu/icons/Vector (3).png'
import Image from 'next/image';
import { NavigationOptions } from 'swiper/types';

interface NavigationOption extends NavigationOptions {
    prevEl: HTMLElement | null;
    nextEl: HTMLElement | null;
}


const index = () => {

    const swiperRef = useRef<SwiperClass | null>(null);
    const prefRef = useRef<HTMLDivElement | null>(null);
    const nextRef = useRef<HTMLDivElement | null>(null);
    const handlePrevSlide = () => {
        if (swiperRef.current) {
            swiperRef.current.slidePrev();
        }
    }

    useEffect(() => {
        if (swiperRef.current && prefRef.current && nextRef.current && swiperRef.current.params.navigation) {
            const navigation = swiperRef.current.params.navigation as NavigationOption;

            navigation.prevEl = prefRef.current;
            navigation.nextEl = nextRef.current;

            swiperRef.current.navigation.destroy();
            swiperRef.current.navigation.init();
            swiperRef.current.navigation.update();
        }
    }, [])

    const handleNextSlide = () => {
        if (swiperRef.current) {
            swiperRef.current.slideNext();
        }
    }

    return (
        <div className='flex flex-col items-center justify-center w-full p-7 gap-5'>
            <h1 className='text-5xl font-Inter font-semibold text-wrap text-center'><span className='text-primary-100'>Let’s Know</span> Menu Food Waste</h1>
            {/* Card Container */}
            <div className='z-10 w-full flex items-center justify-center relative flex-wrap'>
                {/* Card Item */}
                <Swiper
                    modules={[Navigation]}
                    onSwiper={(swiper) => {
                        swiperRef.current = swiper;
                    }}
                    spaceBetween={6}
                    grabCursor={true}
                    style={{cursor: 'grab'}}
                    onTouchStart={() => {
                        const swiperEl = document.querySelector('.swiper') as HTMLElement;
                        swiperEl.style.cursor = 'grabbing';
                    }}
                    onTouchEnd={() => {
                        const swiperEl = document.querySelector('.swiper') as HTMLElement;
                        swiperEl.style.cursor = 'grab';
                    }}
                    touchRatio={1}
                    touchAngle={45}
                    simulateTouch={true}
                    allowTouchMove={true}
                    resistanceRatio={0.85}
                    navigation={{
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    }}
                    className='w-[80%] flex flex-row items-center justify-center swiper-container-horizontal flex-wrap'
                    breakpoints={{
                        0: {
                        slidesPerView: 1,
                        spaceBetween: 6
                        },
                        768: {
                        slidesPerView: 2,
                        spaceBetween: 6
                        },
                        1024: {
                        slidesPerView: 3,
                        spaceBetween: 6
                        },
                    }}
                >
                    {cardItemsMenu.map((item, id) => (
                        <SwiperSlide key={id} className='max-w-sm'>
                            <div className='w-full h-full flex items-center justify-center'>
                                <CardItemMenu {...item} />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
                    <div className=' absolute left-0 top-1/2 transform -translate-y-1/2 z-20 cursor-pointer ' onClick={handlePrevSlide}>
                        <Image
                            src={prevButton}
                            alt="Previous Button"
                            width={500}
                            height={500}
                            className='w-10 h-full object-cover'
                        />
                    </div>
                    <div className=' absolute right-0 top-1/2 transform -translate-y-1/2 z-20 cursor-pointer ' onClick={handleNextSlide}>
                        <Image
                            src={nextButton}
                            alt="Next Button"
                            width={500}
                            height={500}
                            className='w-10 h-full object-cover'
                        />
                    </div>
            </div>
        </div>
    )
}

export default index
