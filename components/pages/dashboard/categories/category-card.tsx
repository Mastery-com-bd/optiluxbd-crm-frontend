const CategoryCard = ({
  category,
}: {
  category: { id: number; name: string; image: string };
}) => {
  return (
    <div
      className="max-w-[265px] p-5 cursor-pointer hover:scale-[1.02] transition-transform effect rounded-[12px]"
    >
      {/* Inner bordered image container */}
      <div
        className="flex items-center justify-center py-2 effect rounded-[12px] overflow-hidden bg-transparent!"
      >
        <img src={category.image} alt={category.name} className=" w-24 h-24 object-contain" />
      </div>
      {/* Category name */}
      <h3 className="text-white font-semibold text-center mt-4">
        {category.name}
      </h3>
    </div>
  );
};

export default CategoryCard;
