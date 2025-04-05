import {
  FacebookOutlined,
  LinkedinOutlined,
  TwitterOutlined,
  YoutubeOutlined,
} from '@ant-design/icons';
import { getLocale } from '@root/i18n.config';
import { Divider, Input } from 'antd';
import { useSelector } from 'react-redux';
import SocialLink from './social-link';

function MyFooter() {
  const lang = useSelector((state) => state.content.lang);
  const locale = getLocale();

  return (
    <footer className='container'>
      <div className='flex flex-col items-center justify-center space-y-10 lg:flex-row lg:justify-between lg:space-y-0'>
        <div className='space-y-5'>
          <h2 className='text-center font-font-montserrat text-[16px] font-font-semi-bold text-color-primary lg:text-start lg:text-[21px]'>
            {lang?.follow_us?.[locale] || 'Follow us'}
          </h2>

          <div className='space-x-4 lg:space-x-6'>
            <SocialLink
              socialIcon={<TwitterOutlined className='mt-1.5 text-[20px]' />}
              url='https://twitter.com'
            />
            <SocialLink
              socialIcon={<LinkedinOutlined className='mt-1.5 text-[20px]' />}
              url='https://www.linkedin.com'
            />
            <SocialLink
              socialIcon={<FacebookOutlined className='mt-1.5 text-[20px]' />}
              url='https://www.facebook.com'
            />
            <SocialLink
              socialIcon={<YoutubeOutlined className='mt-1.5 text-[20px]' />}
              url='https://www.youtube.com'
            />
          </div>
        </div>

        <div className='space-y-5'>
          <h2 className='text-center font-font-montserrat text-[16px] font-font-semi-bold text-color-primary lg:text-end lg:text-[21px]'>
            {lang?.get_the_newsletter?.[locale] || 'Get the Newsletter'}
          </h2>

          <Input.Search
            className='!w-full lg:!w-[500px]'
            placeholder={lang?.your_email_address?.[locale] || 'Your email address'}
            enterButton={lang?.subscribe?.[locale] || 'Subscribe'}
            size='large'
            type='email'
            allowClear
          />
        </div>
      </div>

      <Divider className='bg-color-primary' />

      <p className='mb-0 text-center font-font-montserrat text-[14px] font-font-medium text-color-primary'>
        {lang?.ihelp_address?.[locale] ||
          '1717 Harrison St, San Francisco, CA 94103, USA © 2022 Your Company. All rights reserved.'}
      </p>
    </footer>
  );
}

export default MyFooter;
