import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Input } from "@/components/ui/input";
import {
  TbSearch,
  TbCalendar,
  TbClock,
  TbMapPin,
  TbSortAscending,
  TbSortDescending,
} from "react-icons/tb";
import { useNavigate } from "react-router-dom";

interface MeetingRecord {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
}

export const Records = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortAscending, setSortAscending] = useState(true);

  // Mock data - replace with actual data in production
  const [records] = useState<MeetingRecord[]>([
    {
      id: "1",
      title: "Product Planning Meeting",
      date: "2025-01-11",
      time: "14:00",
      location: "Conference Room A",
    },
    {
      id: "2",
      title: "Team Weekly Sync",
      date: "2025-01-12",
      time: "10:00",
      location: "Online - Zoom",
    },
    // Add more mock records as needed
  ]);

  const filteredRecords = records
    .filter((record) =>
      record.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.location.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      const comparison = a.date.localeCompare(b.date);
      return sortAscending ? comparison : -comparison;
    });

  return (
    <div 
      className="px-4 pt-8 w-full mx-auto overflow-hidden min-h-screen" 
      style={{
        backgroundImage: "url('https://www.gcsis.cn/img/index_bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}
    >
      <div className="mb-4">
        <h1 className="text-2xl font-bold my-4">{t('meeting_records')}</h1>
        <div className="flex gap-4 items-center">
          <div className="relative flex-1">
            <TbSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              className="pl-10 bg-white/30 backdrop-blur-md border border-white/40 text-gray-800"
              placeholder={t('search_by_title_or_location')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button
            onClick={() => setSortAscending(!sortAscending)}
            className="p-2 rounded hover:bg-white/20 bg-white/30 backdrop-blur-md border border-white/40"
          >
            {sortAscending ? (
              <TbSortAscending className="w-5 h-5" />
            ) : (
              <TbSortDescending className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {filteredRecords.map((record) => (
          <div
            key={record.id}
            className="p-4 rounded-lg border border-white/40 bg-white/30 backdrop-blur-md hover:bg-white/40 transition-colors w-full overflow-hidden cursor-pointer shadow-sm"
            onClick={() => navigate(`/meetings/${record.id}`)}
          >
            <h3 className="text-lg font-semibold mb-2 truncate">{t(record.title.toLowerCase().replace(/ /g, '_'))}</h3>
            <div className="flex flex-col gap-2 text-sm text-gray-600 w-full">
              <div className="flex items-center gap-2 w-full">
                <TbCalendar className="w-4 h-4 flex-shrink-0" />
                <span className="truncate w-full">{record.date}</span>
              </div>
              <div className="flex items-center gap-2 w-full">
                <TbClock className="w-4 h-4 flex-shrink-0" />
                <span className="truncate w-full">{record.time}</span>
              </div>
              <div className="flex items-center gap-2 w-full">
                <TbMapPin className="w-4 h-4 flex-shrink-0" />
                <span className="truncate w-full">{t(record.location.toLowerCase().replace(/ /g, '_'))}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};