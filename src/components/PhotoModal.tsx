
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart } from 'lucide-react';

interface PhotoModalProps {
    isOpen: boolean;
    onClose: () => void;
    imageSrc: string;
    caption?: string;
}

const PhotoModal: React.FC<PhotoModalProps> = ({ isOpen, onClose, imageSrc, caption }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        onClick={(e) => e.stopPropagation()}
                        className="relative max-w-sm w-full"
                    >
                        {/* Polaroid-style frame */}
                        <div className="bg-white p-3 pb-16 rounded-lg shadow-2xl transform rotate-[-2deg] hover:rotate-0 transition-transform duration-300">
                            {/* Close button */}
                            <button
                                onClick={onClose}
                                className="absolute -top-3 -right-3 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-400 hover:text-rose-500 transition-colors z-10"
                            >
                                <X size={18} />
                            </button>

                            {/* Photo */}
                            <div className="relative overflow-hidden rounded-sm">
                                <img
                                    src={imageSrc}
                                    alt="A special memory"
                                    className="w-full h-auto object-cover"
                                    style={{ maxHeight: '60vh' }}
                                />

                                {/* Subtle gradient overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
                            </div>

                            {/* Caption area */}
                            <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
                                <div className="flex items-center justify-center gap-2 mb-1">
                                    <Heart size={14} className="text-rose-400 fill-rose-400" />
                                </div>
                                <p className="text-gray-600 font-script text-xl">
                                    {caption || "A memory I cherish 💕"}
                                </p>
                            </div>
                        </div>

                        {/* Decorative hearts around the photo */}
                        <motion.div
                            animate={{
                                y: [0, -10, 0],
                                rotate: [0, 10, 0]
                            }}
                            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                            className="absolute -top-4 -left-4 text-2xl"
                        >
                            💕
                        </motion.div>
                        <motion.div
                            animate={{
                                y: [0, -8, 0],
                                rotate: [0, -10, 0]
                            }}
                            transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut", delay: 0.5 }}
                            className="absolute -bottom-4 -right-4 text-2xl"
                        >
                            🌸
                        </motion.div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default PhotoModal;
