// 服务器组件的动画配置

export const serverAnimations = {
  fadeIn: {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: {
      duration: 0.5, 
      ease: [0.4, 0, 0.2, 1], 
      delay: 0.1
    }
  },
  
  hover: {
    whileHover: { y: -2 },
    transition: { duration: 0.3 }
  },
  
  backgroundGlow: {
    initial: { opacity: 0 },
    whileHover: { opacity: 1 },
    transition: { duration: 0.3 }
  }
}; 