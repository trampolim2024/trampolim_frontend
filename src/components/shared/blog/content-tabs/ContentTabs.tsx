interface ContentTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const ContentTabs = ({ activeTab, setActiveTab }: ContentTabsProps) => {
  return (
    <div className="mb-8 border-b border-[#3A6ABE]/20">
      <div className="flex space-x-4">
        <button
          onClick={() => setActiveTab('posts')}
          className={`pb-3 px-1 font-medium text-lg relative ${
            activeTab === 'posts' ? 'text-[#3A6ABE]' : 'text-[#3A6ABE]/70 hover:text-[#3A6ABE]'
          }`}
        >
          Todos os Artigos
          {activeTab === 'posts' && (
            <span className="absolute bottom-0 left-0 w-full h-1 bg-[#F79B4B] rounded-t"></span>
          )}
        </button>
        <button
          onClick={() => setActiveTab('saved')}
          className={`pb-3 px-1 font-medium text-lg relative ${
            activeTab === 'saved' ? 'text-[#3A6ABE]' : 'text-[#3A6ABE]/70 hover:text-[#3A6ABE]'
          }`}
        >
          Salvos
          {activeTab === 'saved' && (
            <span className="absolute bottom-0 left-0 w-full h-1 bg-[#F79B4B] rounded-t"></span>
          )}
        </button>
      </div>
    </div>
  );
};