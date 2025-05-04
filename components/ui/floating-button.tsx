import { useState } from 'react';
import { Button } from './button';
import { motion } from 'framer-motion';

interface FloatingButtonProps {
  onClick: () => void;
}

export function FloatingButton({ onClick }: FloatingButtonProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: 1, 
        y: 0,
        scale: [1, 1.1, 1], // Pop animation
      }}
      transition={{ 
        duration: 0.5,
        scale: {
          repeat: Infinity,
          repeatType: "reverse",
          duration: 2,
          ease: "easeInOut"
        }
      }}
      className="fixed bottom-8 right-8 z-50"
    >
      <Button
        onClick={onClick}
        className="rounded-full px-6 py-6 shadow-lg hover:shadow-xl transition-all duration-300 bg-primary text-primary-foreground hover:bg-primary/90"
      >
        Ask Lena
      </Button>
    </motion.div>
  );
} 