import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: {
      "Home": "Home",
      "Navigation": "Navigation",
      "QA": "Q&A",
      "Records": "Records",
      "Materials": "Materials",
      "Profile": "Profile",
      "search_placeholder": "Search",
      "language_switch": "中文",
      "new_conversation": "New Conversation",
      "history": "History",
      "placeholder_message": "Type your message...",
      "smart_assistant": "Smart Assistant",
      "outdoor_mode": "Outdoor mode",
      "indoor_mode": "Indoor mode",
      "search_files": "Search files...",
      "all_files": "All Files",
      "documents": "Documents",
      "images": "Images",
      "videos": "Videos",
      "others": "Others",
      // Meeting Records translations
      "Meeting Records": "Meeting Records",
      "Search by title or location": "Search by title or location",
      "Product Planning Meeting": "Product Planning Meeting",
      "Team Weekly Sync": "Team Weekly Sync",
      "Conference Room A": "Conference Room A",
      "Online - Zoom": "Online - Zoom"
    }
  },
  "zh-Hans": {
    translation: {
      "Home": "首页",
      "Navigation": "导航",
      "QA": "问答",
      "Records": "记录",
      "Materials": "资料",
      "Profile": "我的",
      "search_placeholder": "搜索",
      "language_switch": "English",
      "new_conversation": "新对话",
      "history": "历史记录",
      "placeholder_message": "输入您的消息...",
      "smart_assistant": "智能助手",
      "outdoor_mode": "室外模式",
      "indoor_mode": "室内模式",
      "search_files": "搜索文件...",
      "all_files": "全部文件",
      "documents": "文档",
      "images": "图片",
      "videos": "视频",
      "others": "其他",
      // Meeting Records translations
      "Meeting Records": "会议记录",
      "Search by title or location": "搜索标题或地点",
      "Product Planning Meeting": "产品规划会议",
      "Team Weekly Sync": "团队周会",
      "Conference Room A": "会议室A",
      "Online - Zoom": "线上会议 - Zoom"
    }
  }
};


i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "zh-Hans", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;