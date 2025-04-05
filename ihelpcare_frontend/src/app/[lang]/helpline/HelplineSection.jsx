'use client';

import { ArrowLeftOutlined, MessageOutlined, PhoneOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import Link from 'next/link';
import PropTypes from 'prop-types';

export default function HelplineSection({ locale }) {
  return (
    <section className='min-h-[78vh] py-5 lg:py-10'>
      <div className='mx-auto w-[95%] rounded-rounded-default bg-color-bg-light drop-shadow-md lg:w-[60%]'>
        <div className='mx-5 flex flex-col items-center justify-center pt-5 lg:mx-10 lg:pt-10'>
          <iframe
            className='aspect-video h-auto w-full rounded-md border-[2px] border-solid border-color-gray'
            src='https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d6620.162212917021!2d-84.519096!3d33.939042!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88f5115f6c085b19%3A0x25b591da392ef372!2s1100%20South%20Marietta%20Pkwy%20SE%2C%20Marietta%2C%20GA%2030060%2C%20USA!5e0!3m2!1sen!2sbd!4v1705400289704!5m2!1sen!2sbd'
            referrerPolicy='no-referrer-when-downgrade'
            title='iHelp Google Map'
            loading='lazy'
          />

          <h1 className='mt-5 text-center font-font-montserrat text-[26px] font-font-semi-bold leading-normal lg:mt-10 lg:text-[32px]'>
            iHelp
          </h1>
          <p className='text-center font-font-montserrat text-[14px] font-font-normal lg:text-[16px]'>
            Alzheimer’s Association: 1 (800) 272-3900
          </p>
          <p className='text-center font-font-montserrat text-[14px] font-font-normal lg:text-[16px]'>
            The AFA Helpline is open from 9 am-9 pm ET, seven days a week.
          </p>

          <div className='mt-5 flex flex-col items-center justify-between space-y-5 lg:mt-10'>
            <p className='mb-0 text-center font-font-montserrat text-[14px] font-font-normal lg:text-[16px]'>
              Connect with a licensed social worker by:
            </p>

            <Button
              className='bg-[#0dcaf0] transition-colors duration-200 ease-in-out'
              href='tel:866-232-8484'
              icon={<PhoneOutlined />}
              type='primary'
              size='large'
              block
            >
              866-232-8484
            </Button>

            <Button
              className='bg-[#0dcaf0] transition-colors duration-200 ease-in-out'
              href='sms:646-586-5283'
              icon={<MessageOutlined />}
              type='primary'
              size='large'
              block
            >
              Send Us a Text Message
            </Button>
          </div>
        </div>

        <Link href={`/${locale}`}>
          <Button
            className='my-5 font-font-semi-bold text-color-primary transition-colors duration-200 ease-in-out hover:!text-color-secondary'
            icon={<ArrowLeftOutlined />}
            size='large'
            type='link'
            block
          >
            Back to Home
          </Button>
        </Link>
      </div>
    </section>
  );
}

HelplineSection.propTypes = {
  locale: PropTypes.string.isRequired,
};
