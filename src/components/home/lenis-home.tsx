/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

// Declare Tawk_API on window object
declare global {
  interface Window {
    Tawk_API?: {
      showWidget: () => void;
      maximize: () => void;
      hideWidget?: () => void;
    };
    Tawk_LoadStart?: Date;
  }
}

import { ReactLenis, useLenis } from 'lenis/react';
import { motion } from 'framer-motion';
import Image from "next/image";
import { useEffect, useState } from "react";
import { ArrowDownLeft, Share2Icon, Twitter, Facebook, Linkedin, Copy, HelpCircle, Headset, ChevronDown, ArrowUpRight } from "lucide-react";
import { VelocityScroll } from '../magicui/scroll-based-velocity';
// import { creato_display, GarmondI } from '../../../fonts';
import { DarkHoverButton, InteractiveHoverButton } from '../magicui/interactive-hover-button';
import { MorphingText } from '../magicui/morphing-text';
import { Timeline } from '../ui/timeline';
import { HowItWorksSection } from '../ui/timeline-home';
import { WordRotate } from '../magicui/word-rotate';
import { Footer } from '../footer';
import { AuroraText } from '../magicui/aurora-text';
import { ModelsSection } from './models';
import SharedHeader from '../header/SharedHeader';
import TextMask from '../ui/mask';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import SignupFlow from '../signup/SignupFlow';
import SignupModal from '../signup/SignupModal';
import React, { lazy, Suspense } from 'react';
import { useContentManager } from '@/hooks/useContentManager';
import Hero2 from './hero2';

// Import the WhySourcedSection component lazily
const WhySourcedSection = lazy(() => import('./why-sourced').then(mod => ({ default: mod.WhySourcedSection })));

// Premium sticky scroll reveal animation variant
const stickyRevealVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 100, damping: 20 },
  },
};

const buttonVariants = {
  rest: { scale: 1 },
  hover: {
    scale: 1.05,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 20,
    },
  },
};

const textVariants = {
  rest: { opacity: 1, x: 0 },
  hover: { opacity: 1, x: 0 },
};

