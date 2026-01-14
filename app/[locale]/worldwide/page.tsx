'use client'
import React from 'react';
import Link from 'next/link';
import { ChevronRight } from "lucide-react";
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';

const countries = [
  {
    country: 'HEADQUARTERS AUSTRIA',
    company: 'EGLO LEUCHTEN GMBH',
    address: 'Heiligkreuz 22\nA-6136 PILL',
    phone: '+43 5242 6996 0',
    fax: '+43 5242 6996 972',
    email: 'info-austria@eglo.com',
  },
  {
    country: 'AUSTRALIA',
    company: 'EGLO LIGHTING AUSTRALIA',
    address: '5/339 Archerfield Road\nRichlands | Queensland 4077',
    phone: '+61 7 3375 1413',
    fax: '+61 7 3375 1412',
    email: 'info-australia@eglo.com',
  },
  {
    country: 'BELGIUM',
    company: 'EGLO BELGIUM BV',
    address: 'Antwerpsesteenweg 247 | B-2950 Kapellen\nVisit: Innovationpark 20 | 4906 AA OOSTERHOUT (NL)',
    phone: '+32 3 250 60 80',
    fax: '+32 3 219 80 67',
    email: 'info-belgium@eglo.com',
  },
    {
    country: 'BELGIUM',
    company: 'EGLO BELGIUM BV',
    address: 'Antwerpsesteenweg 247 | B-2950 Kapellen\nVisit: Innovationpark 20 | 4906 AA OOSTERHOUT (NL)',
    phone: '+32 3 250 60 80',
    fax: '+32 3 219 80 67',
    email: 'info-belgium@eglo.com',
  },
  {
    country: 'BOSNIA AND HERZEGOVINA',
    company: 'EGLO RASVJETA BH DOO',
    address: 'Ormanica bb\nBIH-76250 GRADACAC',
    phone: '+387 35 86 85 00',
    fax: '+387 35 82 44 41',
    email: 'info-Bosnia-Herzegovina@eglo.com',
  },
  {
    country: 'BULGARIA',
    company: 'EGLO BULGARIA EOOD',
    address: 'Main Road Burgas-Sofia | 5th kilometer\nBuilding KACHIKA | 8000 BOURGAS, Bulgaria',
    phone: '+359 56 960 403',
    fax: '+359 56 53 05 95',
    email: 'info-bulgaria@eglo.com',
  },
  {
    country: 'CANADA',
    company: 'EGLO CANADA INC.',
    address: "20700 Route Transcanadienne\nBaie D'Ufré, Quebec | H9X 4B7",
    phone: '+1 514 457 5483',
    fax: '+1 514 457 5487',
    email: 'info-canada@eglo.com',
  },
  {
    country: 'CHILE',
    company: 'EGLO CHILE ILLUMINACION LTDA.',
    address: 'Av. Américo Vespucio Norte 1930\nConchali - SANTIAGO DE CHILE',
    phone: '+562 2 595 2222',
    fax: '',
    email: 'info-chile@eglo.com',
  },
  {
    country: 'CHINA',
    company: 'DONGGUAN EGLO LIGHTING COMMERCIAL CO LTD',
    address: 'No.1 | Shangqiao Industrial Rd Shangqiao, Dongcheng\nDONGGUANCITY, GUANZHOUPROVINCE | CHINA',
    phone: '+86 769 2203 3866',
    fax: '+86 769 2203 6866',
    email: 'info-china@eglo.com',
  },
  {
    country: 'COLOMBIA',
    company: 'EGLO COLOMBIA ILUMINACION SAS',
    address: 'Autopista Norte 800 Mts Adelante del Peaje de los Andes Costado Oriental Km 19 Lot 30\nBOGOTÁ - CHIA',
    phone: '+57 (1) 744 2339',
    fax: '',
    email: 'info-colombia@eglo.com',
  },
  {
    country: 'COSTA RICA',
    company: 'EGLO Costa Rica',
    address: 'Centro Comercial Calle Real local #8\nGuachipilín de Escazú de la sucursal del BAC\nSan Jose 800 metros al norte | San Jose Costa Rica.',
    phone: '+506-2289-4690',
    fax: '+506-2100-6384',
    email: 'info-costarica@eglo.com',
  },
  {
    country: 'CROATIA',
    company: 'EGLO RASVJETA DOO',
    address: 'Jadranska avenija 9a\nHR-10000 ZAGREB',
    phone: '+385 1 379 40 62',
    fax: '+385 1 379 41 04',
    email: 'info-croatia@eglo.com',
  },
  {
    country: 'CZECH REPUBLIC',
    company: 'EGLO CZ+SK sro',
    address: 'Náchodská 2479/63\nCZ-193 00 PRAHA 9 Horní Pocernice',
    phone: '+420 281 924 163',
    fax: '+420 281 925 205',
    email: 'info-czechrepublic@eglo.com',
  },
  {
    country: 'DENMARK',
    company: 'EGLO DANMARK A/S',
    address: 'Agerbakken 20\nDK-8362 Hørning',
    phone: '+45 70 22 55 11',
    fax: '+45 70 22 55 21',
    email: 'info-denmark@eglo.com',
  },
  {
    country: 'ESTONIA',
    company: 'MOODNE VALGUSTUS AS',
    address: 'Rävalapst. 7\nEE-10143 TALLINN',
    phone: '+372 667 6670',
    fax: '+372 631 3195',
    email: 'info-global@eglo.com',
  },
  {
    country: 'FINLAND',
    company: 'EGLO FINLAND OY',
    address: 'Malminraitti 17A\n00700 Helsinki',
    phone: '+358 20 7649 820',
    fax: '+358 20 7649 821',
    email: 'info-finland@eglo.com',
  },
  {
    country: 'FRANCE',
    company: 'EGLO FRANCE LUMINAIRE SARL',
    address: 'ZA Jeune Bois | 2 Rue de la Martinique\nF-68274 WITTENHEIM',
    phone: '+33 3 89 62 50 45',
    fax: '+33 389 6250 49',
    email: 'info-france@eglo.com',
  },
  {
    country: 'GERMANY',
    company: 'EGLO LEUCHTEN HANDELS GMBH',
    address: 'Kleinbahnstr. 35\nD-59759 ARNSBERG',
    phone: '+49 2932 6269 0',
    fax: '+49 2932 6269 39',
    email: 'info-germany@eglo.com',
  },
  {
    country: 'GREAT BRITAIN & IRELAND',
    company: 'EGLO UK LTD.',
    address: 'Unit 12 Cirrus Park, Lower Farm Road, Moulton Park\nIndustrial Estate, NORTHAMPTON NN3 6UR',
    phone: '+44 1604 790 986',
    fax: '+44 1604 670 282',
    email: 'info-greatbritain@eglo.com',
  },
  {
    country: 'GREECE',
    company: 'EGLO HELLAS AE',
    address: 'Sykias 2 and parodos dekeleias\nACHARNAI, GR-13679',
    phone: '+30 210 240 77 10',
    fax: '+30 210 240 07 29',
    email: 'info-greece@eglo.com',
  },
  {
    country: 'HUNGARY - PRODUCTION & LOGISTICS',
    company: 'EGLO MAGYARORSZAG KFT.',
    address: 'Fő út. 155\nH-3060 PASZTO',
    phone: '+36 32 560 050',
    fax: '+36 32 560 040',
    email: 'info-hungary@eglo.com',
  },
  {
    country: 'INDIA',
    company: 'EGLO INDIA PRIVATE LIMITED',
    address: '137, Arjun Nagar, Kotla Mubarakpur, Bhishma Pitamah Marg,\nDelhi - 110003',
    phone: '+91 85 279 44288',
    fax: '+91 999 961 0450',
    email: 'info-india@eglo.com',
  },
  {
    country: 'ITALY',
    company: 'EGLO ITALIANA SRL',
    address: 'Via Giotto, 4\nI-31021 MOGLIANO VENETO (TV)',
    phone: '+39 041 45 66 232',
    fax: '+39 041 45 74 066',
    email: 'info-italy@eglo.com',
  },
  {
    country: 'KAZAKHSTAN',
    company: 'EGLO KAZAKHSTAN LLP',
    address: 'Office 72, 14th floor, Block 4A, Nurly-Tau Business Centr\nAl-Farabi Avenue 7, 050059 Almaty, Kazakhstan',
    phone: '+7 727 293 25 20',
    fax: '+7 701 031 00 00',
    email: 'info-kazakhstan@eglo.com',
  },
  {
    country: 'KOSOVO',
    company: 'EGLO KOSOVA LLC',
    address: '20000 PRIZREN- KOSOVO\n20000 PRIZREN- KOSOVO',
    phone: '+377 44 2166 87',
    fax: '+383 29 210 284',
    email: 'info-kosovo@eglo.com',
  },
  {
    country: 'LATVIA',
    company: 'MOODNE VALGUSTUS AS',
    address: 'Rävalapst.7\nEE-10143 TALLINN',
    phone: '+370 652 49923 | +372 667 6670',
    fax: '',
    email: 'info-latvia@eglo.com',
  },
  {
    country: 'LITHUANIA',
    company: 'MOODNE VALGUSTUS AS',
    address: 'Rävalapst.7\nEE-10143 TALLINN',
    phone: '+370 652 49923 | +372 667 6670',
    fax: '',
    email: 'info-lithuania@eglo.com',
  },
  {
    country: 'MAGYARORSZÁG – ÉRTÉKESÍTÉS',
    company: 'EGLO LUX KFT.',
    address: 'Fő út. 143/A\nH-2120 DUNAKESZI',
    phone: '+36 27 341 353',
    fax: '+36 27 341 409',
    email: 'info-hungary@eglo.com',
  },
  {
    country: 'MALAYSIA',
    company: 'EGLO ASIA SDN BHD',
    address: 'No. 13, Jalan Pelukis U1/46B, Temasya 18, Glenmarie,\n40150 Shah Alam, Selangor Darul Ehsan, Malaysia',
    phone: '+6011 1050 2336',
    fax: '+603 5567 9415',
    email: 'info-malaysia@eglo.com',
  },
  {
    country: 'MEXICO',
    company: 'EGLO MÉXICO ILUMINACIÓN S DE RL DE CV',
    address: 'Prolongación Avenida López Mateos Sur N°3561 \nFraccionamiento Los Gavilanes\nC.P. 45645 Tlajomulco de Zúñiga | Jalisco | México',
    phone: '+52 33 3687 20 95',
    fax: '',
    email: 'info-mexico@eglo.com',
  },
  {
    country: 'MIDDLE EAST',
    company: 'EGLO LIGHTING MIDDLE EAST FZE',
    address: 'P.O. BOX 262073, LOB6, OFFICE G18\nJEBEL ALI, DUBAI, UAE',
    phone: '+97 148810080',
    fax: '+97 148810081',
    email: 'gulf@eglo.com',
  },
  {
    country: 'MOROCCO - EGLO AFRICA',
    company: '',
    address: '219 Bd Med Zerktouni. Suite: 67\n20330 CASABLANCA | Morocco',
    phone: '+212 522 98 80 25 / 05',
    fax: '',
    email: 'info-global@eglo.com, info.africa@eglo.com',
  },
  {
    country: 'THE NETHERLANDS',
    company: 'EGLO VERLICHTING NEDERLAND BV',
    address: 'Innovatiepark 20\n4906 AA OOSTERHOUT (NBR)',
    phone: '+31 162 48 28 30',
    fax: '+31 162 48 28 40',
    email: 'info-nl@eglo.com',
  },
  {
    country: 'NORWAY',
    company: 'MS Belysning AS',
    address: 'Heiaveien 4\nNO-1900 FETSUND',
    phone: '+47 63 888500',
    fax: '+47 63 888501',
    email: 'info-norway@eglo.com',
  },
  {
    country: 'PERU',
    company: 'EGLO PERU SAC',
    address: 'Av Primavera 1419\nDistrito de Santiago de Surco y Departamento de Lima',
    phone: '+51 902 763 635',
    fax: '',
    email: 'info-peru@eglo.com',
  },
  {
    country: 'POLAND',
    company: 'EGLO POLSKA SP. ZOO',
    address: 'Ul. Pulawska 479\n02-844 WARSAW',
    phone: '+48 22 644 57 55',
    fax: '+48 22 644 89 82',
    email: 'info-poland@eglo.com',
  },
  {
    country: 'PORTUGAL',
    company: 'EGLO PORTUGAL ILUMINAÇÃO, LDA',
    address: 'Rua Fonte Parada, 125\nPT-4595-434 SEROA-PAÇOS DE FERREIRA',
    phone: '+351 255 890 000',
    fax: '+351 255 892 346',
    email: 'info-portugal@eglo.com',
  },
  {
    country: 'ROMANIA',
    company: 'EGLO ROMANIA PRODEXIM SRL.',
    address: 'Str. Atomistilor no. 1D\nR-077125 MAGURELE - ILFOV - ROMANIA',
    phone: '+40 314 250 902',
    fax: '+40 314 250 899',
    email: 'info-romania@eglo.com',
  },
  {
    country: 'RUSSIA',
    company: 'EGLO LIGHTING LLC',
    address: 'Varshavskoe shosse 35 | Building 1\nRU-117105 | MOSCOW',
    phone: '+7495 789 4311',
    fax: '+7495 789 4312',
    email: 'info-russia@eglo.com',
  },
  {
    country: 'SERBIA',
    company: 'EGLO RASVETA DOO',
    address: 'Stefana Prvovenčanog 28\n11000 BELGRADE | SERBIA',
    phone: '+381 11 3981 366',
    fax: '+381 11 3981 389',
    email: 'info-serbia@eglo.com',
  },
  {
    country: 'SLOVAKIA',
    company: 'EGLO CZ+SK sro',
    address: 'Náchodská 2479/63\nCZ-193 00 PRAHA 9 Horní Pocernice',
    phone: '+421 313 211 551',
    fax: '+421 313 211 556',
    email: 'info-slovakia@eglo.com',
  },
  {
    country: 'SLOVENIA',
    company: 'EGLO RASVJETA DOO',
    address: 'Jadranska avenija 9a\nHR-10000 ZAGREB',
    phone: '+386 158 093 18',
    fax: '',
    email: 'info-slovenia@eglo.com',
  },
  {
    country: 'SPAIN',
    company: 'EGLO ESPANA ILUMINACION SL',
    address: 'Avda. de Castilla 1 (Edf. Best Point) 2°-16A\nSan Fernando de Henares, E-28830 MADRID',
    phone: '+34 91 677 9044',
    fax: '+34 91 677 0304',
    email: 'info-spain@eglo.com',
  },
  {
    country: 'SWEDEN',
    company: 'EGLO SVERIGE AB',
    address: 'Star Street 1\n512 50 SVENLJUNGA',
    phone: '+46 340 623 505',
    fax: '+46 340 623 605',
    email: 'info-sweden@eglo.com',
  },
  {
    country: 'SWITZERLAND',
    company: 'EGLO SCHWEIZ AG',
    address: 'Seetalstraße 142\nCH-6032 EMMEN',
    phone: '+41 41 268 69 59',
    fax: '+41 41 268 69 58',
    email: 'info-switzerland@eglo.com',
  },
  {
    country: 'TURKEY',
    company: 'Eglo Aydınlatma ithalat İihracat Ltd. Sti.',
    address: 'Eyüp Sultan Mah. Sekmen Cad. No:18/2\n34855 SAMANDIRA, SANCAKTEPE / İSTANBUL',
    phone: '+90 216 31109 -02 /-03 / -04',
    fax: '+90 216 311 09 -05',
    email: 'info-turkey@eglo.com',
  },
  {
    country: 'UKRAINE',
    company: 'EGLO UKRAINE LTD',
    address: 'blvd. VatslavHavel 6/7A\nUA-03680 KIEV',
    phone: '+38 044 463 98 41',
    fax: '+38 044 468 84 67',
    email: 'info-ukraina@eglo.com',
  },
  {
    country: 'USA',
    company: 'EGLO USA, INC.',
    address: '30725 Solon Industrial Parkway\nSolon, OH 44139',
    phone: '+1 404 477 5601',
    fax: '+1 404 393 7053',
    email: 'info-usa@eglo.com',
  },

];

