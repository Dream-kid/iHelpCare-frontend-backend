import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import PropTypes from 'prop-types';
import { twMerge } from 'tailwind-merge';

function FooterMenu({ label, path }) {
  const pathname = usePathname();

  return (
    <motion.div whileHover={{ scale: 1.05 }}>
      <Link
        className={twMerge(
          'font-font-montserrat text-[14px] capitalize hover:text-color-link-hover lg:text-[16px]',
          pathname === path
            ? 'font-font-bold text-color-primary-active'
            : 'font-font-semi-bold text-color-primary'
        )}
        href={path}
      >
        {label}
      </Link>
    </motion.div>
  );
}

FooterMenu.propTypes = {
  label: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
};

export default FooterMenu;
