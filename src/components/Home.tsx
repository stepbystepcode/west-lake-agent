import {
  TbSearch,
  TbWorld,
  TbCompass,
  TbNotebook,
  TbCalendar,
} from "react-icons/tb";
import { RiTranslateAi } from "react-icons/ri";
import { useTranslation } from "react-i18next";
import { data } from "@/data/data";
import Carousel from "./Carousel";

const ServicesSection = () => {
  const { t } = useTranslation();
  const services = [
    {
      id: 1,
      name: t('navigation'),
      icon: TbCompass,
      fromColor: "from-orange-200",
      iconColor: "text-orange-500",
    },
    {
      id: 2,
      name: t('meetings'),
      icon: TbCalendar,
      fromColor: "from-sky-200",
      iconColor: "text-sky-500",
    },
    {
      id: 3,
      name: t('tours'),
      icon: TbNotebook,
      fromColor: "from-green-200",
      iconColor: "text-green-500",
    },
    {
      id: 4,
      name: t('translation'),
      icon: RiTranslateAi,
      fromColor: "from-purple-200",
      iconColor: "text-purple-500",
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-4">
      {services.map((service) => {
        const IconComponent = service.icon;
        return (
          <div
            key={service.id}
            className={`flex flex-col items-center justify-center px-6 py-3 bg-gradient-to-b ${service.fromColor} to-transparent rounded-lg flex-1 transition-transform transform hover:scale-105 `}
          >
            <IconComponent
              className={`${service.iconColor}`}
              size={30}
              aria-label={service.name}
              title={service.name}
            />
            <span className="text-center font-medium text-sm text-gray-700 text-nowrap">
              {service.name}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export const Home = () => {
  const { i18n, t } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "zh-Hans" : "en";
    i18n.changeLanguage(newLang);
  };

  return (
    <div className="relative">
      {/* Carousel as background */}
      <div className="absolute top-0 left-0 right-0 z-0">
        <Carousel />
      </div>
      
      {/* Header with transparent background */}
      <header className="relative z-10 flex justify-between items-center p-4 bg-transparent">
        <div className="flex items-center gap-2">
          <h1 className="text-white font-bold text-lg px-3 py-1 rounded-full bg-black/30 backdrop-blur-sm shadow-sm">WEST LAKE</h1>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleLanguage}
            className="w-8 h-8 rounded-full bg-white flex items-center justify-center"
          >
            <TbWorld className="text-black" />
          </button>
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
            <TbSearch className="text-black" />
          </div>
        </div>
      </header>

      {/* Content area */}
      <div className="pt-[12.8rem]">
        <div className="bg-white rounded-t-[1.7rem] relative -mt-10 shadow-lg">
          <div className="px-4 pt-6">
            <ServicesSection />
            
            <div className="rounded-lg bg-gradient-to-b from-blue-50 to-transparent p-4 mt-5">
              {data.map((dateGroup, index) => (
                <div key={index} className="mb-3">
                  <h3 className="text-lg font-medium text-gray-800 mb-1">{dateGroup.dateName}</h3>
                  <div className="space-y-2">
                    {dateGroup.topAgendaList && dateGroup.topAgendaList.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium text-gray-600 mb-1">{t('morning_events')}</h4>
                        {dateGroup.topAgendaList.map((event, eventIndex) => (
                          <div key={eventIndex} className="bg-white p-2 rounded-lg shadow-sm mb-2">
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <h5 className="font-medium text-gray-900">{event.title}</h5>
                                <p className="text-sm text-gray-500 mt-0.5">{event.timeQuantum} | {event.site}</p>
                              </div>
                              {event.coverImgUrl && (
                                <img 
                                  src={event.coverImgUrl} 
                                  alt={event.title} 
                                  className="w-16 h-16 object-cover rounded-md ml-3"
                                />
                              )}
                            </div>
                            <p className="text-sm text-gray-600 mt-1 line-clamp-2">{event.agendaIntro}</p>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {dateGroup.downAgendaList && dateGroup.downAgendaList.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium text-gray-600 mb-1">{t('afternoon_events')}</h4>
                        {dateGroup.downAgendaList.map((event, eventIndex) => (
                          <div key={eventIndex} className="bg-white p-2 rounded-lg shadow-sm mb-2">
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <h5 className="font-medium text-gray-900">{event.title}</h5>
                                {event.timeQuantum && (
                                  <p className="text-sm text-gray-500 mt-0.5">
                                    {event.timeQuantum} {event.site && `| ${event.site}`}
                                  </p>
                                )}
                              </div>
                              {event.coverImgUrl && (
                                <img 
                                  src={event.coverImgUrl} 
                                  alt={event.title} 
                                  className="w-16 h-16 object-cover rounded-md ml-3"
                                />
                              )}
                            </div>
                            <p className="text-sm text-gray-600 mt-1 line-clamp-2">{event.agendaIntro}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
