import { Skeleton } from "@/components/ui/skeleton";

export const SkeletonServiceTable = () => {
  return(
    <div className="grid grid-cols-2 sm:grid-cols-8 gap-5 w-full sm:h-[250px] h-[500px]">
      <Skeleton className="col-span-2 max-w-[350px] rounded shadow p-4 h-[250px]" />
      <Skeleton className="col-span-2 max-w-[350px] rounded shadow p-4 h-[250px]" />
      <Skeleton className="col-span-4 rounded shadow p-4 h-[250px]" />
    </div>
  )
}