const arrowVariants = {
  rest: { opacity: 0, x: -8, y: 8, rotate: 0 },
  hover: {
    opacity: 1,
    x: 0,
    y: 0,
    rotate: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

export default function Home() {
  const [showPopup, setShowPopup] = useState(false);
  const [showShareSuccess, setShowShareSuccess] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Use content management system
  const {
    heroTitle,
    heroSubtitle,
    heroImage,
    morphingTexts,
    launchingText,
    brandName,
    howItWorksItems,
    companyItems,
    isLoading: contentLoading
  } = useContentManager();

  const handleShare = async (platform: string) => {
    const shareUrl = window.location.href;
    const shareText = "Check out Sourced - Find & Hire Top Creatives!";

    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`);
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`);
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`);
        break;
      case 'clipboard':
        await navigator.clipboard.writeText(shareUrl);
        setShowShareSuccess(true);
        setTimeout(() => setShowShareSuccess(false), 2000);
        break;
    }
  };

  // Modified Lenis scroll tracking to pause scrolling when modal is open
  const lenis = useLenis(({ scroll }) => {
    if (!modalOpen) {
      console.log("Scroll position:", scroll);
    }
  });

  React.useEffect(() => {
    if (modalOpen && lenis) {
      document.body.classList.add('modal-open');
      // Don't stop Lenis completely, just disable smooth scrolling for background
      lenis.options.smoothWheel = false;
      lenis.options.touchMultiplier = 0;
    } else if (lenis) {
      document.body.classList.remove('modal-open');
      // Restore smooth scrolling for background
      lenis.options.smoothWheel = true;
      lenis.options.touchMultiplier = 1;
    }
  }, [modalOpen, lenis]);

  const models = [
    {
      name: "James Harrison",
      image: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg",
      category: "PHOTOGRAPHER",
      year: "2025",
      studio: "PROPAGANDE STUDIO",
      technologies: "NUXT3, GSAP, PRISMIC"
    },
    {
      name: "SUI HAN",
      image: "https://xcbbarwznolppjnnyxpf.supabase.co/storage/v1/object/public/public_images//m1.png",
      category: "MODEL",
      year: "2025",
      studio: "PROPAGANDE STUDIO",
      technologies: "NUXT3, GSAP, THREEJS"
    },
    {
      name: "Kori Mato",
      image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
      category: "SOUND DESIGN",
      year: "2025",
      studio: "PROPAGANDE STUDIO",
      technologies: "REACT, THREEJS"
    },
    {
      name: "ajay seth",
      image: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg",
      category: "EXPERIMENTAL ART",
      year: "2025",
      studio: "PROPAGANDE STUDIO",
      technologies: "NUXT3, GSAP, WEBGL"
    }
  ];

  useEffect(() => {
    const checkTawk = setInterval(() => {
      if (window.Tawk_API) {
        setIsLoaded(true);
        clearInterval(checkTawk);
      }
    }, 500);
    return () => clearInterval(checkTawk);
  }, []);

  const openChat = () => {
    if (window.Tawk_API) {
      window.Tawk_API.showWidget();
      window.Tawk_API.maximize();
    }
  };

  return (
    <ReactLenis root options={{ 
      gestureOrientation: 'vertical', 
      smoothWheel: !modalOpen, 
      touchMultiplier: modalOpen ? 0 : 1,
      wheelMultiplier: modalOpen ? 0 : 1
    }}>
      <div className={`relative min-h-screen ${modalOpen ? 'pointer-events-none' : ''}`}>
        {/* Subtle texture background */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: "url('http://www.transparenttextures.com/patterns/noisy.png')",
            backgroundRepeat: "repeat",
            opacity: 0.28,
          }}
        />

        <main className={`bg-white text-black min-h-screen `} >
          <div className="max-w-screen mx-auto">

            {/* Shared Header with sticky behavior */}
            <SharedHeader 
              onChatOpen={openChat}
              isLoaded={isLoaded}
            />

            {/* Hero Section */}
            <Hero2 onModalOpenChange={setModalOpen}></Hero2>

            {/* Why Sourced Section */}
            
            <motion.section
              className="w-full py-12 pb-0"
              initial="hidden"
              whileInView="visible"
              variants={stickyRevealVariants}
              viewport={{ once: true, amount: 0.2 }}
            >
              <Suspense fallback={<div>Loading...</div>}>
                <WhySourcedSection onModalOpenChange={setModalOpen} />
              </Suspense>
            </motion.section>

            {/* Models Section */}
            {/* <motion.section
              initial="hidden"
              whileInView="visible"
              variants={stickyRevealVariants}
              viewport={{ once: true, amount: 0.2 }}
            >
              <ModelsSection models={models} />
            </motion.section> */}

            {/* How It Works */}
            {/* <motion.section
              className="flex justify-center w-full py-12"
              initial="hidden"
              whileInView="visible"
              variants={stickyRevealVariants}
              viewport={{ once: true, amount: 0.2 }}
            >
              <div className="max-w-5xl w-full">
                <HowItWorksSection />
              </div>
            </motion.section> */}

            

            {/* Join Now Drawer */}
            <motion.div
              className='flex w-full items-center justify-center gap-2'
              initial="hidden"
              whileInView="visible"
              variants={stickyRevealVariants}
              viewport={{ once: true, amount: 0.2 }}
            >
              {/* <SignupFlow onOpenChange={setModalOpen} /> */}
              
              <Drawer>
                <DrawerTrigger>
                  <div className="group relative w-auto cursor-pointer overflow-hidden rounded-full  p-2 px-6 md:px-8 py-4 text-center text-xs md:text-lg font-semibold uppercase tracking-tighter">
                    <div className="flex items-center justify-center text-center gap-2">
                      {/* <div className="h-2 w-2 rounded-full bg-white transition-all duration-300 group-hover:-translate-x-20 md:group-hover:-translate-x-10"></div> */}
                      <span className="inline-block text-center transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0 text-black">
                        <Share2Icon className="h-8 w-8"/>
                      </span>
                    </div>
                    <div className="absolute top-0 z-10 flex h-full w-full -translate-x-10 items-center justify-center gap-2 tracking-tighter text-black opacity-0 transition-all duration-700 group-hover:-translate-x-6 group-hover:opacity-100">
                      {/* <span>Share </span> */}
                      <Share2Icon className="h-8 w-8"/>
                    </div>
                  </div>
                </DrawerTrigger>
                <DrawerContent>
                  <div className="mx-auto w-full max-w-screen-md p-6">
                    <DrawerTitle className="text-center mt-4">Share Sourced</DrawerTitle>
                    <DrawerDescription className="text-center mt-2">
                      Share this platform with your network
                    </DrawerDescription>
                    <div className="flex flex-col gap-4 mt-6">
                      <button
                        onClick={() => handleShare('twitter')}
                        className="group relative w-full cursor-pointer overflow-hidden rounded-full bg-black p-2 px-6 md:px-8 py-4 text-center text-xs md:text-lg font-semibold uppercase tracking-tighter"
                      >
                        <div className="flex items-center justify-center text-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-white transition-all duration-300 group-hover:hidden md:group-hover:-translate-x-10"></div>
                          <span className="inline-block text-center transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0 text-white">
                            Share on Twitter
                          </span>
                        </div>
                        <div className="absolute top-0 z-10 flex h-full w-full -translate-x-10 items-center justify-center gap-2 tracking-tighter text-white opacity-0 transition-all duration-700 group-hover:-translate-x-6 group-hover:opacity-100">
                          <span>Twitter</span>
                          <Twitter className="h-4 w-4"/>
                        </div>
                      </button>

                      <button
                        onClick={() => handleShare('facebook')}
                        className="group relative w-full cursor-pointer overflow-hidden rounded-full bg-black p-2 px-6 md:px-8 py-4 text-center text-xs md:text-lg font-semibold uppercase tracking-tighter"
                      >
                        <div className="flex items-center justify-center text-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-white transition-all duration-300 group-hover:hidden md:group-hover:-translate-x-10"></div>
                          <span className="inline-block text-center transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0 text-white">
                            Share on Facebook
                          </span>
                        </div>
                        <div className="absolute top-0 z-10 flex h-full w-full -translate-x-10 items-center justify-center gap-2 tracking-tighter text-white opacity-0 transition-all duration-700 group-hover:-translate-x-6 group-hover:opacity-100">
                          <span>Facebook</span>
                          <Facebook className="h-4 w-4"/>
                        </div>
                      </button>

                      <button
                        onClick={() => handleShare('linkedin')}
                        className="group relative w-full cursor-pointer overflow-hidden rounded-full bg-black p-2 px-6 md:px-8 py-4 text-center text-xs md:text-lg font-semibold uppercase tracking-tighter"
                      >
                        <div className="flex items-center justify-center text-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-white transition-all duration-300 group-hover:hidden md:group-hover:-translate-x-10"></div>
                          <span className="inline-block text-center transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0 text-white">
                            Share on LinkedIn
                          </span>
                        </div>
                        <div className="absolute top-0 z-10 flex h-full w-full -translate-x-10 items-center justify-center gap-2 tracking-tighter text-white opacity-0 transition-all duration-700 group-hover:-translate-x-6 group-hover:opacity-100">
                          <span>LinkedIn</span>
                          <Linkedin className="h-4 w-4"/>
                        </div>
                      </button>

                      <button
                        onClick={() => handleShare('clipboard')}
                        className="group relative w-full cursor-pointer overflow-hidden rounded-full bg-black p-2 px-6 md:px-8 py-4 text-center text-xs md:text-lg font-semibold uppercase tracking-tighter"
                      >
                        <div className="flex items-center justify-center text-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-white transition-all duration-300 group-hover:hidden md:group-hover:-translate-x-10"></div>
                          <span className="inline-block text-center transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0 text-white">
                            Copy Link
                          </span>
                        </div>
                        <div className="absolute top-0 z-10 flex h-full w-full -translate-x-10 items-center justify-center gap-2 tracking-tighter text-white opacity-0 transition-all duration-700 group-hover:-translate-x-6 group-hover:opacity-100">
                          <span>Copy</span>
                          <Copy className="h-4 w-4"/>
                        </div>
                      </button>
                      
                      {showShareSuccess && (
                        <div className="text-center text-green-600 mt-2">
                          Link copied to clipboard!
                        </div>
                      )}
                    </div>
                  </div>
                </DrawerContent>
              </Drawer>
            </motion.div>

            {/* Footer */}
            <motion.section
              initial="hidden"
              whileInView="visible"
              variants={stickyRevealVariants}
              viewport={{ once: true, amount: 0.2 }}
            >
              <Footer />
            </motion.section>

          </div>
        </main>
      </div>
      
      {/* Signup Modal */}
      <SignupModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      
    </ReactLenis>
  );
}
