import { Button } from "@/components/ui/button";

interface Category {
  id: string;
  name: string;
}

interface CategoryFilterProps {
  categories: Category[];
  activeCategory: string;
  setActiveCategory: (id: string) => void;
  filteredPostsCount: number;
}

export const CategoryFilter = ({
  categories,
  activeCategory,
  setActiveCategory,
  filteredPostsCount,
}: CategoryFilterProps) => {
  return (
    <div className="mb-12">
      <div className="flex flex-wrap gap-3 justify-center">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={activeCategory === category.id ? 'default' : 'outline'}
            className={`rounded-full transition-all ${
              activeCategory === category.id
                ? 'bg-[#3A6ABE] hover:bg-[#3A6ABE]/90 shadow-md'
                : 'border-[#3A6ABE]/40 text-[#3A6ABE] hover:bg-[#3A6ABE]/10 hover:border-[#3A6ABE]/60'
            }`}
            onClick={() => setActiveCategory(category.id)}
          >
            {category.name}
            {activeCategory === category.id && (
              <span className="ml-2 bg-white/20 rounded-full px-2 py-0.5 text-xs">
                {filteredPostsCount}
              </span>
            )}
          </Button>
        ))}
      </div>
    </div>
  );
};