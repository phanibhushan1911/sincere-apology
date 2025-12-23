
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { ChevronDown, Heart, MessageCircle, Clock, Sparkles, Camera } from 'lucide-react';
import { PROMISES, MISTAKE_TEXT, EMPATHY_TEXT, REASSURANCE_TEXT, CLOSING_MESSAGE } from './data';
import {
  MusicPlayer,
  MusicPlayerRef,
  PromiseCard,
  FloatingFlowers,
  AnimatedBackground,
  TypewriterText,
  ConfettiCelebration,
  PhotoModal,
} from './components';

import sushmaImage from './assets/sushma.jpg';

const App: React.FC = () => {
  const [hasConsented, setHasConsented] = useState(false);
  const [selection, setSelection] = useState<'none' | 'talk' | 'time'>('none');
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const musicPlayerRef = useRef<MusicPlayerRef>(null);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleConsent = () => {
    setHasConsented(true);
    // Start playing music when user consents (user interaction allows autoplay)
    musicPlayerRef.current?.play();
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden selection:bg-pink-100 selection:text-rose-900">
      {/* Animated Background with Gradient Orbs */}
      <AnimatedBackground />

      {/* Falling Flowers */}
      <FloatingFlowers />

      {/* Confetti Celebration */}
      <ConfettiCelebration
        isActive={showConfetti}
        onComplete={() => setShowConfetti(false)}
      />

      {/* Scroll Progress Bar */}
      <AnimatePresence>
        {hasConsented && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed top-0 left-0 right-0 h-1 bg-rose-100/30 z-[60] origin-left"
          >
            <motion.div
              style={{ scaleX }}
              className="h-full bg-gradient-to-r from-rose-300 via-pink-400 to-rose-300 origin-left"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-5 md:px-6 text-center relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-2xl relative z-10"
        >
          {/* Decorative sparkle */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="absolute -top-8 left-1/2 -translate-x-1/2"
          >
            <Sparkles size={24} className="text-rose-200" strokeWidth={1.5} />
          </motion.div>

          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-rose-300 font-accent tracking-[0.15em] md:tracking-[0.2em] uppercase text-[10px] md:text-xs mb-4 block"
          >
            A Message from My Heart
          </motion.span>

          {/* Main heading with glassmorphism card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="glass rounded-3xl p-6 md:p-10 mb-6 relative overflow-hidden"
          >
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-rose-50/30 to-pink-50/20 pointer-events-none" />

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-rose-900 mb-4 font-light italic relative z-10">
              <TypewriterText
                text="I'm sorry."
                delay={800}
                speed={120}
                onComplete={() => setShowSubtitle(true)}
              />
            </h1>

            <AnimatePresence>
              {showSubtitle && (
                <>
                  {/* Sushma's name - big and prominent */}
                  <motion.h2
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="text-5xl md:text-6xl lg:text-7xl font-script text-rose-400 mb-1 relative z-10"
                  >
                    Sushma
                  </motion.h2>
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="text-sm md:text-base text-rose-300/70 font-accent tracking-wide mb-4 block relative z-10"
                  >
                    (chuchuma 🐷)
                  </motion.span>

                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="text-base md:text-lg lg:text-xl text-gray-500 font-light max-w-md mx-auto leading-relaxed relative z-10"
                  >
                    I hurt you, and I'm truly sorry for that.
                  </motion.p>
                </>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5, duration: 1 }}
            className="mt-10 md:mt-16"
          >
            {!hasConsented && (
              <motion.button
                onClick={handleConsent}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group relative inline-flex items-center justify-center gap-2 md:gap-3 px-6 md:px-8 py-3 md:py-4 glass text-rose-800 rounded-full transition-all duration-300 text-sm tracking-wide font-medium border border-rose-100/50 pulse-gentle text-center"
              >
                <span>Do you want to hear me out?</span>
                <motion.div
                  animate={{ y: [0, 4, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                >
                  <ChevronDown size={16} />
                </motion.div>
              </motion.button>
            )}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        {hasConsented && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="w-5 h-8 md:w-6 md:h-10 rounded-full border-2 border-rose-200 flex items-start justify-center p-1"
            >
              <motion.div
                className="w-1 h-2 bg-rose-300 rounded-full"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ repeat: Infinity, duration: 2 }}
              />
            </motion.div>
          </motion.div>
        )}
      </section>

      {/* Main Content (Revealed after consent) */}
      <AnimatePresence>
        {hasConsented && (
          <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="max-w-4xl mx-auto px-5 md:px-6 pb-24 md:pb-32 space-y-20 md:space-y-32"
          >
            {/* Ownership Section */}
            <motion.section
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={sectionVariants}
              className="text-center pt-10 md:pt-20"
            >
              {/* Animated divider */}
              <div className="relative w-px h-16 md:h-24 mx-auto mb-8 md:mb-12 overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-b from-rose-200 via-pink-300 to-transparent"
                  initial={{ y: '-100%' }}
                  whileInView={{ y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </div>

              <motion.h2
                className="text-2xl md:text-3xl font-serif italic text-rose-900 mb-6 md:mb-8"
                whileInView={{ opacity: [0, 1], y: [20, 0] }}
                viewport={{ once: true }}
              >
                What I Did Wrong
              </motion.h2>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed font-light max-w-2xl mx-auto">
                {MISTAKE_TEXT}
              </p>
            </motion.section>

            {/* Empathy Section */}
            <motion.section
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={sectionVariants}
              className="glass rounded-[2rem] md:rounded-[3rem] p-6 md:p-10 lg:p-20 text-center relative overflow-hidden"
            >
              {/* Decorative corner accents */}
              <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-rose-200/50 rounded-tl-xl" />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-rose-200/50 rounded-br-xl" />

              <h2 className="text-2xl md:text-3xl font-serif italic text-rose-900 mb-6 md:mb-8">
                How You Might Have Felt
              </h2>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed font-light max-w-2xl mx-auto italic">
                "{EMPATHY_TEXT}"
              </p>
            </motion.section>

            {/* Reassurance Section */}
            <motion.section
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={sectionVariants}
              className="text-center"
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              >
                <Heart className="mx-auto text-rose-300 mb-6 fill-rose-100" strokeWidth={1.5} size={28} />
              </motion.div>
              <h2 className="text-2xl md:text-3xl font-serif italic text-rose-900 mb-6 md:mb-8">
                Why You Matter to Me
              </h2>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed font-light max-w-2xl mx-auto">
                {REASSURANCE_TEXT}
              </p>
            </motion.section>

            {/* Special Memory Section */}
            <motion.section
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={sectionVariants}
              className="text-center"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block"
              >
                <button
                  onClick={() => setShowPhotoModal(true)}
                  className="group relative px-8 py-4 glass rounded-2xl border border-rose-100/50 hover:border-rose-200 transition-all duration-300"
                >
                  <div className="flex items-center gap-3 text-rose-600">
                    <Camera size={20} className="group-hover:scale-110 transition-transform" />
                    <span className="font-accent text-sm tracking-wide">See a Special Memory</span>
                    <span className="text-lg">📸</span>
                  </div>
                  <p className="mt-2 text-xs text-gray-400 font-light">
                    A picture which you will see & smile 🌝
                  </p>
                </button>
              </motion.div>
            </motion.section>

            {/* Promise Wall */}
            <motion.section
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={sectionVariants}
            >
              <div className="text-center mb-10 md:mb-16">
                <h2 className="text-2xl md:text-3xl font-serif italic text-rose-900 mb-3 md:mb-4">
                  My Commitments to You
                </h2>
                <p className="text-gray-400 font-accent text-xs md:text-sm tracking-widest uppercase">
                  Actions Over Words
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {PROMISES.map((promise, index) => (
                  <PromiseCard key={promise.id} promise={promise} index={index} />
                ))}
              </div>
              <p className="mt-8 md:mt-12 text-center text-xs md:text-sm text-gray-400 font-light italic">
                Focusing on consistency, not perfection.
              </p>
            </motion.section>

            {/* Closing Section */}
            <motion.section
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={sectionVariants}
              className="text-center pt-12 md:pt-20 relative"
            >
              {/* Decorative line */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-rose-200 to-transparent" />

              <h2 className="text-xl md:text-2xl font-serif italic text-rose-900 mb-6 md:mb-8">
                Moving Forward
              </h2>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed font-light max-w-xl mx-auto mb-10 md:mb-16">
                {CLOSING_MESSAGE}
              </p>

              <div className="flex flex-col items-center justify-center gap-4 md:gap-6">
                <motion.button
                  onClick={() => {
                    setSelection('talk');
                    setShowConfetti(true);
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex items-center justify-center gap-2 px-8 md:px-10 py-3 md:py-4 rounded-full transition-all duration-300 w-full max-w-xs md:w-auto ${selection === 'talk'
                    ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white shadow-lg shadow-rose-200/50 scale-105'
                    : 'glass text-rose-800 border border-rose-100/50 hover:border-rose-200'
                    }`}
                >
                  <MessageCircle size={18} />
                  <span className="text-sm md:text-base">Yes, let's talk</span>
                </motion.button>

                <motion.button
                  onClick={() => setSelection('time')}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex items-center justify-center gap-2 px-8 md:px-10 py-3 md:py-4 rounded-full transition-all duration-300 w-full max-w-xs md:w-auto ${selection === 'time'
                    ? 'bg-gradient-to-r from-gray-700 to-gray-800 text-white shadow-lg shadow-gray-300/50 scale-105'
                    : 'glass text-gray-500 border border-gray-100/50 hover:border-gray-200'
                    }`}
                >
                  <Clock size={18} />
                  <span className="text-sm md:text-base">I need some time</span>
                </motion.button>
              </div>

              <AnimatePresence mode="wait">
                {selection === 'talk' && (
                  <motion.div
                    key="talk"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-10 md:mt-12 p-6 glass rounded-2xl max-w-md mx-auto"
                  >
                    <Heart className="mx-auto text-rose-400 mb-3 fill-rose-300" size={24} />
                    <p className="text-rose-600 font-accent text-sm tracking-wide">
                      Thank you, Sushma. I'm here whenever you're ready to speak.
                    </p>
                  </motion.div>
                )}
                {selection === 'time' && (
                  <motion.div
                    key="time"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-10 md:mt-12 p-6 glass rounded-2xl max-w-md mx-auto"
                  >
                    <Clock className="mx-auto text-gray-400 mb-3" size={24} />
                    <p className="text-gray-500 font-accent text-sm tracking-wide">
                      I completely respect that, Sushma. Please take all the time you need.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.section>

            <footer className="text-center pt-12 md:pt-20 pb-8">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="flex flex-col items-center gap-3"
              >
                <div className="flex items-center justify-center gap-2 text-gray-300 text-xs tracking-widest font-accent uppercase">
                  <span>With Love</span>
                  <Heart size={10} className="fill-rose-200 text-rose-200" />
                  <span>& Respect</span>
                </div>
                <p className="text-rose-400 font-serif italic text-lg">
                  — Phani Bhushan
                </p>

                {/* Eternal message */}
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  className="mt-6 text-[10px] md:text-xs text-black font-light tracking-wide max-w-xs mx-auto leading-relaxed"
                >
                  ✨ This apology will remain here as long as the internet exists on this planet ✨
                </motion.p>
              </motion.div>
            </footer>
          </motion.main>
        )}
      </AnimatePresence>

      {/* Floating Music Controller */}
      <MusicPlayer ref={musicPlayerRef} />

      {/* Photo Modal */}
      <PhotoModal
        isOpen={showPhotoModal}
        onClose={() => setShowPhotoModal(false)}
        imageSrc={sushmaImage}
        caption="Little chuchuma 🐷💕"
      />
    </div>
  );
};

export default App;
