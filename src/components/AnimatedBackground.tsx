
import React from 'react';

const AnimatedBackground: React.FC = () => {
    return (
        <div className="fixed inset-0 -z-10 overflow-hidden">
            {/* Base gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#FFF5F5] via-[#FFFAF7] to-[#FFF0F3]" />

            {/* Animated gradient orbs */}
            <div
                className="orb orb-1 absolute w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full blur-3xl"
                style={{
                    background: 'radial-gradient(circle, rgba(251, 207, 232, 0.4) 0%, transparent 70%)',
                    top: '10%',
                    right: '-10%',
                }}
            />
            <div
                className="orb orb-2 absolute w-[250px] h-[250px] md:w-[400px] md:h-[400px] rounded-full blur-3xl"
                style={{
                    background: 'radial-gradient(circle, rgba(254, 202, 202, 0.35) 0%, transparent 70%)',
                    bottom: '20%',
                    left: '-15%',
                }}
            />
            <div
                className="orb orb-3 absolute w-[200px] h-[200px] md:w-[350px] md:h-[350px] rounded-full blur-3xl"
                style={{
                    background: 'radial-gradient(circle, rgba(221, 214, 254, 0.3) 0%, transparent 70%)',
                    top: '50%',
                    left: '30%',
                }}
            />

            {/* Subtle noise texture overlay */}
            <div
                className="absolute inset-0 opacity-[0.02]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                }}
            />
        </div>
    );
};

export default AnimatedBackground;
