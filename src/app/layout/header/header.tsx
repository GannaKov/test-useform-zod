"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { NAV_LINKS } from "@/app/const/const";

const Header = () => {
  const pathname = usePathname();
  return (
    <header className="  px-8 pb-20 gap-16 sm:px-20 ">
      <nav className="grid grid-cols-3 grid-rows-1 items-center justify-items-center">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            className={clsx(
              "flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3",
              {
                "bg-sky-100 text-blue-600": pathname === link.href,
              }
            )}
            href={link.href}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
};

export default Header;
