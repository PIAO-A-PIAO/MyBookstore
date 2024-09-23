import React from 'react'
import WritingArea from './WritingArea'

function WriteLetterMiddle() {
  return (
    <div
        id="middle"
        className="flex w-full h-full items-center justify-between overflow-auto"
      >
        <div
          id="writing-area"
          className="w-full h-full overflow-y-scroll no-scrollbar"
        >
          <WritingArea />
        </div>
      </div>
  )
}

export default WriteLetterMiddle