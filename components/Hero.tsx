"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import { useRotatingServices } from "@/lib/useRotatingServices";
import Image from "next/image";
import { useEffect, useState } from "react";

const Hero = () => {
  const { currentService, allServices } = useRotatingServices();
  const [isLoaded, setIsLoaded] = useState(false);

  // Set loaded state after component mounts to trigger animations
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background gradients with animation */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className={`absolute bottom-0 left-[-10%] h-[300px] w-[300px] rounded-full 
                    bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))] 
                    transition-all duration-1000 ease-in-out ${
                      isLoaded ? "opacity-100" : "opacity-0"
                    }`}
          style={{
            animation: isLoaded ? "pulse 8s infinite alternate" : "none",
          }}
        ></div>
        <div
          className={`absolute bottom-1/2 right-[-10%] h-[300px] w-[300px] rounded-full 
                    bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))] 
                    transition-all duration-1000 ease-in-out ${
                      isLoaded ? "opacity-100" : "opacity-0"
                    }`}
          style={{
            animation: isLoaded
              ? "pulse 10s infinite alternate-reverse"
              : "none",
            transitionDelay: "300ms",
          }}
        ></div>
      </div>

      <div className="absolute z-10 flex h-full w-full">
        {/* Left Side Content with animations */}
        <div className="flex-1 flex flex-col justify-center px-8 lg:px-16">
          <h1
            className={`text-4xl md:text-6xl text-white font-bold tracking-wider leading-tight mb-4
                      transition-all duration-700 ease-out ${
                        isLoaded
                          ? "translate-y-0 opacity-100"
                          : "translate-y-10 opacity-0"
                      }`}
          >
            YOUR ULTIMATE
            <br />
            SERVICE HUB
          </h1>

          <p
            className={`text-lg text-[#BFC6F5] tracking-wider mb-2
                      transition-all duration-700 ease-out ${
                        isLoaded
                          ? "translate-y-0 opacity-100"
                          : "translate-y-10 opacity-0"
                      }`}
            style={{ transitionDelay: "200ms" }}
          >
            {allServices.map((s) => s.name).join(" • ")}
          </p>
          <p
            className={`text-[#BFC6F5]/80 italic mb-8
                      transition-all duration-700 ease-out ${
                        isLoaded
                          ? "translate-y-0 opacity-100"
                          : "translate-y-10 opacity-0"
                      }`}
            style={{ transitionDelay: "300ms" }}
          >
            All powered by <span className="text-white/50">AI</span> to save you
            time and grow your reach
          </p>

          <div
            className={`flex flex-col sm:flex-row gap-4 mt-4
                      transition-all duration-700 ease-out ${
                        isLoaded
                          ? "translate-y-0 opacity-100"
                          : "translate-y-10 opacity-0"
                      }`}
            style={{ transitionDelay: "400ms" }}
          >
            <Link href="/partner">
              <Button
                variant="default"
                className="relative w-full sm:w-auto px-6 py-3 text-white bg-gradient-to-r 
                         from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 
                         transition-all duration-300 hover:scale-105"
                style={{
                  boxShadow: isLoaded
                    ? "0 0 15px 0 rgba(255, 0, 182, 0.3)"
                    : "none",
                  transition:
                    "all 0.3s ease-in-out, box-shadow 0.5s ease-in-out",
                }}
              >
                Partner as an Agent
              </Button>
            </Link>
            <Link href="/services">
              <Button
                variant="outline"
                className="relative w-full sm:w-auto px-6 py-3 text-white border-2 border-white/20 
                         hover:bg-white/5 hover:text-white transition-all duration-300 hover:scale-105"
              >
                Get Services Now
              </Button>
            </Link>
          </div>
        </div>

        {/* Right Side Content with animations */}
        <div className="hidden lg:flex flex-1 items-center justify-center">
          <div
            className={`relative transition-all duration-1000 ease-out 
                      ${
                        isLoaded
                          ? "translate-y-0 opacity-100"
                          : "translate-y-20 opacity-0"
                      }`}
            style={{ transitionDelay: "500ms" }}
          >
            <div className="p-8 text-center flex flex-col items-center justify-center">
              <div className="mx-auto mb-6">
                {currentService.img && (
                  <Image
                    width={100}
                    height={100}
                    src={currentService.img}
                    alt={currentService.name}
                    className="rounded-full transition-all duration-500 ease-in-out"
                    style={{
                      animation: isLoaded
                        ? "float 3s ease-in-out infinite"
                        : "none",
                      transform: isLoaded ? "scale(1)" : "scale(0.9)",
                    }}
                    priority
                  />
                )}
              </div>
              <div
                className={`text-4xl text-white/90 font-bold mb-4
                          transition-all duration-700 ease-out ${
                            isLoaded
                              ? "translate-y-0 opacity-100"
                              : "translate-y-10 opacity-0"
                          }`}
                style={{ transitionDelay: "600ms" }}
              >
                <Link
                  href="/services"
                  className="hover:text-purple-300 transition-colors duration-300"
                >
                  {currentService.name}
                </Link>
              </div>
              <p
                className={`text-[#BFC6F5]/80 text-lg
                          transition-all duration-700 ease-out ${
                            isLoaded
                              ? "translate-y-0 opacity-100"
                              : "translate-y-10 opacity-0"
                          }`}
                style={{ transitionDelay: "700ms" }}
              >
                {currentService.description}
              </p>
            </div>
            <div className="flex justify-center w-full mt-8">
              <Link href="/ar-preview" target="_blank">
                <Button
                  variant="ghost"
                  className={`bg-white/10 hover:bg-white/20 text-white rounded-full px-6 py-3 
                           flex items-center gap-2 transition-all hover:text-white duration-300 hover:scale-110
                           ${isLoaded ? "opacity-100" : "opacity-0"}`}
                  style={{
                    animation: isLoaded
                      ? "bounce 2s ease-in-out infinite"
                      : "none",
                    transitionDelay: "800ms",
                  }}
                >
                  👆 Preview stationery in your office
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Hero;
