import { useRouter } from 'next/navigation'
import React from 'react'

function BackButton() {
  const router = useRouter()
  return (
    <button className="flex" onClick={()=>router.back()}>
        <img src="./assets/icons/left.svg"/>
        Back
    </button>
  )
}

export default BackButton