import Header from "@/components/Header";
import MobileNavigation from "@/components/MobileNavigation";
import Sidebar from "@/components/Sidebar";
import { getCurrentUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import React from "react";
import { Toaster } from "@/components/ui/toaster";

// setting this to force-dynamic will make the page rendered on the server for each request
// not same as client-side rendering
export const dynamic = "force-dynamic";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const currentUser = await getCurrentUser();
  if (!currentUser) return redirect("/sign-in");

  return (
    <main className="flex h-screen">
      <Sidebar {...currentUser}></Sidebar>
      <section className="flex h-full flex-1 flex-col">
        <MobileNavigation {...currentUser}></MobileNavigation>{" "}
        <Header
          userId={currentUser.$id}
          accountId={currentUser.accountId}
        ></Header>
        <div className="main-content">{children}</div>
      </section>
      <Toaster></Toaster>
    </main>
  );
};

export default Layout;
