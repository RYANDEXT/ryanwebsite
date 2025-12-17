import LogoLoop from "../reactbits/LogoLoop";
import LetterGlitch from "../reactbits/LetterGlitch";
import Accordion from "./accordion";
import Link from "next/link";

const imageLogos = [
    { src: "/icons/bash-icon-svgrepo-com.svg", alt: "Bash" },
    { src: "/icons/css-3-svgrepo-com.svg", alt: "CSS3" },
    { src: "/icons/git-svgrepo-com-diamond-bg.svg", alt: "Git" },
    { src: "/icons/html-5-svgrepo-com.svg", alt: "HTML5" },
    { src: "/icons/javascript-svgrepo-com.svg", alt: "JavaScript" },
    { src: "/icons/nextjs-fill-svgrepo-com-circle.svg", alt: "Next.js" },
    { src: "/icons/react-svgrepo-com.svg", alt: "React" },
    { src: "/icons/tailwindcss-icon-svgrepo-com.svg", alt: "Tailwind CSS" },
    { src: "/icons/typescript-official-svgrepo-com.svg", alt: "TypeScript" },
    { src: "/icons/redux-svgrepo-com.svg", alt: "Redux" },
];

export default function HomeSection1() {
    return (
        <>
            <section id="home">
                <div className="max-w-5xl mx-auto space-y-8 pt-28 md:py-36 pb-14">
                    <div className="text-center md:text-left space-y-4">
                        <p className="text-md md:text-lg text-gray-400">
                            Hi I&apos;m Ryan Darmawan
                        </p>
                        <div className="flex flex-col lg:flex-row items-center md:items-start space-y-4 lg:space-y-0 lg:space-x-8 md:gap-4">
                            <h1 className="text-5xl md:text-6xl font-medium text-pretty leading-none text-center md:text-left">
                                <span className="text-lime-300">Software</span>{" "}
                                <br />
                                Developer
                            </h1>
                            <p className="text-2xl text-center md:text-left">
                                Transforming ideas into interactive and seamless
                                digital experiences with cutting-edge frontend
                                development.
                            </p>
                        </div>
                        <div className="flex justify-center md:justify-start gap-2 pt-3 md:pt-6">
                            <Link
                                href="https://github.com/RYANDEXT"
                                target="_blank"
                                aria-label="github"
                                className="hover:text-white transition duration-200 ease-in-out border border-white p-3 rounded-xl hover:shadow-[0px_0px_17px_rgba(187,244,81,1)] hover:border-lime-300"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="size-8"
                                >
                                    {" "}
                                    <path d="M12.001 2C6.47598 2 2.00098 6.475 2.00098 12C2.00098 16.425 4.86348 20.1625 8.83848 21.4875C9.33848 21.575 9.52598 21.275 9.52598 21.0125C9.52598 20.775 9.51348 19.9875 9.51348 19.15C7.00098 19.6125 6.35098 18.5375 6.15098 17.975C6.03848 17.6875 5.55098 16.8 5.12598 16.5625C4.77598 16.375 4.27598 15.9125 5.11348 15.9C5.90098 15.8875 6.46348 16.625 6.65098 16.925C7.55098 18.4375 8.98848 18.0125 9.56348 17.75C9.65098 17.1 9.91348 16.6625 10.201 16.4125C7.97598 16.1625 5.65098 15.3 5.65098 11.475C5.65098 10.3875 6.03848 9.4875 6.67598 8.7875C6.57598 8.5375 6.22598 7.5125 6.77598 6.1375C6.77598 6.1375 7.61348 5.875 9.52598 7.1625C10.326 6.9375 11.176 6.825 12.026 6.825C12.876 6.825 13.726 6.9375 14.526 7.1625C16.4385 5.8625 17.276 6.1375 17.276 6.1375C17.826 7.5125 17.476 8.5375 17.376 8.7875C18.0135 9.4875 18.401 10.375 18.401 11.475C18.401 15.3125 16.0635 16.1625 13.8385 16.4125C14.201 16.725 14.5135 17.325 14.5135 18.2625C14.5135 19.6 14.501 20.675 14.501 21.0125C14.501 21.275 14.6885 21.5875 15.1885 21.4875C19.259 20.1133 21.9999 16.2963 22.001 12C22.001 6.475 17.526 2 12.001 2Z"></path>{" "}
                                </svg>
                            </Link>
                            <Link
                                href="https://github.com/RYANDEXT"
                                target="_blank"
                                aria-label="github"
                                className="hover:text-white transition duration-200 ease-in-out border border-white p-3 rounded-xl hover:shadow-[0px_0px_17px_rgba(187,244,81,1)] hover:border-lime-300"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="size-8"
                                >
                                    {" "}
                                    <path d="M18.3362 18.339H15.6707V14.1622C15.6707 13.1662 15.6505 11.8845 14.2817 11.8845C12.892 11.8845 12.6797 12.9683 12.6797 14.0887V18.339H10.0142V9.75H12.5747V10.9207H12.6092C12.967 10.2457 13.837 9.53325 15.1367 9.53325C17.8375 9.53325 18.337 11.3108 18.337 13.6245V18.339H18.3362ZM7.00373 8.57475C6.14573 8.57475 5.45648 7.88025 5.45648 7.026C5.45648 6.1725 6.14648 5.47875 7.00373 5.47875C7.85873 5.47875 8.55173 6.1725 8.55173 7.026C8.55173 7.88025 7.85798 8.57475 7.00373 8.57475ZM8.34023 18.339H5.66723V9.75H8.34023V18.339ZM19.6697 3H4.32923C3.59498 3 3.00098 3.5805 3.00098 4.29675V19.7033C3.00098 20.4202 3.59498 21 4.32923 21H19.6675C20.401 21 21.001 20.4202 21.001 19.7033V4.29675C21.001 3.5805 20.401 3 19.6675 3H19.6697Z"></path>{" "}
                                </svg>
                            </Link>
                            <Link
                                href="https://mail.google.com/mail/u/0/?fs=1&to=ryandwikidermawan06@gmail.com&su=Hey+Ryan!&tf=cm"
                                target="_blank"
                                aria-label="github"
                                className="hover:text-white transition duration-200 ease-in-out border border-white p-3 rounded-xl hover:shadow-[0px_0px_17px_rgba(187,244,81,1)] hover:border-lime-300"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="2.1em"
                                    height="2.1em"
                                    viewBox="0 0 24 24"
                                >
                                    {" "}
                                    <path
                                        fill="currentColor"
                                        d="m18.73 5.41l-1.28 1L12 10.46L6.55 6.37l-1.28-1A2 2 0 0 0 2 7.05v11.59A1.36 1.36 0 0 0 3.36 20h3.19v-7.72L12 16.37l5.45-4.09V20h3.19A1.36 1.36 0 0 0 22 18.64V7.05a2 2 0 0 0-3.27-1.64"
                                    ></path>{" "}
                                </svg>
                            </Link>
                        </div>
                        <div className="mx-auto mt-10">
                            <div
                                style={{
                                    position: "relative",
                                    overflow: "hidden",
                                }}
                            >
                                {/* Basic horizontal loop */}
                                <LogoLoop
                                    logos={imageLogos}
                                    speed={60}
                                    direction="left"
                                    logoHeight={48}
                                    gap={40}
                                    hoverSpeed={3}
                                    showLabel={true}
                                    scrambleRadius={40}
                                    scaleOnHover
                                    fadeOut
                                    fadeOutColor="#030712"
                                    ariaLabel="Technology partners"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="text-center md:text-right mt-28 px-4 md:px-0">
                        <p className="mt-8 font-medium text-lime-300 text-lg ">
                            Approach and Implementation
                        </p>
                        <h2 className="font-semibold text-4xl text-pretty mb-8">
                            My Web Development Process
                        </h2>

                        <div className="flex flex-col md:flex-row gap-6 md:gap-4 text-center md:text-left">
                            <div className="flex-3 max-h-fit flex justify-center md:justify-start">
                                <LetterGlitch
                                    glitchColors={[
                                        "#2b4539",
                                        "#61dca3",
                                        "#61b3dc",
                                    ]}
                                    glitchSpeed={50}
                                    centerVignette={true}
                                    outerVignette={true}
                                    smooth={true}
                                    characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$&*()-_+=/[]{};:<>.,0123456789"
                                />
                            </div>
                            <div className="flex-3 flex flex-col justify-evenly min-h-full flex-wrap md:ml-3 ml-0 items-center md:items-start">
                                <Accordion />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
