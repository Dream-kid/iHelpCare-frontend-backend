'use client';

import { AnimatePresence, motion } from 'framer-motion';
import PropTypes from 'prop-types';

function LayoutProvider({ children }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 15 }}
        transition={{ delay: 0.25 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

LayoutProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LayoutProvider;
