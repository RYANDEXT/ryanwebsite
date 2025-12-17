import Link from "next/link";
import ProjectCards from "./ProjectCards";

export default function WorkSection() {
    return (
        <section id="work-section">
            <div className="max-w-5xl mx-auto px-4 md:px-0 space-y-8 md:py-28 pb-14">
                <div className="text-left space-y-4">
                    <div>
                        <p className="mt-8 font-medium text-lime-300 text-lg">
                            My Work
                        </p>
                        <h2 className="text-5xl">Projects</h2>
                    </div>
                </div>
                <ProjectCards />
                <Link href="https://github.com/RYANDEXT" target="_blank">
                    <div className=" h-10 max-w-48 mx-auto bg-black/30 flex justify-center items-center rounded-full border-gray-50/10 border hover:text-lime-300 transition-colors duration-300 ease-in-out mt-28">
                        See more on github
                    </div>
                </Link>
            </div>
        </section>
    );
}
