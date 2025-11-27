import Image from "next/image";
import Link from "next/link";

type ProjectCards = {
  id: number;
  title: string;
  tags: string[];
  src: string;
};

const myProject: ProjectCards[] = [
  {
    id: 1,
    title: "Ecommerce",
    tags: ["React", "TailwindCSS", "TypeScript", "Mongoose"],
    src: "/images/projects/ecommerceImage.png",
  },
];

export default function ProjectCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {myProject.map((item) => {
        return (
          <div
            className="group hover:scale-[1.02] transition duration-300 ease-in-out"
            key={item.id}
          >
            <Link
              href="http://ryanecommercereact.space"
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <div className="rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 mb-4">
                <Image
                  src="/images/projects/ecommerceImageGoods.png"
                  alt=""
                  width={1280}
                  height={1024}
                  className="w-full h-48 md:h-72 object-cover group-hover:scale-105 transition-all duration-300 brightness-70 hover:brightness-90"
                ></Image>
              </div>
            </Link>
            <div className="flex items-center px-3">
              <Link
                href="http://ryanecommercereact.space"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <div className="grow">
                  <h4 className="text-2xl font-semibold">{item.title}</h4>
                  <div className="py-1 text-sm max-w-sm overflow-hidden  mr-3 text-gray-500 flex justify-between">
                    {item.tags.map((tag) => {
                      return (
                        <div
                          className="max-w-fit mr-2 rounded-sm border border-white/10 bg-gray-400/20 text-center p-1"
                          key={tag}
                        >
                          {tag}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Link>
              <div className="flex gap-2 ml-auto">
                <Link
                  href="http://ryanecommercereact.space"
                  target="_blank"
                  aria-label="Github"
                  className="size-14 flex justify-center items-center text-gray-100 hover:text-white transition duration-300 ease-in-out border border-white/10 p-3 rounded-xl hover:bg-black/10 hover:shadow-[0px_0px_17px_rgba(187,244,81,1)] hover:border-lime-300"
                >
                  <Image
                    src="/icons/github-mark-white.svg"
                    alt="github"
                    width={20}
                    height={20}
                  ></Image>
                </Link>
                <Link
                  href="https://github.com/RYANDEXT/react_supersimpledev"
                  target="_blank"
                  aria-label="Github"
                  className="size-14 flex justify-center items-center text-gray-100 hover:text-white transition duration-300 ease-in-out border border-white/10 p-3 rounded-xl hover:bg-black/10 hover:shadow-[0px_0px_17px_rgba(187,244,81,1)] hover:border-lime-300"
                >
                  <Image
                    src="/icons/arrow-up-right-svgrepo-com.svg"
                    alt="visit"
                    width={20}
                    height={20}
                  ></Image>
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
