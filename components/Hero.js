"use client";

import React, { useState, useEffect, useRef } from 'react';
// The import below has been removed as it is not compatible with this environment.
// import coxImage from '/public/teagarden.jpg'

const tourData = [
    {
        imageUrl: "/teagarden.jpg",
        title: "Sylhet",
        saleText: "Nature"
    },
    {
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Buddha_Dhatu_Jadi_06.jpg/1200px-Buddha_Dhatu_Jadi_06.jpg",
        title: "Bandarban",
        saleText: "Hiking"
    },
    {
        imageUrl: "https://speedholidays.com.bd/wp-content/uploads/2019/11/Coxs-Bazar-3.jpg",
        title: "Cox's Bazar",
        saleText: "Sea"
    },
    {
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8hafPnmptMQ_ifidNY_4wGeG_-RO54lZUIw&s",
        title: "Sundarbar",
        saleText: "Wild Life"
    },
    {
        imageUrl:"https://admin.expatica.com/jp/wp-content/uploads/sites/18/2023/11/tokyo-skyline-fuji.jpg",
        title: "Dhaka",
        saleText: "Pollution"
    }
];

const Hero = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [playing, setPlaying] = useState(true);
    const intervalRef = useRef(null);
    const hoverRef = useRef(false);
    const AUTO_MS = 4500;

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % tourData.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + tourData.length) % tourData.length);
    };

    useEffect(() => {
        if (!playing) return;
        intervalRef.current = setInterval(() => {
            if (!hoverRef.current) {
                setCurrentIndex((prev) => (prev + 1) % tourData.length);
            }
        }, AUTO_MS);
        return () => clearInterval(intervalRef.current);
    }, [playing]);

    return (
        <section className="w-11/12 m-auto flex flex-col items-center justify-center py-10">
            <div
                className="relative w-full rounded-xl overflow-hidden shadow-2xl bg-gradient-to-r from-[#2b6cb0] to-[#e53e3e]"
                onMouseEnter={() => (hoverRef.current = true)}
                onMouseLeave={() => (hoverRef.current = false)}
                style={{
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${tourData[currentIndex].imageUrl})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                {/* Text Content */}
                <div className="relative z-10 p-8 sm:p-12 md:p-16 lg:p-20 text-white">
                    <h1 className="font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight mb-4 text-left">
                        Book the Best Tours & River Cruises
                    </h1>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mb-4">
                        <span className="bg-white text-black text-sm font-bold px-3 py-1 rounded-full mb-2 sm:mb-0">
                            {tourData[currentIndex].title}
                        </span>
                        <p className="text-lg opacity-90 leading-relaxed">
                            {tourData[currentIndex].saleText}
                        </p>
                    </div>
                </div>

                {/* Navigation Buttons and Dots */}
                <div className="absolute top-1/2 right-4 transform -translate-y-1/2 flex items-center space-x-2 z-10">
                    <div className="flex space-x-2 mr-4 hidden sm:flex">
                        {[...Array(tourData.length)].map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`h-2 w-2 rounded-full transition-all duration-300 ${
                                    currentIndex === index ? 'bg-white w-4' : 'bg-white bg-opacity-50'
                                }`}
                            ></button>
                        ))}
                    </div>
                    <button
                        onClick={handlePrev}
                        className="p-3 bg-white bg-opacity-30 hover:bg-opacity-50 transition-all duration-300 rounded-full text-white"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button
                        onClick={handleNext}
                        className="p-3 bg-white bg-opacity-30 hover:bg-opacity-50 transition-all duration-300 rounded-full text-white"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                    <button
                        onClick={() => setPlaying((p) => !p)}
                        className="p-3 bg-white bg-opacity-30 hover:bg-opacity-50 transition-all duration-300 rounded-full text-white"
                        aria-pressed={!playing}
                        title={playing ? 'Pause autoplay' : 'Start autoplay'}
                    >
                        {playing ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M6 4h3v12H6zM11 4h3v12h-3z" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M6 4l10 6-10 6V4z" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>

            {/* Small Cards Section */}
            <div className="w-full max-w-4xl grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mt-[-4rem] z-10">
                {tourData.map((tour, index) => (
                    <div key={index} className="flex flex-col items-center">
                        <div className="relative w-full rounded-lg overflow-hidden shadow-lg">
                            <img src={tour.imageUrl} alt={tour.title} className="w-full h-auto aspect-[4/3] object-cover" />
                            <span className="absolute top-2 left-2 bg-black bg-opacity-50 text-white text-xs font-bold px-2 py-1 rounded">
                                {tour.saleText}
                            </span>
                        </div>
                        <h3 className="mt-2 text-sm font-semibold text-center">{tour.title}</h3>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Hero;
