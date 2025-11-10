import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';

const Loading = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-background via-background to-muted/30">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {/* Header Skeleton */}
        <Card className="mb-2 border-0 bg-transparent shadow-none">
          <CardHeader className="p-0">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex-1">
                <Skeleton className="h-9 w-48 mb-2" />
                <Skeleton className="h-4 w-64" />
              </div>
              <Skeleton className="h-10 w-full sm:w-36" />
            </div>
            <Separator className="my-2 border-0.5" />
          </CardHeader>
        </Card>

        {/* Search Bar Skeleton */}
        <Card className="border-0.5 bg-transparent shadow-none py-0">
          <CardContent className="p-0">
            <Skeleton className="h-10 w-full" />
          </CardContent>
        </Card>

        {/* Filter Panel Skeleton */}
        <Card className="border-0.5 bg-transparent shadow-none">
          <CardContent className="p-0">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
              {/* Level Filter */}
              <div className="sm:col-span-1">
                <Skeleton className="h-4 w-12 mb-1" />
                <Skeleton className="h-8 w-full" />
              </div>

              {/* Gender Filter */}
              <div className="sm:col-span-1">
                <Skeleton className="h-4 w-16 mb-1" />
                <Skeleton className="h-8 w-full" />
              </div>

              {/* Marital Status Filter */}
              <div className="sm:col-span-1">
                <Skeleton className="h-4 w-16 mb-1" />
                <Skeleton className="h-8 w-full" />
              </div>

              {/* District Filter */}
              <div className="sm:col-span-1">
                <Skeleton className="h-4 w-16 mb-1" />
                <Skeleton className="h-8 w-full" />
              </div>

              {/* Thana Filter */}
              <div className="sm:col-span-1">
                <Skeleton className="h-4 w-12 mb-1" />
                <Skeleton className="h-8 w-full" />
              </div>

              {/* Clear Filters Button */}
              <div className="col-span-2 sm:col-span-1 flex items-end mt-6">
                <Skeleton className="h-8 w-full" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Active Filters Display Skeleton */}
        <div className="border-0.5 mb-4 flex flex-wrap items-center gap-3 rounded-xl bg-muted/40 px-4 py-3 text-sm shadow-sm backdrop-blur-sm">
          <Skeleton className="h-4 w-40" />
          <Separator orientation="vertical" className="h-4" />
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-6 w-28" />
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-6 w-28" />
          <Skeleton className="h-6 w-24" />
        </div>

        {/* Customer Table Skeleton */}
        <Card className="border-0 bg-transparent shadow-none">
          <CardContent className="p-0">
            <div className="rounded-lg border">
              {/* Table Header - Hidden on mobile */}
              <div className="hidden md:grid md:grid-cols-7 gap-4 border-b bg-muted/50 p-4">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-16" />
              </div>

              {/* Table Rows - Desktop */}
              <div className="hidden md:block">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="grid grid-cols-7 gap-4 border-b p-4 last:border-0">
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-5 w-28" />
                    <Skeleton className="h-5 w-16" />
                    <Skeleton className="h-5 w-36" />
                    <Skeleton className="h-5 w-24" />
                    <Skeleton className="h-5 w-20" />
                    <Skeleton className="h-8 w-16" />
                  </div>
                ))}
              </div>

              {/* Table Rows - Mobile (Card Layout) */}
              <div className="md:hidden divide-y">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 space-y-2">
                        <Skeleton className="h-5 w-40" />
                        <Skeleton className="h-4 w-32" />
                      </div>
                      <Skeleton className="h-8 w-16" />
                    </div>
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-28" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-36" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pagination Skeleton */}
        <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Skeleton className="h-4 w-40" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-9 w-9" />
            <Skeleton className="h-9 w-9" />
            <Skeleton className="h-9 w-9" />
            <Skeleton className="h-9 w-9" />
            <Skeleton className="h-9 w-9" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loading;
