'use client';

import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

export default function Template({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        ease: 'easeInOut',
        duration: 0.75,
      }}
    >
      {children}
    </motion.div>
  );
}

Template.propTypes = {
  children: PropTypes.node.isRequired,
};
