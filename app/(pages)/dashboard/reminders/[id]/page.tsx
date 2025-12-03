import ACustomerReminder from "@/components/pages/dashboard/reminders/getACustomersReminder/ACustomerReminder";

const GetACustomresReminder = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  return (
    <section>
      <ACustomerReminder id={id} />
    </section>
  );
};

export default GetACustomresReminder;
