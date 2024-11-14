import React from 'react'
import { Iaction } from '../../redux/types/Iaction'
interface Props{
    act:Iaction
    miseilName:string
    
}
const ActionCard = ({act,miseilName}:Props) => {
    
     
  return (
    <div className='p'>
       
      <p>{act.timeHit}</p>
      <p>{act.status}</p>
      <p>{miseilName}</p>
      <h1></h1>
    </div>
  )
}

export default ActionCard
