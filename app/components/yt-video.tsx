import clsx from "clsx"
import { Loader2 } from "lucide-react"
import { useState } from "react"

export const YTVideo = ({
  src,
  className = ""
}: {
  src: string,
  className?: string
}) => {
  const [ isLoading, setIsLoading ] = useState(true)

  return (
    <div
      className={clsx(
        "relative w-full h-full aspect-video grid place-items-center bg-black rounded-lg overflow-clip",
        className
      )}
    >
      { isLoading && <Loader2 className="absolute animate-spin" size="72px" /> }
      <iframe
        className="w-full h-full"
        src={src}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        onLoad={() => setIsLoading(false)}
      />
    </div>
  )
}