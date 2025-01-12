import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { TbPlayerPlay, TbPlayerPause } from "react-icons/tb";
import { Slider } from "@/components/ui/slider";

interface TranscriptSegment {
  startTime: number;
  endTime: number;
  speaker: string;
  text: string;
}

interface MeetingDetailProps {
  id: string;
}

export const MeetingDetail = ({ id }: MeetingDetailProps) => {
  const { t } = useTranslation();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Mock data - replace with actual data in production
  const meetingData = {
    title: "Product Planning Meeting",
    date: "2025-01-11",
    time: "14:00",
    location: "Conference Room A",
    audioUrl: "/mock-audio.mp3",
    transcript: [
      {
        startTime: 0,
        endTime: 10,
        speaker: "John",
        text: "Welcome everyone to our product planning meeting. Today we'll be discussing the roadmap for Q1 2025.",
      },
      {
        startTime: 11,
        endTime: 20,
        speaker: "Sarah",
        text: "Let's start by reviewing our current progress and identifying key milestones we need to hit.",
      },
      {
        startTime: 21,
        endTime: 35,
        speaker: "Michael",
        text: "I've prepared a presentation showing our performance metrics from last quarter. We exceeded our targets in most areas.",
      },
      {
        startTime: 36,
        endTime: 45,
        speaker: "Emily",
        text: "That's great news! I'd like to discuss how we can maintain this momentum and possibly improve in areas where we fell short.",
      },
      {
        startTime: 46,
        endTime: 60,
        speaker: "David",
        text: "I agree. We should also consider the feedback we received from our beta users and incorporate it into our planning.",
      },
      {
        startTime: 61,
        endTime: 75,
        speaker: "Sarah",
        text: "Excellent point. The user feedback has been particularly insightful regarding our new features. Let's dive into those details.",
      }
    ] as TranscriptSegment[],
  };

  useEffect(() => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration || 0);
    }
  }, [audioRef.current?.duration]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleSeek = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0];
      setCurrentTime(value[0]);
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-none bg-white border-b border-gray-200">
        <div className="px-4 py-4">
          <h1 className="text-3xl font-bold mb-2">{t('meeting_details')}</h1>
          <div className="text-gray-600 space-y-1">
            <p><span className="inline-block w-20">{t('meeting_date')}:</span> {meetingData.date}</p>
            <p><span className="inline-block w-20">{t('meeting_time')}:</span> {meetingData.time}</p>
            <p><span className="inline-block w-20">{t('meeting_location')}:</span> {meetingData.location}</p>
          </div>
        </div>

        <div className="px-4 py-4 border-t border-gray-100">
          <audio
            ref={audioRef}
            src={meetingData.audioUrl}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={() => setDuration(audioRef.current?.duration || 0)}
          />

          <div className="space-y-4">
            <div className="flex-1">
              <div className="flex items-center gap-4">
                <button
                  onClick={togglePlay}
                  className="p-3 rounded-full bg-blue-500 text-white hover:bg-blue-600 flex-shrink-0"
                >
                  {isPlaying ? (
                    <TbPlayerPause className="w-6 h-6" />
                  ) : (
                    <TbPlayerPlay className="w-6 h-6" />
                  )}
                </button>

                <div className="flex-1 relative">
                  <Slider
                    value={[currentTime]}
                    min={0}
                    max={duration}
                    step={0.1}
                    onValueChange={handleSeek}
                    className="w-full"
                  />
                  <div className="absolute w-full -bottom-6 flex justify-between text-sm text-gray-500">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 py-3 border-t border-gray-100 bg-gray-50">
          <h2 className="text-xl font-semibold">{t('meeting_transcript')}</h2>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="space-y-4">
            {meetingData.transcript.map((segment, index) => (
              <div
                key={index}
                className="p-4 rounded-lg border border-gray-200 hover:border-gray-300 bg-white"
              >
                <div className="flex justify-between text-sm text-gray-500 mb-1">
                  <span className="font-medium">{t('meeting_speaker')}: {segment.speaker}</span>
                  <span>{t('meeting_time_range', { 
                    start: formatTime(segment.startTime), 
                    end: formatTime(segment.endTime) 
                  })}</span>
                </div>
                <p>{segment.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
