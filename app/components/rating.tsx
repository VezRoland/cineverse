import { Icon } from "@iconify/react"
import clsx from "clsx"

export const Rating = ({
  rating,
  className = ""
}: {
  rating: number,
  className?: string
}) => {
  return (
    <div className={clsx(
      "flex",
      className
    )}>
      {[1, 2, 3, 4, 5].map(star => (
        <Icon
          key={star}
          className="text-lg text-primary"
          icon={
            rating % star !== rating ? "material-symbols:star-rate-rounded" :
            star - rating >= 1 ? "material-symbols:star-rate-outline-rounded" :
            "material-symbols:star-rate-half-rounded"
          }
        />
      ))}
    </div>
  )
}