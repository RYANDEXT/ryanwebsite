import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <div className=" flex justify-between items-center max-w-5xl my-7 mx-auto">
      <div className="text-slate-500">
        © 2025 Ryan Darmawan. All rights reserved
      </div>
      <div className="max-w-50% flex justify-around gap-3">
        <Link
          href="https://www.linkedin.com/in/ryan-dwiky-darmawan-7865a4197/"
          target="_blank"
        >
          <Image
            src="/icons/footer/linkedin-svgrepo-com.svg"
            alt="linkedin"
            width={20}
            height={20}
          ></Image>
        </Link>

        <Link href="https://github.com/RYANDEXT" target="_blank">
          <Image
            src="/icons/footer/github-svgrepo-com.svg"
            alt="linkedin"
            width={20}
            height={20}
          ></Image>
        </Link>

        <Link
          href="https://mail.google.com/mail/u/0/?fs=1&to=ryandwikidermawan06@gmail.com&su=Hey+Ryan!&tf=cm"
          target="_blank"
        >
          <Image
            src="/icons/footer/email-svgrepo-com.svg"
            alt="linkedin"
            width={20}
            height={20}
          ></Image>
        </Link>

        <Link href="https://www.instagram.com/ryand.d/" target="_blank">
          <Image
            src="/icons/footer/instagram-svgrepo-com.svg"
            alt="linkedin"
            width={20}
            height={20}
          ></Image>
        </Link>
      </div>
    </div>
  );
}
