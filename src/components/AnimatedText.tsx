'use client';

import { useState, useEffect } from 'react';
import SpeedSlider from './SpeedSlider';

const MANTRA = '南無妙法蓮華経';

export default function AnimatedText() {
    const [speed, setSpeed] = useState(1);
    const [isAnimating, setIsAnimating] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(-1);

    useEffect(() => {
        if (!isAnimating) {
            setCurrentIndex(-1);
            return;
        }

        const interval = (speed * 1000) / (MANTRA.length - 1);
        const timer = setInterval(() => {
            setCurrentIndex(prev => {
                if (prev < MANTRA.length - 2) {
                    return prev + 1;
                }
                return -1;
            });
        }, interval);

        return () => clearInterval(timer);
    }, [isAnimating, speed]);

    const getColor = (index: number) => {
        if (currentIndex === -1) return 'text-gray-400';
        if (currentIndex === 0) {
            return index <= 1 ? 'text-red-500' : 'text-gray-400';
        }
        if (index <= currentIndex + 1) {
            return index <= 1 ? 'text-red-500' : 'text-blue-500';
        }
        return 'text-gray-400';
    };

    const handleSpeedPreset = (presetSpeed: number) => {
        setSpeed(presetSpeed);
    };

    return (
        <div className="flex flex-col items-center justify-between h-[90vh] py-8">
            <div className="flex flex-col items-center flex-grow">
                {Array.from(MANTRA).map((char, index) => (
                    <div
                        key={index}
                        className="h-[calc(70vh/7)] flex items-center justify-center"
                    >
                        <span
                            className={`text-5xl font-bold transition-colors duration-300 ${getColor(index)}`}
                        >
                            {char}
                        </span>
                    </div>
                ))}
            </div>

            <div className="flex flex-col items-center gap-4 w-full max-w-xs">
                <div className="flex justify-center gap-2 w-full">
                    <button
                        onClick={() => setIsAnimating(!isAnimating)}
                        className={`px-6 py-2 rounded-lg text-white font-bold transition-colors ${isAnimating ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'
                            }`}
                    >
                        {isAnimating ? '停止' : '開始'}
                    </button>
                </div>

                <div className="flex justify-center gap-2 w-full">
                    <button
                        onClick={() => handleSpeedPreset(1.5)}
                        className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 font-medium transition-colors"
                    >
                        1.5秒
                    </button>
                    <button
                        onClick={() => handleSpeedPreset(2)}
                        className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 font-medium transition-colors"
                    >
                        2秒
                    </button>
                </div>

                <SpeedSlider speed={speed} onChange={setSpeed} />
            </div>
        </div>
    );
}