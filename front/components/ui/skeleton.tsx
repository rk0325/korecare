import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md", className)}
      style={{ backgroundColor: "rgba(210, 206, 199, 0.74)" }}
      {...props}
    />
  )
}

export { Skeleton }
