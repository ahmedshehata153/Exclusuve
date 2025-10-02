import { getUserData } from "@/app/services/userApi";
import { userData } from "@/app/interfaces/user.interface";
import { User, Settings } from "lucide-react";
import userPic from "@/assessts/image/149071.png";
import Image from "next/image";
import Link from "next/link";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data }: { data: userData } = await getUserData();
  // Menu items.
  const items = [
    {
      title: "Personal Information",
      url: "/profile/personal-information",
      icon: User,
    },
    {
      title: "Settings",
      url: "/profile/changepassword",
      icon: Settings,
    },
  ];
  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4">
        <div className="col-span-1 min-h-screen px-4 py-3 bg-gray-950 text-[#DB4444]">
          <div>
            <div>
              <div className="flex flex-col items-center gap-y-3  mt-6">
                <Image
                  src={userPic.src}
                  alt=""
                  width={90}
                  height={90}
                  className="w-[90px] h-[90px]"
                />
                <h2 className="text-[10px] md:text-16">{data.email}</h2>
              </div>
              <div>
                <div>
                  <div>
                    {items.map((item) => (
                      <div key={item.title} className="mt-7">
                        <Link
                          href={item.url}
                          className="flex gap-2 mb-4 py-4 px-2 hover:bg-[#DB4444] hover:text-gray-950 hover:rounded-2xl transition-all duration-150"
                        >
                          <item.icon />
                          <span className="text-[13px] sm:text-[16px]">
                            {item.title}
                          </span>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-1 md:col-span-3  ">{children}</div>
      </div>
    </>
  );
}
