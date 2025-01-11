// App.tsx
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import {
  TbHome,
  TbHomeFilled,
  TbCompass,
  TbCompassFilled,
  TbMessageChatbot,
  TbMessageChatbotFilled,
  TbClock,
  TbClockFilled,
  TbFolder,
  TbFolderFilled,
  TbUser,
  TbUserFilled
} from "react-icons/tb";
import { Home } from './components/Home';
import { Navigation } from './components/Navigation';
import { Files } from './components/Files';
import { Records } from './components/Records';
import { QA } from './components/QA';
import { useTranslation } from 'react-i18next';
import './App.css';

// 定义标签项的类型
interface TabItem {
  path: string;
  label: string;
  icon: React.ComponentType<{ size?: number }>;
  filledIcon: React.ComponentType<{ size?: number }>;
}

// 底部TabBar组件
const TabBar: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [height, setHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      setHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // 定义所有的标签项
  const tabs: TabItem[] = [
    {
      path: "/home",
      label: t('Home'),
      icon: TbHome,
      filledIcon: TbHomeFilled
    },
    {
      path: "/navigation",
      label: t('Navigation'),
      icon: TbCompass,
      filledIcon: TbCompassFilled
    },
    {
      path: "/q-a",
      label: t('QA'),
      icon: TbMessageChatbot,
      filledIcon: TbMessageChatbotFilled
    },
    {
      path: "/records",
      label: t('Records'),
      icon: TbClock,
      filledIcon: TbClockFilled
    },
    {
      path: "/materials",
      label: t('Materials'),
      icon: TbFolder,
      filledIcon: TbFolderFilled
    },
    {
      path: "/profile",
      label: t('Profile'),
      icon: TbUser,
      filledIcon: TbUserFilled
    }
  ];

  return (
    <div className={`flex p-4 bottom-0 w-full fixed z-[999] bg-white border-t md:flex sm:hidden ${height < 500 ? 'hidden' : ''}`}>
      {tabs.map((tab) => {
        const isActive = location.pathname === tab.path;
        const IconComponent = isActive ? tab.filledIcon : tab.icon;

        return (
          <Link
            to={tab.path}
            key={tab.path}
            className={`flex-1 flex flex-col items-center justify-center ${
              isActive ? 'text-blue-500' : 'text-gray-600'
            } hover:text-blue-500`}
          >
            <IconComponent size={24} />
            <span className="mt-1 text-sm">{tab.label}</span>
          </Link>
        );
      })}
    </div>
  );
};

// 各个页面组件


const Profile: React.FC = () => {
  const { t } = useTranslation();
  return <div className="p-4">{t('Profile')}</div>;
};

// 主应用组件
const App: React.FC = () => {
  return (
    <Router>
      <div className="App min-h-screen flex flex-col">
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/navigation" element={<Navigation />} />
          <Route path="/q-a" element={<QA />} />
          <Route path="/records" element={<Records />} />
          <Route path="/materials" element={<Files />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Home />} />
        </Routes>
        <TabBar />
      </div>
    </Router>
  );
};

export default App;
