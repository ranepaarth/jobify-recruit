import Link from "next/link";

const AdminPage = async () => {
  return (
    <div className="flex flex-col w-full items-center gap-8 text-neutral-800">
      <h4 className="text-base md:text-lg font-semibold text-start w-full flex items-baseline text-neutral-500">
        Welcome Admin
      </h4>
      <div className="text-center text-nowrap">
        <h2 className="text-3xl sm:text-4xl lg:text-6xl font-extrabold text-nowrap">
          Want to hire a new candidate?
        </h2>
        <h4 className="font-semibold text-neutral-600 text-xl sm:text-2xl">
          <Link
            href={"/admin/job-categories"}
            className="px-2 text-blue-500 hover:underline"
          >
            Click here
          </Link>
          to create a new Job Post
        </h4>
      </div>
    </div>
  );
};

export default AdminPage;

{
  /* <h3 className="text-3xl font-semibold text-start w-full flex items-baseline gap-2">
<PlusCircleIcon /> Create a new job 
</h3>
<AdminJobListingForm /> */
}
