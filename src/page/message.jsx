import React from 'react'
import Navbar from '../component/navbar'
import Suggestion from '../component/suggestion'
import Message from '../component/message'

 const Messages=()=>{
  return (
    <div className="flex w-full">
      <Navbar />
      <div className="w-full px-10">
       <Message/>
      </div>
      <div className="hidden md:block">
        <Suggestion />
      </div>
    </div>
  )
}
export default Messages;