
import { AiOutlineSafetyCertificate } from "react-icons/ai";
import { FaUserEdit } from "react-icons/fa";
import { HiUserGroup } from "react-icons/hi2";
import { RiChatHistoryLine, RiChatPrivateLine } from "react-icons/ri";

const features = [
  {
    title: "Anonymity",
    description:
      "Secure anonymous messaging.\nNo personal detail shown.\n Just a random unique ID.",
    icon: <HiUserGroup className="h-12 w-12" />,
  },
  {
    title: "End-to-end encryption",
    description:
      "Messages are encrypted from sender to receiver.\nNo one else can read your messages.",
    icon: <RiChatPrivateLine className="h-12 w-12" />,
  },
  {
    title: "Create chat rooms",
    description:
      "Create chat rooms and invite friends to join.\n",
    icon: <HiUserGroup className="h-12 w-12" />,
  },
  {
    title: "No history",
    description:
      "No chat history is stored.\nEvery seven days chat history is cleared ",
    icon: <RiChatHistoryLine className="h-12 w-12" />,
  },
  {
    title:"Customize your profile",
    description:"Customize your profile with a unique username and profile picture (optional)",
    icon:<FaUserEdit className="h-12 w-12" />
  },
  {
    title:"Truly anonymous",
    description:"No form of tracking,no last seen or online status. Truly anonymous",
    icon:<AiOutlineSafetyCertificate className="h-12 w-12" />
  }
];

export default function Features() {
  return (
    <>
      <div
        id="features"
        className="flex flex-col items-center text-center justify-center lg:p-20 p-10 gap-5"
      >
        <div className="z-10">
          <h3 className="text-2xl text-[#EBD3F8]">
            What can you do with Anonyline?
          </h3>
        </div>
        <div className="grid lg:grid-cols-3 md:grid-cols-3 grid-cols-1 z-10">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
            />
          ))}
        </div>
      </div>
    </>
  );
}

function FeatureCard({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <>
      <div
        className="bg-gradient-to-br from-[#7A1CAC] to-[#AD49E1] hover:from-[#AD49E1]/30 hover:to-[#7A1CAC]/30 h-52 w-60 rounded-md p-2 flex flex-col gap-2 items-center text-center md:border-r-0 
                md:p-4
                md:[&:not(:last-child)]:border-r 
                md:[&:nth-child(3n)]:border-r-0
                border-b last:border-b-0"
      >
        {icon}
        <h3 className="text-xl text-[#EBD3F8]">{title}</h3>
        <p className="text-[#E9FFFF] text-sm">{description}</p>
      </div>
    </>
  );
}
