import React from 'react';

const CollectionHeaderSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        {/* LEFT SIDE */}
        <div className="space-y-4 w-full max-w-lg">
          {/* Title */}
          <div className="h-8 w-64 bg-muted rounded-md" />

          {/* Description */}
          <div className="h-4 w-80 bg-muted rounded-md" />

          {/* Tags */}
          <div className="flex gap-2 mt-3">
            <div className="h-6 w-16 bg-muted rounded-md" />
            <div className="h-6 w-20 bg-muted rounded-md" />
            <div className="h-6 w-12 bg-muted rounded-md" />
          </div>
        </div>

        {/* RIGHT SIDE BUTTONS */}
        <div className="flex gap-2 w-full sm:w-auto">
          <div className="h-12 w-32 bg-muted rounded-md" />
          <div className="h-12 w-32 bg-muted rounded-md" />
          <div className="h-12 w-12 bg-muted rounded-md" />
        </div>
      </div>
    </div>
  );
};

export default CollectionHeaderSkeleton;
