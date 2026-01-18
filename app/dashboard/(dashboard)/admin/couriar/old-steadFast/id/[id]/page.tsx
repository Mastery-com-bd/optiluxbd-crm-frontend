import CouriarDetails from "@/components/pages/dashboard/couriar/steadFast/couriarDetails/couriarDetails";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  return (
    <div>
      <CouriarDetails id={id} />
    </div>
  );
};

export default Page;
