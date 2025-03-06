export default function Loading() {
  return (
    <div className="h-screen px-5 overflow-auto w-full bg-[#313338] flex flex-col items-center">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-24 w-full">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex flex-col lg:h-80 md:h-80 h-72">
            <div className="w-full h-full bg-[#2B2D31] rounded-lg animate-pulse mb-4" />
            <div className="flex flex-col gap-2 bg-[#2B2D31] rounded-lg p-5">
              <div className="h-8 w-3/4 bg-[#404249] rounded animate-pulse" />
              <div className="h-4 w-full bg-[#404249] rounded animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}