//Composant client Breadcrumb
"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";

export default function MainBreadcrumb({
  items,
}: {
  items: { label: string; link: string }[];
}) {
  const length = items.length;
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {/* On itère sur les éléments label et link envoyés pas les pages */}
        {items.map((item, index) => {
          return (
            <BreadcrumbItem key={index}>
              <BreadcrumbLink href={item.link}>{`
                ${item.label}
                ${length >= 2 && length - 1 !== index ? " > " : ""}
                  `}</BreadcrumbLink>
            </BreadcrumbItem>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
