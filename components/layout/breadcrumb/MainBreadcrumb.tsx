//Composant client Breadcrumb
"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function MainBreadcrumb({
  items,
}: {
  items: { label: string; link: string }[];
}) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {/* On itère sur les éléments label et link envoyés pas les pages */}
        {items.map((item, index) => {
          return (
            <BreadcrumbItem key={index}>
              {/* Si c'est le premier */}
              {index === 0 && (
                <div className="flex items-center">
                  <BreadcrumbLink href={item.link}>{item.label}</BreadcrumbLink>
                  <BreadcrumbSeparator />
                </div>
              )}

              {/* Si c'est entre le premier et le dernier (remplacement par "..." sur mobile) */}
              {index > 0 && index < items.length - 1 && (
                <>
                  <div className="hidden md:flex items-center">
                    <BreadcrumbLink href={item.link}>
                      {item.label}
                    </BreadcrumbLink>
                    <BreadcrumbSeparator />
                  </div>
                  <div className="flex md:hidden items-center">
                    <p>...</p>
                    <BreadcrumbSeparator />
                  </div>
                </>
              )}

              {/* Si c'est le dernier */}
              {index === items.length - 1 && (
                <BreadcrumbLink
                  href={item.link}
                  className="max-w-20 md:max-w-none truncate"
                >
                  {item.label}
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
