export const animations = {
  fadeIn: {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0 },
    transition: (delay = 0) => ({
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1],
      delay: 0.1 + (delay * 0.1)
    })
  },
  pulse: {
    animate: { opacity: [0.5, 0.8, 0.5] },
    transition: {
      duration: 3,
      repeat: Infinity,
      repeatType: "reverse" as const
    }
  },
  hover: {
    whileHover: { scale: 0.98 },
    transition: { duration: 0.3 }
  },
  rotate: {
    animate: { rotate: [0, 3, 0, -3, 0] },
    transition: {
      duration: 10,
      repeat: Infinity,
      repeatType: "reverse" as const,
      ease: "easeInOut"
    }
  },
  bounce: (direction = 'up', delay = 0) => ({
    animate: { y: direction === 'up' ? [0, -2, 0] : [0, 2, 0] },
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
      delay
    }
  })
}; 