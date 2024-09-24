"use client"
import React from 'react'
import BackButton from './BackButton'
import LetterTitle from './LetterTitle'


function WriteLetterHeader() {
  return (
    <div id="header" className="w-full border-b grid grid-cols-3 py-4 px-8">
        <BackButton />
        <LetterTitle />
        <div className="flex"></div>
      </div>
  )
}

export default WriteLetterHeader