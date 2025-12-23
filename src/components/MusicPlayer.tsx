
import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Heart } from 'lucide-react';

export interface MusicPlayerRef {
  play: () => void;
  pause: () => void;
}

interface MusicPlayerProps {
  autoPlayOnMount?: boolean;
}

const MusicPlayer = forwardRef<MusicPlayerRef, MusicPlayerProps>(({ autoPlayOnMount = false }, ref) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useImperativeHandle(ref, () => ({
    play: () => {
      if (audioRef.current) {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(() => {
          // Autoplay blocked by browser
        });
      }
    },
    pause: () => {
      if (audioRef.current) {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    }
  }));

  useEffect(() => {
    if (autoPlayOnMount && audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        // Autoplay blocked by browser
      });
    }
  }, [autoPlayOnMount]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.5 }}
      className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 flex items-center gap-2 md:gap-3 glass px-3 md:px-4 py-2 rounded-full shadow-lg border border-rose-100/30"
    >
      {/* Sound wave bars - visible when playing */}
      <AnimatePresence>
        {isPlaying && (
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: 'auto' }}
            exit={{ opacity: 0, width: 0 }}
            className="flex items-center gap-[2px] h-4 overflow-hidden"
          >
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="w-[3px] bg-rose-400 rounded-full sound-bar"
                style={{
                  animationDelay: `${i * 0.1}s`,
                  height: '4px'
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col items-end">
        <span className="text-[8px] md:text-[10px] uppercase tracking-widest text-rose-400 font-accent flex items-center gap-1">
          <Heart size={8} className="fill-rose-300 text-rose-300" />
          Soft Piano
        </span>
      </div>

      <motion.button
        onClick={togglePlay}
        whileTap={{ scale: 0.9 }}
        className={`
          w-9 h-9 md:w-10 md:h-10 flex items-center justify-center 
          rounded-full transition-all duration-300 focus:outline-none
          ${isPlaying
            ? 'bg-rose-400 text-white shadow-lg shadow-rose-200'
            : 'bg-rose-50 text-rose-400 hover:bg-rose-100'
          }
        `}
        aria-label={isPlaying ? "Pause music" : "Play music"}
      >
        <AnimatePresence mode="wait">
          {isPlaying ? (
            <motion.div
              key="pause"
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 90 }}
              transition={{ duration: 0.2 }}
            >
              <Pause size={16} />
            </motion.div>
          ) : (
            <motion.div
              key="play"
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 90 }}
              transition={{ duration: 0.2 }}
              className="ml-0.5"
            >
              <Play size={16} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      <audio
        ref={audioRef}
        loop
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-17.mp3"
      />
    </motion.div>
  );
});

MusicPlayer.displayName = 'MusicPlayer';

export default MusicPlayer;
