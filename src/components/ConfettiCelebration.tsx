
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ConfettiPiece {
    id: number;
    x: number;
    y: number;
    rotation: number;
    scale: number;
    color: string;
    type: 'heart' | 'circle' | 'star';
    delay: number;
}

interface ConfettiCelebrationProps {
    isActive: boolean;
    onComplete?: () => void;
}

const ConfettiCelebration: React.FC<ConfettiCelebrationProps> = ({ isActive, onComplete }) => {
    const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

    useEffect(() => {
        if (isActive) {
            const colors = [
                '#F43F5E', // rose-500
                '#FB7185', // rose-400
                '#FDA4AF', // rose-300
                '#FECDD3', // rose-200
                '#EC4899', // pink-500
                '#F472B6', // pink-400
                '#A855F7', // purple-500
                '#C084FC', // purple-400
            ];

            const types: ('heart' | 'circle' | 'star')[] = ['heart', 'heart', 'heart', 'circle', 'star'];

            const newPieces: ConfettiPiece[] = [];
            const pieceCount = 50;

            for (let i = 0; i < pieceCount; i++) {
                newPieces.push({
                    id: i,
                    x: Math.random() * 100,
                    y: -10,
                    rotation: Math.random() * 360,
                    scale: 0.5 + Math.random() * 1,
                    color: colors[Math.floor(Math.random() * colors.length)],
                    type: types[Math.floor(Math.random() * types.length)],
                    delay: Math.random() * 0.5,
                });
            }

            setPieces(newPieces);

            // Clear after animation
            const timer = setTimeout(() => {
                setPieces([]);
                onComplete?.();
            }, 4000);

            return () => clearTimeout(timer);
        }
    }, [isActive, onComplete]);

    const renderShape = (type: string, color: string) => {
        switch (type) {
            case 'heart':
                return (
                    <svg viewBox="0 0 24 24" fill={color} className="w-full h-full">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                );
            case 'star':
                return (
                    <svg viewBox="0 0 24 24" fill={color} className="w-full h-full">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                );
            default:
                return (
                    <div
                        className="w-full h-full rounded-full"
                        style={{ backgroundColor: color }}
                    />
                );
        }
    };

    return (
        <AnimatePresence>
            {pieces.length > 0 && (
                <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
                    {pieces.map((piece) => (
                        <motion.div
                            key={piece.id}
                            initial={{
                                x: `${piece.x}vw`,
                                y: '-5vh',
                                rotate: 0,
                                scale: 0,
                                opacity: 1,
                            }}
                            animate={{
                                y: '110vh',
                                rotate: piece.rotation + 720,
                                scale: piece.scale,
                                opacity: [1, 1, 1, 0],
                            }}
                            exit={{ opacity: 0 }}
                            transition={{
                                duration: 3 + Math.random() * 2,
                                delay: piece.delay,
                                ease: [0.25, 0.46, 0.45, 0.94],
                            }}
                            className="absolute"
                            style={{
                                width: `${12 + piece.scale * 8}px`,
                                height: `${12 + piece.scale * 8}px`,
                            }}
                        >
                            {renderShape(piece.type, piece.color)}
                        </motion.div>
                    ))}
                </div>
            )}
        </AnimatePresence>
    );
};

export default ConfettiCelebration;
