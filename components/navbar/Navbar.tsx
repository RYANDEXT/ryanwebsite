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
        <nav className="fixed bg-black/30 flex justify-between item-center gap-16 py-3 px-10 left-1/2 translate-x-[-50%] top-5 rounded-full backdrop-blur-sm text-gray-500 shadow-lg shadow-black/50 z-10 border-gray-50/20 border">
            <ul className="flex gap-8 text-xl">
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
