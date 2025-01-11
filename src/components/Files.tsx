import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Input } from "@/components/ui/input";
import {
  TbSearch,
  TbFile,
  TbFileText,
  TbPhoto,
  TbVideo,
  TbFiles
} from "react-icons/tb";

type FileType = "all" | "documents" | "images" | "videos" | "others";

interface FileItem {
  id: string;
  name: string;
  type: FileType;
  size: string;
  date: string;
}

export const Files = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<FileType>("all");

  // Mock data - replace with real data later
  const files: FileItem[] = [
    {
      id: "1",
      name: "Project Report.pdf",
      type: "documents",
      size: "2.5 MB",
      date: "2025-01-11"
    },
    {
      id: "2",
      name: "Scenic Photo.jpg",
      type: "images",
      size: "1.8 MB",
      date: "2025-01-10"
    },
    {
      id: "3",
      name: "Tour Guide.mp4",
      type: "videos",
      size: "15.2 MB",
      date: "2025-01-09"
    }
  ];

  const filterTypes: { type: FileType; icon: any; label: string }[] = [
    { type: "all", icon: TbFiles, label: t("all_files") },
    { type: "documents", icon: TbFileText, label: t("documents") },
    { type: "images", icon: TbPhoto, label: t("images") },
    { type: "videos", icon: TbVideo, label: t("videos") },
    { type: "others", icon: TbFile, label: t("others") }
  ];

  const filteredFiles = files.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === "all" || file.type === selectedType;
    return matchesSearch && matchesType;
  });

  const getFileIcon = (type: FileType) => {
    switch (type) {
      case "documents":
        return TbFileText;
      case "images":
        return TbPhoto;
      case "videos":
        return TbVideo;
      default:
        return TbFile;
    }
  };

  return (
    <div className="flex flex-col h-full pb-[72px]">
      {/* Search and Filter Section */}
      <div className="sticky top-0 bg-white z-10 p-4 space-y-4 border-b">
        <div className="relative">
          <TbSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder={t("search_files")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {filterTypes.map(({ type, icon: Icon, label }) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full whitespace-nowrap ${
                selectedType === type
                  ? "bg-blue-100 text-blue-600"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* File List */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-2">
          {filteredFiles.map((file) => {
            const FileIcon = getFileIcon(file.type);
            return (
              <div
                key={file.id}
                className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <FileIcon className="w-8 h-8 text-gray-500" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {file.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {file.size} • {file.date}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};