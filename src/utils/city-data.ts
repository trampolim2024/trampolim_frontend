import tupanatinga from '../assets/images/city-images/tupanatinga.jpg';
import buique from '../assets/images/city-images/buique.jpg';
import bomconselho from '../assets/images/city-images/bomconselho.jpg';
import pedra from '../assets/images/city-images/pedra.jpg';
import aguasbelas from '../assets/images/city-images/aguasbelas.jpg';
import itaiba from '../assets/images/city-images/itaiba.jpg';
import iati from '../assets/images/city-images/iati.jpg';
import venturosa from '../assets/images/city-images/venturosa.jpg';
import lajedo from '../assets/images/city-images/lajedo.jpg';
import jurema from '../assets/images/city-images/jurema.jpg';
import jucati from '../assets/images/city-images/jucati.jpg';
import terezinha from '../assets/images/city-images/terezinha.jpg';
import saojoao from '../assets/images/city-images/saojoao.jpg';
import canhotinho from '../assets/images/city-images/canhotinho.jpg';
import correntes from '../assets/images/city-images/correntes.jpg';
import lagoadoouro from '../assets/images/city-images/lagoadoouro.jpg';
import paranatama from '../assets/images/city-images/paranatama.jpg';
import angelim from '../assets/images/city-images/angelim.jpg';
import palmeirina from '../assets/images/city-images/palmeirina.jpg';
import saloa from '../assets/images/city-images/saloa.jpg';
import brejao from '../assets/images/city-images/brejao.jpg';
import garanhuns from '../assets/images/city-images/garanhuns.jpg';
import caetes from '../assets/images/city-images/caetes.jpg';
import capoeiras from '../assets/images/city-images/capoeiras.jpg';
import jupi from '../assets/images/city-images/jupi.jpg';
import calcado from '../assets/images/city-images/calçado.jpg';

export interface CityInfo {
  img: string;
  name: string;
}

const cityData: Record<string, CityInfo> = {
  Tupanatinga: { img: tupanatinga, name: 'Tupanatinga' },
  Buíque: { img: buique, name: 'Buíque' },
  BomConselho: { img: bomconselho, name: 'Bom Conselho' },
  Pedra: { img: pedra, name: 'Pedra' },
  ÁguasBelas: { img: aguasbelas, name: 'Águas Belas' },
  Itaíba: { img: itaiba, name: 'Itaíba' },
  Iati: { img: iati, name: 'Iati' },
  Venturosa: { img: venturosa, name: 'Venturosa' },
  Lajedo: { img: lajedo, name: 'Lajedo' },
  Jurema: { img: jurema, name: 'Jurema' },
  Jucati: { img: jucati, name: 'Jucati' },
  Terezinha: { img: terezinha, name: 'Terezinha' },
  SaoJoao: { img: saojoao, name: 'São João' },
  Canhotinho: { img: canhotinho, name: 'Canhotinho' },
  Correntes: { img: correntes, name: 'Correntes' },
  LagoaDoOuro: { img: lagoadoouro, name: 'Lagoa do Ouro' },
  Paranatama: { img: paranatama, name: 'Paranatama' },
  Angelim: { img: angelim, name: 'Angelim' },
  Palmeirina: { img: palmeirina, name: 'Palmeirina' },
  Saloá: { img: saloa, name: 'Saloá' },
  Brejão: { img: brejao, name: 'Brejão' },
  Garanhuns: { img: garanhuns, name: 'Garanhuns' },
  Caetés: { img: caetes, name: 'Caetés' },
  Capoeiras: { img: capoeiras, name: 'Capoeiras' },
  Jupi: { img: jupi, name: 'Jupi' },
  Calçado: { img: calcado, name: 'Calçado' },
};

export default cityData;
