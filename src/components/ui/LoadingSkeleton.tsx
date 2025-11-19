import React from 'react'
import { cn } from '@/lib/utils'

interface SkeletonProps {
  className?: string
  width?: string
  height?: string
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className,
  width = 'w-full',
  height = 'h-4'
}) => (
  <div
    className={cn(
      'animate-pulse bg-gray-200 rounded',
      width,
      height,
      className
    )}
  />
)

export const BusListSkeleton: React.FC = () => (
  <div className="space-y-4">
    {[...Array(3)].map((_, i) => (
      <div key={i} className="bg-white rounded-2xl p-6 shadow-lg">
        <div className="flex items-center space-x-4">
          <Skeleton className="w-12 h-12 rounded-xl" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
          <Skeleton className="w-16 h-6 rounded-full" />
        </div>
      </div>
    ))}
  </div>
)

export const DashboardSkeleton: React.FC = () => (
  <div className="space-y-6">
    <div className="text-center space-y-2">
      <Skeleton className="h-8 w-64 mx-auto" />
      <Skeleton className="h-4 w-48 mx-auto" />
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="bg-white rounded-2xl p-6 shadow-lg">
          <Skeleton className="w-12 h-12 rounded-xl mb-4" />
          <Skeleton className="h-5 w-3/4 mb-2" />
          <Skeleton className="h-4 w-full mb-4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      ))}
    </div>
  </div>
)

export const ChartSkeleton: React.FC = () => (
  <div className="bg-white rounded-2xl p-6 shadow-lg">
    <Skeleton className="h-6 w-48 mb-4" />
    <Skeleton className="h-64 w-full rounded-lg mb-4" />
    <div className="grid grid-cols-3 gap-4">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="text-center space-y-2">
          <Skeleton className="h-8 w-16 mx-auto" />
          <Skeleton className="h-4 w-12 mx-auto" />
        </div>
      ))}
    </div>
  </div>
)
