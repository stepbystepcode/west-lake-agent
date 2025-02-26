import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TbDownload, TbRefresh, TbInfoCircle } from 'react-icons/tb';
import { useTranslation } from 'react-i18next';
export const Profile: React.FC = () => {
  const { t } = useTranslation();
  const list = [
    { text: t('downloaded_file') , icon: <TbDownload />, color: "#da7e61" },
    { text: t('check_update') , icon: <TbRefresh /> ,color:"#5e97f7"},
    { text: t('about_us') , icon: <TbInfoCircle /> ,color:"#bac384"},
  ]
  return (
    <div>
      <img src="https://unsplash.it/300/300" className="w-full h-48" alt="" />
      <div className="relative top-[-2rem] rounded-[1rem] bg-[#f6f6f4] w-[100vw] h-[100vh]">
        <div className="flex items-center">
          <Avatar className="top-[-2rem] w-20 h-20 relative left-6">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex ml-10 justify-between w-[70vw]">
          <div className="text-2xl font-bold block">Shad Cn</div>
          <button className="bg-gray-100 px-4 py-2 h-10 rounded-full" onClick={() => { }}>{t('edit_profile')}</button>
            </div>
        </div>
        <div className="grid grid-cols-2 p-4 gap-4 w-full h-24">
            <div className="col-span-1 w-full rounded-md bg-blue-100 p-4 font-bold">{t('my_meetings')}</div>
            <div className="col-span-1 w-full rounded-md bg-green-100 p-4 font-bold">{t('my_bookings')}</div>
        </div>
        <div className="p-4 flex flex-col gap-4 rounded-md bg-gradient-to-b from-blue-100 from-0% to-white to-20% mx-4">
            <div className="font-bold">{t('my_tools')}</div>
            {list.map((item, index) => (
              <div key={index} className="flex items-center">
                <div className="w-8 h-8 rounded-full text-white flex items-center justify-center" style={{ backgroundColor: item.color }}>{item.icon}</div>
                <span className="ml-2">{item.text}</span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
