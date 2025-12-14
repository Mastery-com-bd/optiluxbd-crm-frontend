import React from "react";

const PageHeader = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div>
    
      <h1 className="text-3xl font-bold text-white mb-2">{title}</h1>
      <p className="text-[#8a8490] text-base">{description}</p>
    </div>
  );
};

export default PageHeader;
