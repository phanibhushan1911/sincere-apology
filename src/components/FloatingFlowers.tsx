
import React, { useMemo } from 'react';

const FloatingFlowers: React.FC = () => {
    // Generate flowers falling from top to bottom
    const flowers = useMemo(() => {
        const count = 15; // Number of falling flowers
        const flowerTypes = ['🌸', '🌷', '💮', '🌺'];

        return Array.from({ length: count }, (_, i) => ({
            id: i,
            left: `${Math.random() * 100}%`,
            size: 14 + Math.random() * 14,
            duration: 12 + Math.random() * 10,
            delay: Math.random() * 15,
            opacity: 0.4 + Math.random() * 0.3,
            flower: flowerTypes[Math.floor(Math.random() * flowerTypes.length)],
            swayAmount: 30 + Math.random() * 50,
        }));
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-[5]">
            {flowers.map((flower) => (
                <div
                    key={flower.id}
                    className="absolute falling-flower"
                    style={{
                        left: flower.left,
                        top: '-50px',
                        fontSize: `${flower.size}px`,
                        animationDuration: `${flower.duration}s`,
                        animationDelay: `${flower.delay}s`,
                        '--sway': `${flower.swayAmount}px`,
                        opacity: flower.opacity,
                        filter: 'drop-shadow(0 2px 4px rgba(244, 114, 182, 0.2))',
                    } as React.CSSProperties}
                >
                    {flower.flower}
                </div>
            ))}
        </div>
    );
};

export default FloatingFlowers;
