import {
  TbSearch,
  TbWorld,
  TbCoffee,
  TbBuildingSkyscraper,
  TbSettings,
  TbDeviceGamepad2,
} from "react-icons/tb";
import { useTranslation } from "react-i18next";
import { Input } from "@/components/ui/input";
const ServicesSection = () => {
  const services = [
    {
      id: 1,
      name: "Food",
      icon: TbCoffee,
      fromColor: "from-orange-200",
      iconColor: "text-orange-500",
    },
    {
      id: 2,
      name: "Hotels",
      icon: TbBuildingSkyscraper,
      fromColor: "from-sky-200",
      iconColor: "text-sky-500",
    },
    {
      id: 3,
      name: "Services",
      icon: TbSettings,
      fromColor: "from-green-200",
      iconColor: "text-green-500",
    },
    {
      id: 4,
      name: "Recreation",
      icon: TbDeviceGamepad2,
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
            <span className="text-center font-medium text-sm text-gray-700">
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
    <>
      <header className="flex justify-center items-center gap-4 p-4 text-white">
        <div
          onClick={toggleLanguage}
          className="flex justify-center items-center cursor-pointer w-28 h-10 transition-all duration-300"
          role="button"
          tabIndex={0}
        >
          <TbWorld size={20} strokeWidth={1} className="mr-2" />
          <span className="text-sm">{t("language_switch")}</span>
        </div>
        <div className="relative w-full">
          <TbSearch
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300"
            size={20}
          />
          <Input
            placeholder={t("search_placeholder")}
            className="rounded-full text-gray-300 pl-10 placeholder:text-gray-300 focus-visible:ring-0"
          />
        </div>
      </header>
      <img
        src="/home.webp"
        alt="home"
        className="absolute top-0 z-[-100] w-full rounded-br-[1.7rem] h-64"
      />
      <div className="mt-[calc(16rem-72px)]">
        <div className="bg-black h-[1.7rem]"></div>
        <div className="bg-white h-[1.7rem] rounded-tl-[1.7rem] relative top-[-1.7rem]"></div>
        <div className="mt-[-2rem] mx-4">
          <ServicesSection />

          <div className="rounded-lg bg-gradient-to-b from-gray-100 to-transparent h-20 p-4 mt-5">
            123
          </div>
        </div>
      </div>
    </>
  );
};
