
import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, ShieldCheck, TrendingUp } from 'lucide-react';
import { PromiseAction } from '../types';

interface PromiseCardProps {
  promise: PromiseAction;
  index?: number;
}

const PromiseCard: React.FC<PromiseCardProps> = ({ promise, index = 0 }) => {
  const getCategoryStyles = (category: string) => {
    switch (category) {
      case 'communication':
        return {
          bg: 'bg-gradient-to-br from-blue-50/60 to-sky-50/40',
          border: 'border-blue-100/50',
          text: 'text-blue-900',
          accent: 'text-blue-400',
          glow: 'hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]',
          iconBg: 'bg-blue-100/80',
          Icon: MessageSquare
        };
      case 'respect':
        return {
          bg: 'bg-gradient-to-br from-rose-50/60 to-pink-50/40',
          border: 'border-rose-100/50',
          text: 'text-rose-900',
          accent: 'text-rose-400',
          glow: 'hover:shadow-[0_0_30px_rgba(244,63,94,0.15)]',
          iconBg: 'bg-rose-100/80',
          Icon: ShieldCheck
        };
      case 'growth':
        return {
          bg: 'bg-gradient-to-br from-purple-50/60 to-violet-50/40',
          border: 'border-purple-100/50',
          text: 'text-purple-900',
          accent: 'text-purple-400',
          glow: 'hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]',
          iconBg: 'bg-purple-100/80',
          Icon: TrendingUp
        };
      default:
        return {
          bg: 'bg-gradient-to-br from-white/60 to-pink-50/40',
          border: 'border-pink-100/50',
          text: 'text-rose-800',
          accent: 'text-pink-400',
          glow: 'hover:shadow-[0_0_30px_rgba(244,114,182,0.15)]',
          iconBg: 'bg-pink-100/80',
          Icon: MessageSquare
        };
    }
  };

  const styles = getCategoryStyles(promise.category);
  const Icon = styles.Icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: "easeOut"
      }}
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.98 }}
      className={`
        ${styles.bg} ${styles.border} ${styles.glow}
        p-5 md:p-6 rounded-2xl border 
        backdrop-blur-sm
        transition-all duration-300
        group cursor-default
        relative overflow-hidden
      `}
    >
      {/* Subtle shimmer overlay on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 shimmer" />
      </div>

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-3 md:mb-4">
          <motion.div
            className={`${styles.iconBg} ${styles.accent} p-2 md:p-2.5 rounded-xl`}
            whileHover={{ rotate: [0, -10, 10, 0] }}
            transition={{ duration: 0.5 }}
          >
            <Icon size={16} className="md:w-[18px] md:h-[18px]" />
          </motion.div>
          <span className="text-[9px] md:text-[10px] uppercase tracking-wider text-gray-400 font-accent opacity-0 group-hover:opacity-100 transition-opacity">
            {promise.category}
          </span>
        </div>
        <h3 className={`text-base md:text-lg font-serif italic ${styles.text} mb-2`}>
          {promise.title}
        </h3>
        <p className="text-xs md:text-sm text-gray-600 leading-relaxed font-light">
          {promise.description}
        </p>
      </div>
    </motion.div>
  );
};

export default PromiseCard;
