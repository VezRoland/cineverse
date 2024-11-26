import { Link } from '@remix-run/react';
import { cn } from '~/lib/utils';

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '~/components/ui/card';

export const PageCard = ({
  title,
  description,
  href,
  className = '',
}: {
  title: string;
  description: string;
  href: string;
  className?: string;
}) => {
  return (
    <Link className={cn('group', className)} to={href}>
      <Card
        className="h-full grid place-items-center text-center
          group-focus:shadow-2xl group-focus:shadow-accent/25
          group-hover:shadow-2xl group-hover:shadow-accent/25
          transition-[box-shadow] duration-300"
      >
        <CardHeader>
          <CardTitle>
            <h2 className="py-2 m-auto text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              {title}
            </h2>
          </CardTitle>
          <CardDescription>
            <p className="max-w-96 m-auto text-foreground">
              {description}
            </p>
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
};
