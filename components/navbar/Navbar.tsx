"use client";

import Link from "next/link";
import { useActiveSection } from "@/hooks/useActiveSection";

interface NavLink {
    name: string;
    href: string;
    id: string;
}

const sections: NavLink[] = [
    { name: "Home", href: "#home", id: "home" },
    { name: "Work", href: "#work-section", id: "work-section" },
    { name: "Contact", href: "#contact-section", id: "contact-section" },
];

const Navbar = () => {
    const activeSection = useActiveSection(sections.map((s) => s.id));

    return (
        <nav className="fixed bg-black/30 flex justify-between items-center gap-4 sm:gap-8 py-2 sm:py-3 px-4 sm:px-6 md:px-10 left-4 right-4 sm:left-1/2 sm:right-auto sm:translate-x-[-50%] top-5 rounded-lg sm:rounded-full backdrop-blur-sm text-gray-500 shadow-lg shadow-black/50 z-10 border-gray-50/20 border">
            <ul className="flex gap-4 sm:gap-8 text-base sm:text-xl">
                {sections.map((section) => {
                    const isActive = activeSection === section.id;

                    return (
                        <li className="relative group" key={section.id}>
                            <Link
                                href={section.href}
                                className={`transition-all duration-300 hover:font-semibold ${
                                    isActive
                                        ? "text-white font-semibold"
                                        : "text-gray-400"
                                }`}
                                aria-current={isActive ? "page" : undefined}
                            >
                                {isActive && (
                                    <span
                                        className="
                      w-2 h-2 
                      bg-green-500 
                      rounded-full 
                      inline-block 
                      mr-2
                    "
                                        aria-hidden="true"
                                    ></span>
                                )}
                                {section.name}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
};

export default Navbar;
