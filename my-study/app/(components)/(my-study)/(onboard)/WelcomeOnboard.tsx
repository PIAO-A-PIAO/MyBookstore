import React from "react";

function WelcomeOnboard( {nextStep}:{nextStep: () => void} ) {
  return (
    <div className="text-center py-24 w-full h-full flex flex-col items-center gap-8">
      <div className="space-y-4 w-1/2">
        <h1>Welcome to Our App!</h1>
        <p>We're glad to have you here. Let's get you started.</p>
      </div>
      <img className="h-2/3 aspect-video" src="./assets/placeholder.svg" />
      <div className="flex justify-end w-full py-8 px-16 fixed bottom-0">
        <button
          onClick={nextStep}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default WelcomeOnboard;
