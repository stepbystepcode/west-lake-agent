import { Map } from '@pansy/react-amap';
import { Switch } from "@/components/ui/switch"
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Label } from "@/components/ui/label";

export const Navigation = () => {
  const { t } = useTranslation();
  const [isOutdoorMode, setIsOutdoorMode] = useState(true);

  return (
    <div className="fixed inset-0 bottom-[72px] touch-none overflow-hidden">
      <div className="absolute top-4 right-4 z-10 flex items-center space-x-2 bg-white/90 p-2 rounded-lg shadow-sm">
        <Label htmlFor="mode-toggle" className="text-sm font-medium">
          {isOutdoorMode ? t('outdoor_mode') : t('indoor_mode')}
        </Label>
        <Switch
          id="mode-toggle"
          checked={isOutdoorMode}
          onCheckedChange={setIsOutdoorMode}
        />
      </div>
      {isOutdoorMode ? (
        <Map />
      ) : (
        <iframe 
          src="https://demo.woosmap.com/js-samples/samples/indoor-widget-advanced/app/dist/" 
          className="w-full h-full border-none"
          allow="fullscreen"
        />
      )}
    </div>
  );
};