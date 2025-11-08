import { useMotionValue, useSpring, useTransform, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { FiCpu } from "react-icons/fi";

// HoloAccess Terminal
const HoloAccessTerminal = ({ inView }) => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const tx = useSpring(useTransform(mx, [-300, 300], [-10, 10]), {
    stiffness: 100,
    damping: 20,
  });
  const ty = useSpring(useTransform(my, [-300, 300], [-10, 10]), {
    stiffness: 100,
    damping: 20,
  });
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (inView && progress < 100) {
      const timer = setInterval(
        () => setProgress((prev) => Math.min(prev + 1.5, 100)),
        80
      );
      return () => clearInterval(timer);
    }
  }, [inView, progress]);

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    mx.set(e.clientX - r.left - r.width / 2);
    my.set(e.clientY - r.top - r.height / 2);
  };

  return (
    <motion.div
      ref={ref}
      className="relative lg:!w-[550px] lg:!h-[300px] !w-full !h-[240px] !my-12 lg:!my-0"
      style={{ x: tx, y: ty, perspective: 1000 }}
      onMouseMove={onMove}
      whileHover={{ scale: 1.05 }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-cyan-900/70 via-blue-900/60 to-teal-900/50 backdrop-blur-3xl rounded-2xl border border-teal-400/50 shadow-2xl overflow-hidden"
        animate={{ opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <div className="relative !p-6 h-full flex flex-col">
          <div className="flex items-center !gap-3 !mb-4">
            <FiCpu className="text-teal-400 !w-10 !h-10 drop-shadow-glow" />
            <span className="text-cyan-100 font-black text-xl tracking-widest">
              {t("smedia.simulation_title")}
            </span>
          </div>
          <div className="flex-1 font-mono text-sm text-cyan-200/80 overflow-hidden">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ y: [0, -20], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
              >
                &gt;{" "}
                {`Breach attempt ${Math.random()
                  .toString(36)
                  .substr(2, 5)
                  .toUpperCase()}... ${progress > 80 ? "SUCCESS" : "RUNNING"}`}
              </motion.div>
            ))}
          </div>

        </div>
      </motion.div>
    </motion.div>
  );
};

export default HoloAccessTerminal;
