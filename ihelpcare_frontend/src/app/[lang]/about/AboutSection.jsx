'use client';

import teamMember01 from '@images/team/team-member-01.png';
import Image from 'next/image';
import TeamMemberSlider from './TeamMemberSlider';

export default function AboutSection() {
  return (
    <section className='container mb-5 px-5 lg:px-0'>
      <div className='flex flex-col items-center justify-center space-y-10 lg:mt-10 lg:flex-row lg:items-start lg:justify-between lg:!space-x-20 lg:space-y-0'>
        {/* about us */}
        <div>
          <h1 className='title__anim text-center text-[30px] font-font-bold uppercase leading-normal tracking-wider text-color-primary lg:text-[40px]'>
            About Us
          </h1>

          <Image
            className='aspect-square h-auto w-[250px] rounded-rounded-default object-cover drop-shadow-sm transition-all duration-500 ease-in-out hover:rounded-2xl hover:drop-shadow-2xl lg:w-[350px]'
            src={teamMember01}
            alt='team member'
          />
        </div>

        {/* team member */}
        <div className='flex-1'>
          <h3 className='description__anim text-center text-[24px] font-font-normal text-color-txt-dark lg:text-start lg:text-[28px]'>
            Our team ........
          </h3>
          <p className='description__anim text-center text-[14px] font-font-normal leading-normal tracking-normal text-[#505258] lg:min-h-[60px] lg:text-justify lg:text-[16px]'>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illum eius error saepe quidem
            quod enim commodi ab, molestiae rem at fugit porro harum? Quibusdam in quis consequatur
            mollitia omnis.
          </p>

          <TeamMemberSlider />
        </div>
      </div>
    </section>
  );
}
