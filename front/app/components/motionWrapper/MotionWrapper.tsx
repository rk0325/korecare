import { motion } from 'framer-motion';
import React from 'react';

interface MotionWrapperProps {
    children: React.ReactNode;
    className?: string;
}

export default function MotionWrapper({
    children,
    className = ''
}: MotionWrapperProps) {
    return (
        <motion.div
            className={className}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            {children}
        </motion.div>
    );
}