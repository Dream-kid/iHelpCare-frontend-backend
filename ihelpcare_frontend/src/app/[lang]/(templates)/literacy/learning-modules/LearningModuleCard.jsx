'use client';

import PropTypes from 'prop-types';

export default function LearningModuleCard({ title, moduleId, moduleName, redirectUrl }) {
  return (
    <button
      key={moduleId}
      className='learning__card-anim cursor-pointer border-none bg-color-bg-light transition-colors duration-300 ease-in-out hover:bg-white'
      onClick={() => window.open(redirectUrl, '_blank')}
      type='button'
    >
      <div className='flex min-h-[280px] w-full flex-col items-center justify-center border-[7px] border-solid border-[#424972] bg-[#F3EFEB] p-8 lg:p-12'>
        <h2 className='mb-0 text-center font-font-montserrat text-[20px] font-font-bold leading-snug tracking-wide text-[#4A326B] lg:text-[24px]'>
          {title}
        </h2>
      </div>

      <div className='mt-5 flex flex-row items-center justify-center'>
        <p className='mb-0 bg-color-primary px-10 py-2 text-center font-font-montserrat text-[16px] font-font-semi-bold uppercase leading-normal text-color-txt-light'>
          {moduleName}
        </p>
      </div>
    </button>
  );
}

LearningModuleCard.propTypes = {
  title: PropTypes.string.isRequired,
  moduleId: PropTypes.string.isRequired,
  moduleName: PropTypes.string.isRequired,
  redirectUrl: PropTypes.string.isRequired,
};
