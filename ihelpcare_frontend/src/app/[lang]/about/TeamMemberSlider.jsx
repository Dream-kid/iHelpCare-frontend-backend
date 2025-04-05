'use client';

import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import teamMember from '@data/team-member';
import { Button, ConfigProvider, Tooltip } from 'antd';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

export default function TeamMemberSlider() {
  const carouselRef = useRef();

  const prevSlideHandle = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: -200,
        behavior: 'smooth',
      });
    }

    // if end of scroll return to start
    if (carouselRef.current.scrollLeft === 0) {
      carouselRef.current.scrollTo({
        left: carouselRef.current.scrollWidth,
        behavior: 'smooth',
      });
    }
  };

  const nextSlideHandle = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: 200,
        behavior: 'smooth',
      });
    }

    // if end of scroll return to start
    if (
      carouselRef.current.scrollLeft + carouselRef.current.clientWidth >=
      carouselRef.current.scrollWidth
    ) {
      carouselRef.current.scrollTo({
        left: 0,
        behavior: 'smooth',
      });
    }
  };

  // auto scroll play function
  const autoScroll = () => {
    if (carouselRef.current) {
      if (carouselRef.current.scrollLeft === 0) {
        carouselRef.current.scrollTo({
          left: carouselRef.current.scrollWidth,
          behavior: 'smooth',
        });
      } else {
        carouselRef.current.scrollTo({
          left: carouselRef.current.scrollLeft - 200,
          behavior: 'smooth',
        });
      }
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      autoScroll();
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className='mx-auto w-[320px] md:w-[640px] lg:mx-0'>
      <div className='relative mt-10 overflow-hidden lg:mt-20'>
        <div
          ref={carouselRef}
          className='flex flex-row items-center justify-center gap-5 overflow-x-hidden'
        >
          <ConfigProvider theme={{ token: { borderRadius: 0 } }}>
            {teamMember?.map((member) => (
              <Tooltip
                key={member?.id}
                title={member?.name || 'Unknown Member'}
              >
                <Image
                  className='!aspect-square !h-[150px] !w-[150px] rounded-rounded-default border-[1px] border-solid border-color-primary object-cover drop-shadow-sm transition-all duration-500 ease-in-out hover:rounded-2xl hover:drop-shadow-2xl md:!h-[200px] md:!w-[200px]'
                  src={member?.image}
                  alt={member?.name}
                />
              </Tooltip>
            ))}
          </ConfigProvider>
        </div>
      </div>

      <div className='mt-10 flex flex-row items-center justify-center space-x-5 lg:items-start lg:justify-start'>
        <Button
          className='group !rounded-full border-color-bg-dark lg:!p-8'
          icon={
            <ArrowLeftOutlined className='transition-all duration-300 ease-in-out lg:-translate-x-2 lg:-translate-y-3 lg:group-hover:-translate-x-4' />
          }
          onClick={prevSlideHandle}
          type='default'
          shape='circle'
          size='large'
        />
        <Button
          className='group !rounded-full border-color-bg-dark lg:!p-8'
          icon={
            <ArrowRightOutlined className='transition-all duration-300 ease-in-out lg:-translate-x-2 lg:-translate-y-3 lg:group-hover:translate-x-0' />
          }
          onClick={nextSlideHandle}
          type='default'
          shape='circle'
          size='large'
        />
      </div>
    </div>
  );
}
