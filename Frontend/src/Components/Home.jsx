import React from 'react'
import KohliImg from '../assets/Kohli.png'
import KohliImg2 from '../assets/Kohli2.jpg'


function Home() {
  return (
    <div>
      
      <h1 style={{ color: 'white', backgroundColor: 'black', border: '2px solid #ccc', borderRadius: '10px', padding: '10px' }}>Welcome to the King's Domain</h1>

      <img style={{ width: '490px', height: '550px', border: '2px solid #ccc', borderRadius: '10px' }} src={KohliImg} className="base" alt="" />
      <img style={{ width: '490px', height: '550px', border: '2px solid #ccc', borderRadius: '10px' }} src={KohliImg2} className="base" alt="" />
    </div>

    
  )
}

export default Home