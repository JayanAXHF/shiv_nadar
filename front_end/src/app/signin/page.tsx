import Image from "next/image";
import Link from "next/link";
import React from "react";
import SignIn from "~/components/sign-in";
import "./signin.css";

const page = () => {
  return (
    <div className={``}>
      <section className="bg-white dark:bg-[#0a0a0a]">
        <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
          <aside className="signin__pattern relative block h-full lg:order-last lg:col-span-5  xl:col-span-6">
            <div className="h-full w-full "></div>
          </aside>
          <main className="py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6 h-full w-full flex flex-col justify-center justify-items-center items-center">
            <div className="max-w-3xl w-full *:mx-auto">
              <SignIn />
            </div>
          </main>
        </div>
      </section>
    </div>
  );
};

export default page;
