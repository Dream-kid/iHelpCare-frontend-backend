import Link from 'next/link';

function SharedCaptchaCopyrights() {
  return (
    <p className='font-font-poppins text-center text-[12px] font-font-normal text-[#B8B8B8] lg:text-[15px]'>
      This site is protected by reCAPTCHA and the Google
      <Link
        className='mx-2 font-font-medium text-color-txt-dark underline underline-offset-4 transition-colors duration-200 ease-in hover:text-color-primary-hover hover:underline dark:text-color-txt-light'
        href='https://policies.google.com/privacy'
        target='_blank'
      >
        Privacy Policy
      </Link>
      and
      <Link
        className='mx-2 font-font-medium text-color-txt-dark underline underline-offset-4 transition-colors duration-200 ease-in hover:text-color-primary-hover hover:underline dark:text-color-txt-light'
        href='https://policies.google.com/terms'
        target='_blank'
      >
        Terms of Service
      </Link>
      apply.
    </p>
  );
}

export default SharedCaptchaCopyrights;
