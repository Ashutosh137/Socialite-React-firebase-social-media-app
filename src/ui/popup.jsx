import React from 'react'

export const Popup = ({children,closefunction}) => {
  return (
    <div className="w-screen h-screen bg-transparent grid place-content-center  shadow-white border-2
     p-10 absolute left-0 top-0">
     
        <div className="absolute text-4xl top-10 left-5 z-50 bg-black">
      <button onClick={closefunction}>x</button>
      </div>
        <div className="m-5">
            {children}
        </div>
    </div>
  )
}
