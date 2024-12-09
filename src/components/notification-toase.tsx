import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";

type Props = {
  image?: string | null;
  href: string;
  title: string;
  subtitle?: string;
};

function NotificationToast({ image, href, title, subtitle }: Props) {
  return (
    <Link
      href={href}
      className="flex items-center p-2 hover:bg-gray-100 rounded-lg"
    >
      <div className="mr-2">
        <Image
          src={image || "/images/avatar.png"}
          height={50}
          width={50}
          alt="Sender image"
          className="rounded-full"
        />
      </div>
      <div className="flex flex-col">
        <span className="font-medium text-gray-800">{title}</span>
        <span className="text-sm text-gray-600">{subtitle || "Click to view"}</span>
      </div>
    </Link>
  );
}

export const newMessageToast = (message: {
  senderImage: string | null;
  senderId: string;
  senderName: string;
  preview?: string;
}) => {
  toast(
    <NotificationToast
      image={message.senderImage}
      href={`/dashboard/chat/${message.senderId}`}
      title={`${message.senderName} sent you a message`}
      subtitle={message.preview}
    />
  );
};
