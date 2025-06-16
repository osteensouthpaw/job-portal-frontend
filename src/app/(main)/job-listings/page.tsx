import JobListings from "./_components/JobListings";
import JobListingsFilter from "./_components/JobListingsFilter";

interface Props {
  searchParams: Promise<Record<string, string>>;
}

const HomePage = async ({ searchParams }: Props) => {
  return (
    <div className="md:grid grid-cols-3 gap-8">
      <div
        className=" md:sticky top-20 self-start md:h-[calc(100vh-5rem)] overflow-auto [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:rounded-full
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:rounded-full
  [&::-webkit-scrollbar-thumb]:bg-gray-300
  dark:[&::-webkit-scrollbar-track]:bg-neutral-700
  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
      >
        <JobListingsFilter />
      </div>

      <div className="col-span-2 col-start-2 overflow-auto">
        <JobListings searchParams={searchParams} />
      </div>
    </div>
  );
};

export default HomePage;
