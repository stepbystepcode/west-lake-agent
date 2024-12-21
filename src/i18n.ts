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
      "smart_assistant": "Smart Assistant"
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
      "smart_assistant": "智能助手"
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