import { useState, useRef, useEffect } from 'react';
import { data } from '@/data/data';
import { useTranslation } from 'react-i18next';

const Carousel = () => {
  const { t } = useTranslation();
  const [activeSlide, setActiveSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const slideRef = useRef<HTMLDivElement>(null);
  
  // Extract all events with coverImgUrl into a flat array
  const allEvents = data.reduce((acc, dateGroup) => {
    const topEvents = dateGroup.topAgendaList?.filter(event => event.coverImgUrl) || [];
    const downEvents = dateGroup.downAgendaList?.filter(event => event.coverImgUrl) || [];
    return [...acc, ...topEvents, ...downEvents];
  }, [] as any[]);

  const handleEventClick = (event: any) => {
    console.log("Event clicked:", event);
  };

  // Handle touch events for swiping
  const handleTouchStart = (e: TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };
  
  const handleTouchMove = (e: TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  
  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      // Swipe left, go to next slide
      setActiveSlide((prev) => (prev === allEvents.length - 1 ? 0 : prev + 1));
    }
    
    if (touchStart - touchEnd < -75) {
      // Swipe right, go to previous slide
      setActiveSlide((prev) => (prev === 0 ? allEvents.length - 1 : prev - 1));
    }
    
    // Reset touch positions
    setTouchStart(0);
    setTouchEnd(0);
  };

  // Auto-slide functionality
  useEffect(() => {
    if (allEvents.length <= 1) return;
    
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev === allEvents.length - 1 ? 0 : prev + 1));
    }, 5000); // Change slide every 5 seconds
    
    return () => clearInterval(interval);
  }, [activeSlide, allEvents.length]);

  if (allEvents.length === 0) {
    return null;
  }

  return (
    <div className="relative w-full h-64 overflow-hidden">
      <div 
        className="absolute inset-0 z-0"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        ref={slideRef}
      >
        <div 
          className="flex transition-transform duration-300 h-full" 
          style={{ transform: `translateX(-${activeSlide * 100}%)` }}
        >
          {allEvents.map((event, index) => (
            <div 
              key={index} 
              className="min-w-full h-full cursor-pointer"
              onClick={() => handleEventClick(event)}
            >
              <div className="relative h-full">
                <img 
                  src={event.coverImgUrl} 
                  alt={event.title || 'Event image'} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent h-24 p-3 flex flex-col justify-center">
                  <h3 className="text-white font-medium">{event.title}</h3>
                  {(event.timeQuantum || event.site) && (
                    <p className="text-white/80 text-sm">
                      {event.timeQuantum} {event.site && `| ${event.site}`}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {allEvents.length > 1 && (
        <div className="absolute bottom-16 left-0 right-0 flex justify-center gap-1 z-10">
          {allEvents.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveSlide(index)}
              className={`w-2 h-2 rounded-full ${
                activeSlide === index ? "bg-white" : "bg-white/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Carousel;