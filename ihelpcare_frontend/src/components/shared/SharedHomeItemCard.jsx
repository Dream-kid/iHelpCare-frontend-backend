import noImage from '@images/no-image.png';
import { getLocale } from '@root/i18n.config';
import Image from 'next/image';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { twMerge } from 'tailwind-merge';
import { v4 as uuid } from 'uuid';

function SharedHomeItemCard({
  title,
  image,
  imageClassName,
  url,
  isBottomTitle = false,
  noTitle = false,
  target = '_self',
  fullURL = false,
}) {
  const locale = getLocale();

  return (
    <Link
      key={uuid()}
      className='home__card-anim'
      href={fullURL ? url : `/${locale}/${url}`}
      target={target}
    >
      {!noTitle && !isBottomTitle && (
        <h2 className='text-center text-[20px] font-font-semi-bold uppercase leading-loose tracking-wider text-color-primary'>
          {title}
        </h2>
      )}

      <Image
        className={twMerge(
          imageClassName ||
            'aspect-video h-auto w-full rounded-[1px] border-[0.5px] border-solid border-color-primary object-cover'
        )}
        src={image || noImage}
        alt={title}
        title={title}
        quality={100}
      />

      {!noTitle && isBottomTitle && (
        <h2 className='mt-5 text-center text-[20px] font-font-semi-bold uppercase leading-loose tracking-wider text-color-primary'>
          {title}
        </h2>
      )}
    </Link>
  );
}

SharedHomeItemCard.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.shape({}).isRequired,
  imageClassName: PropTypes.string,
  url: PropTypes.string.isRequired,
  isBottomTitle: PropTypes.bool,
  noTitle: PropTypes.bool,
  target: PropTypes.string,
  fullURL: PropTypes.bool,
};

export default SharedHomeItemCard;
