import ASingleCustomerReminder from "@/components/pages/dashboard/reminders/getACustomersReminder/ASingleCustomerReminder";

const ASingleCustomersReminderPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  return (
    <section>
      <ASingleCustomerReminder id={id} />
    </section>
  );
};

export default ASingleCustomersReminderPage;
