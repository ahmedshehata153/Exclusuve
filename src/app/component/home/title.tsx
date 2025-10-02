export default function Title({
  sectionName1,
  sectionName2,
}: {
  sectionName1: string;
  sectionName2: string;
}) {
  return (
    <>
      <div className="mb-8">
        <h2 className="relative mb-2.5">
          <span className="h-10 w-5 rounded-sm  bg-[#DB4444] inline-block"></span>
          <span className="absolute start-8 top-1/2 -translate-y-1/2 text-[#DB4444] font-[600]">
            {sectionName1}
          </span>
        </h2>
        <h2 className="capitalize font-[600] text-3xl sm:text-4xl">
          {sectionName2}
        </h2>
      </div>
    </>
  );
}
