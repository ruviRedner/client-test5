import React from 'react'
import { Iaction } from '../../redux/types/Iaction'
interface Props{
    act:Iaction
}
const ActionCard = ({act}:Props) => {
    
     
  return (
    <div>
       
      <h1>{act.timeHit}</h1>
      <h1>{act.status}</h1>
      <h1></h1>
    </div>
  )
}

export default ActionCard
