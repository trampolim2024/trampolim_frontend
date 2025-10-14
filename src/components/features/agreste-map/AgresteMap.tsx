import React, { useRef, useState, useEffect } from 'react';
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts';
import agresteJson from '@/utils/agreste.json';
import cityData from '@/utils/city-data';
import Modal from 'react-modal';
import { MdClose } from 'react-icons/md';

interface ModalStyles {
  overlay: React.CSSProperties;
  content: React.CSSProperties;
}

interface CityData {
  name: string;
  img: string;
  [key: string]: any;
}

interface ChartClickParams {
  name: string;
  [key: string]: any;
}

Modal.setAppElement('#root');

echarts.registerMap('local', agresteJson as any);

const nameMap = Object.fromEntries(
  Object.entries(cityData).map(([key, value]) => [key, value.name])
);

const reverseNameMap = Object.fromEntries(
  Object.entries(nameMap).map(([key, value]) => [value, key])
);

const AgresteMap: React.FC = () => {
  const chartRef = useRef<ReactECharts>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState<CityData | null>(null);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getResponsiveOptions = () => {
    const isMobile = windowSize.width < 768;
    // const isTablet = windowSize.width >= 768 && windowSize.width < 1024;

    return {
      tooltip: {
        formatter: function (params: any) {
          return `<div class="bg-[#F5F5F5] text-[#3A6ABE] p-2 sm:p-3 rounded-lg border border-[#3A6ABE]/20">
                    <strong class="text-sm sm:text-base">${params.name}</strong>
                  </div>`;
        },
      },
      geo: {
        map: 'local',
        roam: isMobile ? false : true,
        zoom: isMobile ? 1.2 : 1,
        selectedMode: 'single',
        nameMap,
        emphasis: {
          label: {
            show: false,
          },
        },
        select: {
          label: false,
          itemStyle: {
            areaColor: '#F79B4B',
          },
        },
        itemStyle: {
          normal: {
            areaColor: '#3A6ABE',
            borderColor: '#F5F5F5',
            borderWidth: 1,
          },
          emphasis: {
            areaColor: '#F79B4B',
            borderWidth: 1.5,
            borderColor: '#F5F5F5'
          },
        },
      },
    };
  };

  const onChartClick = (params: ChartClickParams) => {
    const originalKey = reverseNameMap[params.name] || params.name;
    const cityInfo = cityData[originalKey];

    if (cityInfo) {
      setSelectedCity(cityInfo);
      setModalIsOpen(true);
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedCity(null);
  };

 const getModalStyles = (): ModalStyles => {
  const isMobile = windowSize.width < 768;
  const isTablet = windowSize.width >= 768 && windowSize.width < 1024;

  return {
    overlay: {
      backgroundColor: 'rgba(245, 245, 245, 0.9)',
      backdropFilter: 'blur(6px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
    },
    content: {
      position: 'relative' as const, 
      inset: 'auto',
      border: 'none',
      background: 'linear-gradient(to bottom, #F5F5F5, #F5F5F5)',
      borderRadius: '16px',
      padding: '0',
      width: isMobile ? '95%' : isTablet ? '90%' : '85%',
      maxWidth: '900px',
      maxHeight: isMobile ? '90vh' : '85vh',
      overflow: 'auto',
      boxShadow: '0 10px 25px rgba(58, 106, 190, 0.2)',
    }
  };
};

  return (
    <div className="bg-[#F5F5F5] p-4 sm:p-6 rounded-2xl">
      <div className="relative w-full h-[300px] sm:h-[500px] lg:h-[700px]">
        <ReactECharts
          ref={chartRef}
          option={getResponsiveOptions()}
          style={{ width: '100%', height: '100%' }}
          onEvents={{ click: onChartClick }}
        />
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="City Information"
        style={getModalStyles()}
      >
        {selectedCity && (
          <div className="flex flex-col h-full">
            <div className="relative h-32 sm:h-40 md:h-48 overflow-hidden">
              <img 
                src={selectedCity.img} 
                alt={selectedCity.name}
                className="w-full h-full object-cover brightness-75"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 bg-gradient-to-t from-[#3A6ABE]/90 to-transparent">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#F5F5F5]">
                  {selectedCity.name}
                </h2>
              </div>
              <button
                onClick={closeModal}
                className="absolute top-2 right-2 sm:top-4 sm:right-4 p-1 sm:p-2 rounded-full bg-[#F5F5F5]/80 hover:bg-[#F79B4B] text-[#3A6ABE] hover:text-[#F5F5F5] transition-all"
                aria-label="Close"
              >
                <MdClose className="text-xl sm:text-2xl" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 p-4 sm:p-6 md:p-8">
              <div className="space-y-4 sm:space-y-6">
                <div className="bg-[#3A6ABE]/10 p-4 sm:p-6 rounded-xl">
                  <h3 className="text-lg sm:text-xl font-semibold text-[#3A6ABE] mb-2 sm:mb-3">
                   População e Território
                  </h3>
                  <p className="text-sm sm:text-base text-[#3A6ABE]/90">Population: 250,000</p>
                  <p className="text-sm sm:text-base text-[#3A6ABE]/90">Area: 1,200 km²</p>
                </div>
                
                <div className="bg-[#F79B4B]/10 p-4 sm:p-6 rounded-xl">
                  <h3 className="text-lg sm:text-xl font-semibold text-[#F79B4B] mb-2 sm:mb-3">
                    Economia
                  </h3>
                  <p className="text-sm sm:text-base text-[#3A6ABE]/90">
                    Main industries: Agriculture, Technology
                  </p>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#3A6ABE] mb-3 sm:mb-4">
                  História da cidade
                </h3>
                <p className="text-sm sm:text-base text-[#3A6ABE]/90 leading-relaxed">
                  {selectedCity.name} is a vibrant city known for its rich culture and beautiful landscapes. 
                  The city combines modern infrastructure with preserved historical sites, offering a unique 
                  experience for visitors and residents alike.
                </p>
                <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-[#3A6ABE]/20">
                  <h4 className="text-base sm:text-lg font-semibold text-[#F79B4B] mb-2">
                    Destaques da Cidade
                  </h4>
                  <ul className="text-sm sm:text-base text-[#3A6ABE]/90 space-y-1 sm:space-y-2">
                    <li>• Annual Cultural Festival</li>
                    <li>• Historic Downtown District</li>
                    <li>• Nature Reserves</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AgresteMap;