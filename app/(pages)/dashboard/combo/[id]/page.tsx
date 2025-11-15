import GetASingleCombo from "@/components/pages/dashboard/combo/getASingleCombo/GetASingleCombo";

const SingleComboPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  return (
    <section>
      <GetASingleCombo id={id} />
    </section>
  );
};

export default SingleComboPage;
