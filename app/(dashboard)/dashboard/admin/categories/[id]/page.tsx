import React from "react";

const CategoryDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  return <div>this is category details page</div>;
};

export default CategoryDetailsPage;
