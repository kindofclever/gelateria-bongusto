"use client";

import { usePathname } from "@/i18n/navigation";

export default function NavSpacer() {
  const pathname = usePathname();
  if (pathname === "/") return null;
  return <div className="h-16" />;
}
