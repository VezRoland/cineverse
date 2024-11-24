import clsx from "clsx"

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "~/components/ui/breadcrumb"

export const Header = ({
  title,
  description,
  breadcrumbRoutes,
  className = ""
}: {
  title: string,
  description?: string,
  breadcrumbRoutes?: [string, string][],
  className?: string
}) => {
  return (
    <header className={clsx(
      "w-full",
      className
    )}>
      {
        breadcrumbRoutes && breadcrumbRoutes.length > 0 &&
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbRoutes.map(([ name, path ], index) => (
              <>
                <BreadcrumbItem key={name}>
                  {
                    index < breadcrumbRoutes.length - 1 ? (
                      <BreadcrumbLink href={path}>
                        {name}
                      </BreadcrumbLink>
                    ) : (
                      <BreadcrumbPage>
                        {breadcrumbRoutes.at(-1)?.at(0)}
                      </BreadcrumbPage>
                    )
                  }
                </BreadcrumbItem>
                { index < breadcrumbRoutes.length - 1 && <BreadcrumbSeparator /> }
              </>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      }
      <h1 className="max-w-max py-2 text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">{title}</h1>
      { description && <h2>{description}</h2> }
    </header>
  )
}