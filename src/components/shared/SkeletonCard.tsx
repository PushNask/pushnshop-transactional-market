import { Card } from "@/components/ui/card";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SkeletonCard = () => {
  return (
    <Card className="overflow-hidden" data-testid="skeleton-card">
      <div className="relative aspect-square">
        <Skeleton height="100%" />
      </div>
      <div className="p-4">
        <Skeleton count={2} />
        <div className="mt-2">
          <Skeleton count={1} />
        </div>
      </div>
    </Card>
  );
};

export default SkeletonCard;