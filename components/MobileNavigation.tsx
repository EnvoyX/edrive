"use client";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Separator } from "./ui/separator";
import { navItems } from "@/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "./ui/button";
import FileUploader from "./FileUploader";
import { signOutUser } from "@/lib/actions/user.actions";

const MobileNavigation = ({
  $id: ownerId,
  accountId,
  fullName,
  avatar,
  email,
}: {
  $id: string;
  accountId: string;
  fullName: string;
  avatar: string;
  email: string;
}) => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="mobile-header">
      <Image
        src={`/assets/icons/logo-full-brand.svg`}
        alt="logo"
        width={120}
        height={120}
        className="h-auto"
      ></Image>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger>
          <Image
            src={`/assets/icons/menu.svg`}
            alt="search"
            width={30}
            height={30}
          ></Image>
        </SheetTrigger>
        <SheetContent className="shad-sheet h-screen px-3">
          <SheetTitle>
            <div className="header-user">
              <Image
                src={avatar}
                alt="avatar"
                width={44}
                height={44}
                className="header-user-avatar"
              ></Image>
              <div className="sm:hidden lg:block ">
                <p className="subtitle-2 capitalize">{fullName}</p>
                <p className="caption">{email}</p>
              </div>
            </div>
            <Separator className="mb-4 bg-light-200/70" />
          </SheetTitle>
          <nav className="mobile-nav">
            <ul className="mobile-nav-list">
              {navItems.map(({ name, icon, url }) => (
                <Link href={url} key={name} className="lg:w-full">
                  <li
                    className={cn(
                      "mobile-nav-item",
                      pathname === url && "shad-active"
                    )}
                  >
                    <Image
                      src={icon}
                      alt={name}
                      width={24}
                      height={24}
                      className={cn(
                        "nav-icon",
                        pathname === url && "nav-icon-active"
                      )}
                    />
                    <p className="antialiased">{name}</p>
                  </li>
                </Link>
              ))}
            </ul>
          </nav>
          <Separator className="my-5 bg-light-200/20" />
          <div className="flex flex-col justify-between gap-5 pb-5">
            <FileUploader ownerId={ownerId} accountId={accountId} />
            <Button
              type="submit"
              className="mobile-sign-out-button"
              onClick={async () => await signOutUser()}
            >
              <Image
                src={`/assets/icons/logout.svg`}
                alt="logo"
                width={24}
                height={24}
              ></Image>
              <p>Logout</p>
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
};

export default MobileNavigation;
