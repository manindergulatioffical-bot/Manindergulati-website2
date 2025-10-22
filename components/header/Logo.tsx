import Link from "next/link";
import Image from "next/image";
import { LOGO_URL } from "@/constants";

export const Logo = () => {
  return (
    <Link href="/">
      <Image src={LOGO_URL} alt="Logo" width={150} height={100} priority className="w-40 md:w-60"/>
    </Link>
  );
};