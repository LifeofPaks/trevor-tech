import { motion } from "framer-motion";

const UnderlineSVG = ({ className = "" }) => {
  return (
    <motion.svg
      width="320"
      height="20"
      viewBox="0 0 320 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 1, delay: 0.3 }}
    >
      <motion.path
        d="M5 10C70 8 140 6 200 8C240 9 280 10 315 12"
        stroke="#0BA6DF"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
    </motion.svg>
  );
};

export default UnderlineSVG;
