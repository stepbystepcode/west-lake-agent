import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: {
      "home": "Home",
      "navigation": "Navigation",
      "qa": "Q&A",
      "records": "Records",
      "materials": "Materials",
      "profile": "Profile",
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
      "meeting_records": "Meeting Records",
      "search_by_title_or_location": "Search by title or location",
      "product_planning_meeting": "Product Planning Meeting",
      "team_weekly_sync": "Team Weekly Sync",
      "conference_room_a": "Conference Room A",
      "online_zoom": "Online - Zoom",
      // Meeting Detail translations
      "meeting_details": "Meeting Details",
      "meeting_transcript": "Transcript",
      "meeting_date": "Date",
      "meeting_time": "Time",
      "meeting_location": "Location",
      "meeting_speaker": "Speaker",
      "meeting_time_range": "{{start}} - {{end}}",
      // Location errors
      "location_permission_denied": "Location permission denied",
      "location_unavailable": "Unable to get location",
      "location_timeout": "Getting location timed out",
      "location_error": "Error getting location",
      "geolocation_not_supported": "Browser does not support geolocation",
      "edit_profile": "Edit Profile",
      "my_meetings": "My Meetings",
      "my_bookings": "My Bookings",
      "my_tools": "My Tools",
      "downloaded_file": "Downloaded File",
      "check_update": "Check Update",
      "about_us": "About Us",
      "tours": "Tours",
      "favourites": "Favourites",
      "meetings": "Meetings",
      // Event display translations
      "upcoming_events": "Upcoming Events",
      "morning_events": "Morning Events",
      "afternoon_events": "Afternoon Events",
      "translation": "Translation",
      "search": "Search",
    }
  },
  "zh-Hans": {
    translation: {
      "home": "首页",
      "navigation": "路线导航",
      "qa": "问答",
      "records": "记录",
      "materials": "资料",
      "profile": "我的",
      "search_placeholder": "搜索",
      "language_switch": "English",
      "new_conversation": "新对话",
      "history": "历史记录",
      "placeholder_message": "输入您的消息...",
      "smart_assistant": "智能助手",
      "outdoor_mode": "户外模式",
      "indoor_mode": "室内模式",
      "search_files": "搜索文件...",
      "all_files": "所有文件",
      "documents": "文档",
      "images": "图片",
      "videos": "视频",
      "others": "其他",
      // Meeting Records translations
      "meeting_records": "会议记录",
      "search_by_title_or_location": "按标题或地点搜索",
      "product_planning_meeting": "产品规划会议",
      "team_weekly_sync": "团队周会",
      "conference_room_a": "会议室A",
      "online_zoom": "线上会议 - Zoom",
      // Meeting Detail translations
      "meeting_details": "会议详情",
      "meeting_transcript": "会议记录",
      "meeting_date": "日期",
      "meeting_time": "时间",
      "meeting_location": "地点",
      "meeting_speaker": "发言人",
      "meeting_time_range": "{{start}} - {{end}}",
      // Location errors
      "location_permission_denied": "位置权限被拒绝",
      "location_unavailable": "无法获取位置信息",
      "location_timeout": "获取位置超时",
      "location_error": "获取位置时出错",
      "geolocation_not_supported": "浏览器不支持地理定位",
      "edit_profile": "编辑资料",
      "my_meetings": "我的会议",
      "my_bookings": "我的预定",
      "my_tools": "我的工具",
      "downloaded_file": "下载文件",
      "check_update": "检查更新",
      "about_us": "关于我们",
      "tours": "大会指南",
      "favourites": "我的收藏",
      "translation": "实时转译",
      "meetings": "我的会议",
      // Event display translations
      "upcoming_events": "大会议程",
      "morning_events": "上午事件",
      "afternoon_events": "下午事件",
      "search": "搜索",
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