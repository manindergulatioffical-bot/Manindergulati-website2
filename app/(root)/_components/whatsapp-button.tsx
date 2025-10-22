import Link from "next/link";
import Image from "next/image";
import { WHATSAPP_URL } from "@/constants";

function WhatsAppButton() {
  return (
    <div className="fixed bottom-4 right-4 z-100">
      <Link href={WHATSAPP_URL} target="_blank" className="cursor-pointer animate-bounce block">
        <Image
          src="/whatsapp.png"
          alt="WhatsApp"
          width={50}
          height={50}
          className="w-15 h-15 rounded-full"
        />
      </Link>
    </div>
  );
}

export default WhatsAppButton;
