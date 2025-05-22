import React, { Suspense } from "react";
import "./signin.css";
import ResetPassword from "@/components/reset-password";

const page = () => {
  return (
    <Suspense
      fallback={
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={"animate-spin"}
        >
          <path d="M21 12a9 9 0 1 1-6.219-8.56" />
        </svg>
      }
    >
      <section className="bg-white dark:bg-[#0a0a0a]">
        <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
          <aside className="signin__pattern relative block h-full lg:order-last lg:col-span-5  xl:col-span-6">
            <div className="h-full w-full "></div>
          </aside>
          <main className="py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6 h-full w-full flex flex-col justify-center justify-items-center items-center">
            <div className="max-w-3xl w-full *:mx-auto">
              <ResetPassword />
            </div>
          </main>
        </div>
      </section>
    </Suspense>
  );
};

export default page;
