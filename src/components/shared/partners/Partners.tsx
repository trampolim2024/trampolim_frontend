import { useEffect, useState, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';

const Partners = () => {
    const partners = [
        { id: 1, name: "Espaço Colinas de Inovação", logo: "/espacocolinas-logo.png" },
        { id: 2, name: "Sebrae PE", logo: "/sebraepe-logo.png" },
        { id: 3, name: "Comunidade Sete Colinas", logo: "/setecolinas-logo.png" },
        { id: 4, name: "Softex", logo: "/softex-logo.png" },
        { id: 5, name: "Universidade de Pernambuco", logo: "/upe-logo.png" },
    ];

    const controls = useAnimation();
    const containerRef = useRef<HTMLDivElement>(null);
    const [width, setWidth] = useState(0);
    const [isDragging, setIsDragging] = useState(false);

    const duplicatedPartners = [...partners, ...partners, ...partners];

    useEffect(() => {
        if (containerRef.current) {
            setWidth(containerRef.current.scrollWidth - containerRef.current.offsetWidth);
        }
    }, []);

    useEffect(() => {
        const autoScroll = setInterval(() => {
            if (!isDragging) {
                controls.start({
                    x: [0, -width / 3],
                    transition: { duration: 20, ease: "linear" }
                }).then(() => {
                    controls.set({ x: 0 });
                });
            }
        }, 20000);

        return () => clearInterval(autoScroll);
    }, [width, isDragging, controls]);

    return (
        <section className="relative overflow-hidden pt-12 pb-20">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white to-[#F0F4FF] z-0"></div>
            
            <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
                <div className="absolute top-[160px] left-[20%] w-[300px] h-[300px] rounded-full bg-[#3A6ABE] blur-[100px]"></div>
                <div className="absolute top-[120px] right-[20%] w-[400px] h-[400px] rounded-full bg-[#F79B4B] blur-[120px]"></div>
            </div>

            <div className="container mx-auto px-6 lg:px-8 xl:px-12 2xl:px-16 relative z-10">
                <div className="flex flex-col items-center">
                    <div className="flex flex-col items-center mb-12 md:mb-16">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#3A6ABE] text-center leading-tight">
                            Nossos Parceiros
                            <span className="block w-24 h-1 mx-auto mt-4 bg-[#F79B4B]"></span>
                        </h2>
                        <p className="text-lg md:text-xl text-[#555] mt-6 max-w-2xl text-center">
                            Conheça as organizações que tornam o Programa Trampolim possível
                        </p>
                    </div>

                    <div className="w-full overflow-hidden py-8">
                        <motion.div
                            ref={containerRef}
                            className="cursor-grab"
                            whileTap={{ cursor: "grabbing" }}
                            onMouseDown={() => setIsDragging(true)}
                            onMouseUp={() => setIsDragging(false)}
                        >
                            <motion.div
                                className="flex"
                                drag="x"
                                dragConstraints={{ right: 0, left: -width }}
                                animate={controls}
                                onDragStart={() => setIsDragging(true)}
                                onDragEnd={() => setIsDragging(false)}
                            >
                                {duplicatedPartners.map((partner, index) => (
                                    <motion.div
                                        key={`${partner.id}-${index}`}
                                        className="flex-shrink-0 px-8"
                                        whileHover={{ scale: 1.05 }}
                                    >
                                        <div className="bg-white rounded-2xl shadow-lg p-8 flex items-center justify-center h-48 w-64">
                                            <img
                                                src={partner.logo}
                                                alt={partner.name}
                                                className="max-h-24 max-w-full object-contain hover:scale-105 transition-transform duration-300"
                                            />
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </motion.div>
                    </div>

                    <div className="mt-16 text-center max-w-3xl">
                        <p className="text-lg md:text-xl text-[#555] mb-8 leading-relaxed">
                            Juntos com nossos parceiros, estamos construindo um ecossistema de inovação
                            e empreendedorismo no Agreste.
                        </p>
                        <button className="relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-[#3A6ABE] to-[#3A6ABE]/90 hover:from-[#F79B4B] hover:to-[#F79B4B]/90 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 group overflow-hidden">
                            <span className="relative z-10">Seja um parceiro</span>
                            <span className="absolute inset-0 bg-[#F79B4B] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Partners;