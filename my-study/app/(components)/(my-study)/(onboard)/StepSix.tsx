import React from 'react'

function StepSix({lastStep}:{lastStep: ()=>void}) {
  return (
    <div className="text-center py-24 w-full h-full flex flex-col gap-8 items-center">
          <div className="space-y-4 w-1/2">
            <h1>Congratulations!</h1>
            <p>
              You need stamps to send out letters. You'll also receive stamps
              when others send a letter to you. Now feel free to explore!
            </p>
          </div>
          <img className="h-2/3 aspect-video" src="./assets/placeholder.svg" />
          <div className="flex justify-between w-full py-8 px-16 fixed bottom-0">
            <button
              onClick={lastStep}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            >
              Back
            </button>
            <button
            //   onClick={onClose}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Let's Go!
            </button>
          </div>
        </div>
  )
}

export default StepSix