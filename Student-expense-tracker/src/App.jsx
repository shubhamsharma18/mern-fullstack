import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import ExpenseForm from './ExpenseForm'

function App() {
 const [parent,setParent]=useState(0)
 const [budget,setBudget]=useState(5000)
 function setInput(e){
  setBudget(e.target.value)
 }
  return (
   <>
   <div className='bg-gray-500 h-screen '>
    <div className='max-w-md mx-auto  p-6 border-2 border-gray-200 rounded-lg flex flex-col items-center gap-4'>

  <h2 className="text-xl font-bold text-gray-700">My Budget</h2>
  <h3 className="text-lg font-medium">
    Your Budget: <span className="font-bold">₹{budget}</span>
  </h3>

</div>

    <ExpenseForm  budget={budget}/>
   </div>
 
   </>
  )
}

export default App