export default function WorldwidePage() {
  const t = useTranslations('worldwide');
  const params = useParams();
  const locale = params.locale as string;

  return (
    <div className="max-w-7xl mx-auto">
      {/* Breadcrumbs */}
      <div className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-500">
            <Link href={`/${locale}`} className="hover:text-teal-600 transition-colors">
              {t('breadcrumb.home')}
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900">{t('breadcrumb.worldwide')}</span>
          </nav>
        </div>
      </div>
      <h1 className="text-3xl md:text-4xl font-bold mb-4 mt-2 text-left px-4">{t('title')}</h1>
      <p className="text-lg md:text-xl text-left mb-6 px-4">{t('subtitle')}</p>
      <div className="flex justify-center mb-10">
        <div className="bg-teal-600 text-white rounded-lg shadow-md p-6 max-w-2xl w-full text-center text-base md:text-lg font-medium">
          {t('description')}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {countries.map((c, idx) => (
          <div key={idx} className="break-inside-avoid bg-white rounded-lg shadow p-4 border border-gray-100">
            <div className="font-semibold text-teal-700 mb-1 uppercase text-sm">
              {t(`countries.${c.country}`) || c.country}
            </div>
            <div className="font-medium text-gray-900 mb-1">{c.company}</div>
            <div className="text-gray-700 whitespace-pre-line mb-1">{c.address}</div>
            <div className="text-gray-700 text-sm mb-1">
              {t('labels.phone')}: <span className="font-semibold">{c.phone}</span>
              {c.fax && <> | {t('labels.fax')}: <span className="font-semibold">{c.fax}</span></>}
            </div>
            <a href={`mailto:${c.email}`} className="text-teal-600 hover:underline text-sm">{c.email}</a>
          </div>
        ))}
      </div>
    </div>
  );
}
