import { Map } from '@pansy/react-amap';
import { Switch } from "@/components/ui/switch"
import { useTranslation } from "react-i18next";
import { useState, useEffect, useCallback } from "react";
import { Label } from "@/components/ui/label";
import { TbRefresh } from "react-icons/tb";

interface Position {
  latitude: number;
  longitude: number;
  accuracy?: number;
  timestamp?: number;
  isDefault?: boolean;
}

// 杭州默认位置（西湖）
const DEFAULT_POSITION: Position = {
  latitude: 30.2590,
  longitude: 120.1388,
  isDefault: true
};

export const Navigation = () => {
  const { t } = useTranslation();
  const [isOutdoorMode, setIsOutdoorMode] = useState(true);
  const [position, setPosition] = useState<Position>(DEFAULT_POSITION);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const getCurrentPosition = useCallback(() => {
    if (!navigator.geolocation) {
      setError("geolocation_not_supported");
      return;
    }

    setIsLoading(true);
    setError("");

    const successCallback = (position: GeolocationPosition) => {
      console.log("Position received:", {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        accuracy: position.coords.accuracy,
        timestamp: position.timestamp
      });
      
      setPosition({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        accuracy: position.coords.accuracy,
        timestamp: position.timestamp,
        isDefault: false
      });
      setError("");
      setIsLoading(false);
    };

    const errorCallback = (error: GeolocationPositionError) => {
      console.error("Geolocation error:", {
        code: error.code,
        message: error.message
      });

      setError(`${error.message}`);
      setIsLoading(false);
      // 如果获取位置失败，使用默认位置
      if (!position.isDefault) {
        setPosition(DEFAULT_POSITION);
      }
    };

    const options: PositionOptions = {
      enableHighAccuracy: false,
      timeout: 10000,
      maximumAge: 60000
    };

    try {
      navigator.geolocation.getCurrentPosition(
        successCallback,
        errorCallback,
        options
      );
    } catch (e) {
      console.error("Unexpected geolocation error:", e);
      setError(`${e instanceof Error ? e.message : String(e)}`);
      setIsLoading(false);
      if (!position.isDefault) {
        setPosition(DEFAULT_POSITION);
      }
    }
  }, [position.isDefault]);

  useEffect(() => {
    getCurrentPosition();
  }, [getCurrentPosition]);

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
      <div className="absolute top-4 left-4 z-10 space-y-2">
        <div className="bg-white/90 p-2 rounded-lg shadow-sm">
          <div className="flex items-center space-x-2">
            <p className="text-sm font-medium">
              {position.latitude.toFixed(6)}, {position.longitude.toFixed(6)}
              {position.accuracy && (
                <span className="text-gray-500 ml-2">±{Math.round(position.accuracy)}m</span>
              )}
              {position.isDefault && (
                <span className="text-yellow-600 ml-2">(默认位置)</span>
              )}
            </p>
            <button
              onClick={getCurrentPosition}
              disabled={isLoading}
              className={`p-1 rounded-full hover:bg-gray-100 ${isLoading ? 'animate-spin' : ''}`}
            >
              <TbRefresh className="w-4 h-4" />
            </button>
          </div>
        </div>
        {error && (
          <div className="bg-red-100 text-red-700 p-2 rounded-lg shadow-sm text-sm">
            {error}
          </div>
        )}
      </div>
      {isOutdoorMode ? (
        <Map
          center={[position.longitude, position.latitude]}
          zoom={15}
        />
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