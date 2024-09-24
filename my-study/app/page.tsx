"use client"
import React from "react";
import PublicTopbar from "./(components)/(topbar)/PublicTopbar";

const Home = () => {
  return (
    <div>
      <PublicTopbar authPage={false} />
      <section className="w-full py-48">
        <div className="container grid gap-12 px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-4">
              <h2 className="font-bold tracking-tighter text-5xl">
                Discover the Joy of Imagination
              </h2>
              <p className="max-w-[900px] text-gray-600 text-xl/relaxed">
                Immerse yourself in a world of creativity and collaboration with
                our unique minigames, designed to spark your imagination and
                connect you with like-minded individuals.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2 lg:grid-cols-3">

          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
