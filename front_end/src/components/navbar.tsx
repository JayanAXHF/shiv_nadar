"use client";
import React from "react";
import { authClient } from "../lib/auth-client";
import { Button } from "./ui/button";
import Link from "next/link";

const Navbar = () => {
  const {
    data: session,
    isPending, //loading state
    error, //error object
    refetch, //refetch the session
  } = authClient.useSession();

  return (
    <nav className="w-dvw flex items-center h-20 px-5 py-5">
      {session ? (
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center flex-row">
            <img
              src={session?.user?.image ?? ""}
              alt={session?.user.name}
              className="w-10 h-10 rounded"
            />
            <div className="ml-4">
              <p className="text-white text">{session.user.name}</p>
              <p className="text-white text-xs">Welcome back!</p>
            </div>
          </div>
          <div className="mr-4">
            <Button
              variant={"outline"}
              onClick={async () => {
                await authClient.signOut();
              }}
            >
              Sign Out
            </Button>
          </div>
        </div>
      ) : (
        <div className="w-full flex justify-end gap-x-5 items-center">
          <Link href="/signin">
            <Button variant={"secondary"}>Sign In</Button>
          </Link>
          <Link href="/signup">
            <Button variant={"default"}>Sign Up</Button>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
