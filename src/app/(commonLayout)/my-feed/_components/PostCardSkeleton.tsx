import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function PostCardSkeleton() {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex items-center space-x-4">
              {/* Author Image Skeleton */}
              <Skeleton className="h-12 w-12 rounded-full border border-gray-300" />

              <div className="flex flex-col space-y-2">
                {/* Author Name and Created Date Skeleton */}
                <Skeleton className="h-4 w-[120px]" />
              </div>
            </div>
          </CardTitle>

          {/* Post Title Skeleton */}
          <CardDescription className="mt-3">
            <Skeleton className="h-6 w-full" />
          </CardDescription>
        </CardHeader>

        <CardContent>
          {/* Post Content Skeleton */}
          <Skeleton className="rounded-md w-[500px] h-[300px] pt-2" />
        </CardContent>

        <CardFooter>
          <div className="border-t border-gray-300 flex flex-col w-full py-4 space-y-4">
            <div className="flex justify-between w-full">
              <div className="flex gap-x-2">
                {/* Upvote and Downvote Buttons Skeleton */}
                <Skeleton className="h-10 w-10 rounded-full" />
                <Skeleton className="h-10 w-10 rounded-full" />
              </div>

              {/* Comment Button Skeleton */}
              <Skeleton className="h-10 w-[120px] rounded-md" />
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
