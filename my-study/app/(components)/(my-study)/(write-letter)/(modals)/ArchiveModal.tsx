import React from 'react'

function ArchiveModal() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="flex flex-col items-center justify-center w-1/3 p-6 bg-white rounded-md shadow-lg">
        <div className="flex justify-end w-full mb-4">
          <button
            aria-label="Close"
          >
            <img src="./assets/icons/close.svg" alt="Close" />
          </button>
        </div>
        <div className="mb-6 text-center">
          <p>Draft is saved!</p>
        </div>
        <div className="flex gap-4 ">
          <button className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
            Save
          </button>
          <button
            className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
          >
            Exit
          </button>
        </div>
      </div>
    </div>
  )
}

export default ArchiveModal