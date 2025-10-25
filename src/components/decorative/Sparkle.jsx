import { motion } from "framer-motion";

const Sparkle = ({ className = "" }) => {
  return (
    <motion.svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      initial={{ opacity: 0, rotate: 0 }}
      animate={{
        opacity: [0, 1, 0],
        rotate: [0, 180, 360],
        scale: [0.8, 1.2, 0.8],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <path
        d="M16 2L17.5 11.5L22 16L17.5 20.5L16 30L14.5 20.5L10 16L14.5 11.5L16 2Z"
        fill="currentColor"
      />
      <path
        d="M26 8L26.5 11.5L28 13L26.5 14.5L26 18L25.5 14.5L24 13L25.5 11.5L26 8Z"
        fill="currentColor"
      />
    </motion.svg>
  );
};

export default Sparkle;
