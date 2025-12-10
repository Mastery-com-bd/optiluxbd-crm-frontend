import { LiquidGlass } from "@/components/glassEffect/liquid-glass";


const CategoryCard = ({
  category,
}: {
  category: { id: number; name: string; image: string };
}) => {
  return (
    <LiquidGlass
      borderRadius="12px"
      shadowIntensity="xxs"
      className="max-w-[265px] p-5 cursor-pointer hover:scale-[1.02] transition-transform"
    >
      {/* Inner bordered image container */}
      <LiquidGlass
        borderRadius="12px"
        shadowIntensity="xxs"
        className="flex items-center justify-center py-2"
      >
        <img src={category.image} alt={category.name} className=" w-24 h-24 object-contain" />
      </LiquidGlass>
      {/* Category name */}
      <h3 className="text-white font-semibold text-center mt-4">
        {category.name}
      </h3>
    </LiquidGlass>
  );
};

export default CategoryCard;
