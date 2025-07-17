import type { ReactNode } from 'react';

interface SectionPlaceholderProps {
  icon: ReactNode;
  title: string;
  description?: string;
}

export const SectionPlaceholder = ({ icon, title, description = 'Seção em desenvolvimento' }: SectionPlaceholderProps) => {
  return (
    <div className="flex flex-col items-center justify-center h-96 rounded-lg bg-white border border-gray-200">
      <div className="text-[#3A6ABE] text-5xl mb-4">
        {icon}
      </div>
      <h2 className="text-2xl font-bold text-[#3A6ABE] mb-2">
        {title}
      </h2>
      <p className="text-[#3A6ABE]/80">{description}</p>
    </div>
  );
};