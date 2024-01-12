import { Skeleton } from "./skeleton"

interface MultiSkeletonProps {
    number?: number
}

export const MultiSkeleton: React.FC<MultiSkeletonProps> = ({ number }) => {
    return (
        <div className="space-y-2 mt-4">
            {[...Array(number ?? 15)].map((_, index) => (
                <Skeleton key={index} className="h-8 w-full" />
            ))}
        </div>
    )
}