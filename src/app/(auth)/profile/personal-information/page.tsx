import { getUserData } from "@/app/services/userApi";
import { userData } from "@/app/interfaces/user.interface";

export default async function PersonalInformation() {
  const { data }: { data: userData } = await getUserData();
  return (
    <>
      {data && (
        <section className="bg-[#DB4444] min-h-screen">
          <div className="mb-10 pt-20 px-3 md:px-0 md:flex md:justify-center">
            <h2 className="text-[13px] md:text-4xl ">Personal Information</h2>
          </div>
          <div className="flex justify-center items-center ">
            <div className=" px-3 flex flex-col w-full  items-center gap-y-5  ">
              <div className="w-full md:w-2/3 py-9 px-3 flex gap-3 flex-col md:flex-row bg-[#DB4444] shadow-2xl hover:scale-105 transition-all duration-200">
                <span className="text-[12px] md:text-[16px]">Name : </span>
                <span className="text-[12px] md:text-[16px] capitalize">
                  {data?.name}
                </span>
              </div>
              <div className=" w-full md:w-2/3 py-9 px-3 flex gap-3 flex-col md:flex-row bg-[#DB4444] shadow-2xl hover:scale-105 transition-all duration-200 ">
                <span className="text-[12px] md:text-[16px]">Email : </span>
                <span className="text-[8px] sm:text-[11px] md:text-[16px]">
                  {data?.email}
                </span>
              </div>
              <div className=" w-full md:w-2/3 py-9 px-3 flex gap-3 flex-col md:flex-row bg-[#DB4444] shadow-2xl hover:scale-105 transition-all duration-200">
                <span className="text-[12px] md:text-[16px]">Phone : </span>
                <span className="text-[12px] md:text-[16px]">
                  {data?.phone}
                </span>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
