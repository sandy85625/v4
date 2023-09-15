// components/HeroComponent.tsx
"use client"

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronRight, ChevronDown, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

const platforms = ['Instagram', 'YouTube', 'Marketing', 'TikTok', 'Podcasts', 'Advertisements'];

const HeroComponent: React.FC = () => {
    const router = useRouter()
    const [currentPlatform, setCurrentPlatform] = useState(0);
    const [loading, setLoading] = useState<boolean>(false)
    const [genloading, setGenLoading] = useState<boolean>(false)
    const [opacity, setOpacity] = useState(1);


    useEffect(() => {
        const carousel = setInterval(() => {
            setCurrentPlatform((prevPlatform) => (prevPlatform + 1) % platforms.length);
        }, 2000); // Change every 2 seconds

        return () => clearInterval(carousel);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            // Calculate the opacity based on scroll position
            const newOpacity = 1 - window.scrollY / 200; // Fade out over 200 pixels
            setOpacity(Math.max(newOpacity, 0)); // Ensure opacity doesn't go below 0
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    return (
        <div className='h-full'>
            <div className="flex flex-col md:flex-row p-6">
                {/* Image on the left */}
                <div className="relative w-full md:mr-10 md:w-1/2 h-56 md:h-96 mb-4 md:mb-0">
                    <Image src="/hero.jpg" className='rounded' alt="logo" layout="fill" objectFit="cover" />
                </div>

                {/* Content on the right */}
                <div className="md:w-1/2 flex flex-col items-center justify-center text-center md:text-left md:items-start">
                    <p className='text-sm md:text-lg mb-4 md:mb-8'>AI powered Content Idea brainstorming tool</p>
                    <h1 className="text-2xl md:text-4xl mb-2">
                        Never run out of Content Ideas for your<br /> 
                        <span className="text-blue-500">{platforms[currentPlatform]}</span> anymore!
                    </h1>

                    {/* Button Component */}
                    <div className='flex flex-col items-center justify-center md:flex-row '>
                        {/* Explore Button */}
                        <div className="flex items-center">
                            <div 
                                onClick={() => {
                                    setLoading(true)
                                    router.push('/explore')
                                }}
                                className="flex items-center text-white bg-blue-500 py-2 md:py-3 px-4 md:px-6 rounded-md transition-transform transform hover:scale-105 hover:bg-blue-600 hover:shadow-xl mt-4 cursor-pointer group"
                            >
                                {loading ? (
                                    <Loader2 className="animate-spin" />
                                ) : (
                                    <>
                                        Explore Content Ideas
                                        <ChevronRight className="w-6 h-6 ml-1 group-hover:text-white" />
                                    </>
                                )}
                            </div>
                        </div>
                        {/* Generate Button */}
                        <div className="flex items-center md:px-2">
                            <div 
                                onClick={() => {
                                    setGenLoading(true)
                                    router.push('/create')
                                }}
                                className="flex items-center text-white bg-blue-500 py-2 md:py-3 px-4 md:px-6 rounded-md transition-transform transform hover:scale-105 hover:bg-blue-600 hover:shadow-xl mt-4 cursor-pointer group"
                            >
                                {genloading ? (
                                    <Loader2 className="animate-spin" />
                                ) : (
                                    <>
                                        Try for Free
                                        <ChevronRight className="w-6 h-6 ml-1 group-hover:text-white" />
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ opacity: opacity, transition: 'opacity 0.3s' }} className='flex flex-col items-center justify-center'>
                <p className='text-sm text-gray-200'>More</p>
                <ChevronDown className="w-6 h-6 ml-1 group-hover:text-white" />
            </div>
        </div>
    );
}

export default HeroComponent;
