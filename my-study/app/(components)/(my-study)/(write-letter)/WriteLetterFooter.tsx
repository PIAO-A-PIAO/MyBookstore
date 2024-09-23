import React from 'react'

function WriteLetterFooter() {
  const handleArchive = () => {

  }

  const handleDiscard = () => {

  }

  const handleSend = () => {}
  return (
    <div
        id="footer"
        className="w-full flex py-4 px-8 border-t justify-between"
      >
        <button
          className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded focus:outline-none"
          onClick={handleArchive}
        >
          Archive
        </button>
        <div>
          <button
            className="text-red-500 hover:text-red-700 font-bold py-2 px-4 rounded focus:outline-none"
            onClick={handleDiscard}
          >
            Discard
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-2 rounded focus:outline-none"
            onClick={handleSend}
          >
            Send
          </button>
        </div>
      </div>
  )
}

export default WriteLetterFooter