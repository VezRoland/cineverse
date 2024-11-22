import { useLocation, useNavigation } from "@remix-run/react"
import { Loader2 } from "lucide-react"

export const LoadingWrapper = ({
  children,
  strict = true
}: {
  children: React.ReactNode,
  strict?: boolean
}) => {
  const { state, location } = useNavigation()
  const { pathname } = useLocation()

  if ((state === "loading" && strict && pathname === location.pathname) || (state === "loading" && !strict && pathname !== location.pathname)) {
    return (
      <div className="flex-1 flex justify-center items-center">
        <Loader2 className="animate-spin" size="72px" />
      </div>
    )
  } else {
    return (
      <>
        {children}
      </>
    )
  }
}