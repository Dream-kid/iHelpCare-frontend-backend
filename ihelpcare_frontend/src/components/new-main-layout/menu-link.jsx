import { getLocale } from '@root/i18n.config';
import { Button } from 'antd';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import PropTypes from 'prop-types';
import { twMerge } from 'tailwind-merge';

function MenuLink({ label, path }) {
  const pathname = usePathname();
  const local = getLocale();

  return (
    <motion.div whileHover={{ scale: 1.05 }}>
      <Link href={path}>
        <Button
          className={twMerge(
            'nav-link',
            (path === pathname || (path !== `/${local}` && pathname?.includes(path))) &&
              'nav-link-active'
          )}
          size='large'
          type='link'
        >
          {label}
        </Button>
      </Link>
    </motion.div>
  );
}

MenuLink.propTypes = {
  label: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
};

export default MenuLink;
