import React from "react";
import { useRouter } from "next/navigation";

function StepSix() {
  const router = useRouter();
  return (
    <div className="text-center py-24 w-full h-full flex flex-col gap-8 items-center">
      <div className="space-y-4 w-1/2">
        <h1>Congratulations!</h1>
        <p>
          You need stamps to send out letters. You'll also receive stamps when
          others send a letter to you. Now feel free to explore!
        </p>
      </div>
      <img className="h-2/3 aspect-video" src="./assets/placeholder.svg" />
      <div className="flex justify-between w-full py-8 px-16 fixed bottom-0">
        <button
          onClick={() => router.push("/room")}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Let's Go!
        </button>
      </div>
    </div>
  );
}

export default StepSix;
