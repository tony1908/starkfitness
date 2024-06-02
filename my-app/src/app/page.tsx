'use client'

import { DynamicWidget } from "../lib/dynamic";
import { MenuIcon } from "lucide-react";
import Link from 'next/link';

export default function Main() {
    return (
        <div className="w-screen h-screen flex flex-col">
            {/* Navigation */}
            <nav
                className="flex justify-between items-center p-6 border-b-2 border-black bg-white">
                <div
                    className="text-2xl font-bold text-black flex items-center">
                    <MenuIcon className="mr-2"/>
                    <h1>STARK FIT</h1>
                    <DynamicWidget
                        variant={'dropdown'}
                    />
                </div>
            </nav>

            {/* Hero Section */}
            <main
                className="flex flex-col items-center text-center p-6 flex-grow">
                <div
                    className="w-full h-64 bg-cyan-300 flex items-center justify-center">
                    <img
                        src="/image.webp"
                        alt="Diverse fitness activities"
                        className="object-cover w-full h-full"/>
                </div>
                <h1 className="text-4xl font-bold my-6 text-black">
                    Transform Your Fitness Journey
                </h1>
                <p className="text-lg mb-6 text-black">
                    Challenge yor self by staking for your goals
                </p>
                <div className="flex justify-evenly space-x-6">
                    <Link href="/challenge">
                        <button
                            className="h-12 border-black border-2 p-2.5 bg-cyan-300 hover:bg-cyan-400 hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] active:bg-cyan-200 rounded-md">
                            Challenge your self now
                        </button>
                    </Link>
                </div>
            </main>

            {/* Footer */}
            <footer
                className="flex flex-col items-center p-6 border-t-2 border-black bg-gray-50">
                <div className="flex space-x-6 mb-4">
                    <a
                        href="#!"
                        className="text-black hover:underline">
                        About
                    </a>
                    <a
                        href="#!"
                        className="text-black hover:underline">
                        Features
                    </a>
                    <a
                        href="#!"
                        className="text-black hover:underline">
                        Community
                    </a>
                    <a
                        href="#!"
                        className="text-black hover:underline">
                        Contact Us
                    </a>
                </div>
                <div className="flex space-x-6 mb-4">
                    <a
                        href="#!"
                        className="text-black hover:underline">
                        Terms of Service
                    </a>
                    <a
                        href="#!"
                        className="text-black hover:underline">
                        Privacy Policy
                    </a>
                </div>
            </footer>
        </div>
)
    ;
}
