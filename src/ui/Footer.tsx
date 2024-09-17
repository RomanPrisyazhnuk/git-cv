import type { FC } from "react";
import Link from "next/link";
import Image from "next/image";

const Footer: FC = () => {
  return (
    <footer className="fixed bottom-0 w-full flex gap-6 bg-black-500 flex-wrap items-center justify-center p-4">
      <Link
        className="flex items-center gap-2 hover:underline hover:underline-offset-4"
        href="/RomanPrisyazhnuk"
        rel="noopener noreferrer"
      >
        <Image
          aria-hidden
          src="https://nextjs.org/icons/window.svg"
          alt="Window icon"
          width={16}
          height={16}
        />
        Example CV
      </Link>
    </footer>
  );
};
export default Footer;
