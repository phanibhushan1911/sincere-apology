
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TypewriterTextProps {
    text: string;
    className?: string;
    delay?: number;
    speed?: number;
    onComplete?: () => void;
}

const TypewriterText: React.FC<TypewriterTextProps> = ({
    text,
    className = '',
    delay = 0,
    speed = 100,
    onComplete,
}) => {
    const [displayedText, setDisplayedText] = useState('');
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        let timeout: NodeJS.Timeout;

        const startTyping = () => {
            let currentIndex = 0;

            const typeNextChar = () => {
                if (currentIndex < text.length) {
                    setDisplayedText(text.slice(0, currentIndex + 1));
                    currentIndex++;
                    timeout = setTimeout(typeNextChar, speed);
                } else {
                    setIsComplete(true);
                    onComplete?.();
                }
            };

            typeNextChar();
        };

        const delayTimeout = setTimeout(startTyping, delay);

        return () => {
            clearTimeout(timeout);
            clearTimeout(delayTimeout);
        };
    }, [text, delay, speed, onComplete]);

    return (
        <span className={className}>
            {displayedText}
            {!isComplete && (
                <motion.span
                    className="typewriter-cursor inline-block ml-1"
                    style={{ width: '3px', height: '1em', backgroundColor: 'currentColor', verticalAlign: 'text-bottom' }}
                />
            )}
        </span>
    );
};

export default TypewriterText;
