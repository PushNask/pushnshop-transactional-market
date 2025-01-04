import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function SkeletonCard() {
  return (
    <div className="w-full bg-white rounded shadow p-3">
      <div className="aspect-square bg-gray-100 mb-3 relative">
        <Skeleton height="100%" />
      </div>
      <div className="space-y-2">
        <Skeleton width="60%" height={20} />
        <Skeleton width="40%" height={20} />
        <Skeleton width="80%" height={20} />
      </div>
    </div>
  );
}