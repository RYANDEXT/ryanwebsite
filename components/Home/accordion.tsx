"use client";

import { div } from "motion/react-client";
import Image from "next/image";
import { useState } from "react";
import { Fragment } from "react";

type accordion = {
  id: number;
  title: string;
  description: string;
  iconPath: string;
};

const accordionItems: accordion[] = [
  {
    id: 1,
    title: "Strategize",
    description:
      "Definition is power. We begin by listening to your vision and defining the core objectives. Meticulous planning ensures that every subsequent step delivers measurable success.",
    iconPath: "/icons/strategy-svgrepo-com.svg",
  },
  {
    id: 2,
    title: "Wireframe",
    description:
      "Structure must precede aesthetics. We map out the user flow and content hierarchy. Building a logical foundation is key to seamless and intuitive navigation.",
    iconPath: "/icons/wireframe-svgrepo-com.svg",
  },
  {
    id: 3,
    title: "Design",
    description:
      "Experience is the final product. We transform the framework into an intuitive, high-class interface. Great design is the perfect fusion of robust function and premium visual appeal.",
    iconPath: "/icons/design-svgrepo-com.svg",
  },
  {
    id: 4,
    title: "Development",
    description:
      "Clean code is fast performance. Utilizing Next.js and TypeScript, we bring the design to life. Our focus is on speed, efficiency, and long-term technical scalability.",
    iconPath: "/icons/coding-svgrepo-com.svg",
  },
  {
    id: 5,
    title: "Quality Assurance",
    description:
      "Perfection resides in the details. We rigorously test every feature, pixel, and browser compatibility. This guarantees your website is stable, secure, and ready for flawless deployment.",
    iconPath: "/icons/quality-3-svgrepo-com.svg",
  },
];

export default function Accordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
    console.log(index);
  };

  return (
    <>
      {accordionItems.map((item, index) => {
        return (
          <button
            key={item.id}
            className={`transition duration-300 ease-in-out bg-black/10 w-full rounded-lg border mb-3 backdrop-blur-3xl shadow-lg shadow-black/50 ${
              openIndex === index ? "border-lime-300/50" : "border-white/10"
            }`}
            onClick={() => toggleAccordion(index)}
          >
            <div className="flex justify-between my-5 mx-7">
              <p>{item.id}</p>
              <div>
                <Image
                  src={item.iconPath}
                  alt={item.title}
                  width={20}
                  height={20}
                  className="inline"
                />
                <h2 className="inline"> {item.title}</h2>
              </div>
              <Image
                src="/icons/expand-up-svgrepo-com.svg"
                alt="expand-icon"
                width={20}
                height={20}
                className={`transition duration-300 ease-in-out ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              />
            </div>

            <div
              className={` overflow-hidden  transition-all duration-200 ease-in-out ${
                openIndex === index ? "max-h-40 p-4 my-5 mx-7" : "max-h-0"
              }`}
            >
              <div className="mx-3 h-1 bg-lime-300/30 rounded-xl"></div>
              <p>{item.description}</p>
            </div>
          </button>
        );
      })}
    </>
  );
}

{
  /* <Fragment key={item.id}>
            <button onClick={() => toggleAccordion(index)}>
              <div
                className={`transition-all delay-200 bg-white/10 mx-3 mt-4 text-center flex justify-between p-3 ${
                  openIndex === index ? "rounded-t-lg" : "rounded-lg"
                }`}
              >
                <p className="font-bold">{item.id} </p>
                <div>
                  <Image
                    src={item.iconPath}
                    alt={item.title}
                    width={20}
                    height={20}
                    className="inline"
                  />
                  <p className="font-bold inline">{item.title}</p>
                </div>
                <div className="w-fit h-fit bg-white rounded-full">
                  <Image
                    src="/icons/expand-up-svgrepo-com.svg"
                    alt="expand"
                    width={20}
                    height={20}
                  />
                </div>
              </div>
            </button>
            <div
              className={`overflow-hidden bg-white/10 mx-3 text-center rounded-b-lg  transition-all ease-in-out ${
                openIndex === index ? "max-h-40 p-4" : "max-h-0"
              }`}
            >
              <p>{item.description}</p>
            </div>
          </Fragment> */
}
