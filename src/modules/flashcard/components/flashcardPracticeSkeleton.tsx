import React from 'react';

const FlashcardPraciceSkeleton = () => {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 animate-pulse">
      {/* FLASHCARD SKELETON */}
      <div className="perspective-1000">
        <div className="relative h-110 rounded-xl bg-muted flex flex-col">
          {/* Top buttons */}
          <div className="flex items-center justify-end gap-3 px-6 py-4">
            <div className="h-6 w-6 bg-gray-300/30 rounded-md"></div>
            <div className="h-6 w-6 bg-gray-300/30 rounded-md"></div>
          </div>

          {/* Card content */}
          <div className="flex-1 flex items-center justify-center p-10">
            <div className="space-y-4 text-center">
              <div className="h-10 w-40 bg-gray-300/30 rounded-md mx-auto"></div>
              <div className="h-4 w-24 bg-gray-300/30 rounded-md mx-auto"></div>
            </div>
          </div>
        </div>
      </div>

      {/* NAVIGATION AREA */}
      <div className="grid grid-cols-3">
        <div></div> {/* Empty left side */}
        {/* Middle navigation skeleton */}
        <div className="flex items-center justify-center gap-8">
          <div className="h-8 w-20 bg-gray-300/30 rounded-md"></div>

          <div className="h-4 w-10 bg-gray-300/30 rounded-md"></div>

          <div className="h-8 w-20 bg-gray-300/30 rounded-md"></div>
        </div>
        {/* Right action buttons */}
        <div className="flex items-center gap-4 justify-end">
          <div className="h-8 w-12 bg-gray-300/30 rounded-md"></div>
          <div className="h-8 w-12 bg-gray-300/30 rounded-md"></div>
        </div>
      </div>
    </div>
  );
};

export default FlashcardPraciceSkeleton;
