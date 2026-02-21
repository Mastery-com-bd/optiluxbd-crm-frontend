const SubCategoryDetails = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  return <div>this is subcategory details page</div>;
};

export default SubCategoryDetails;
