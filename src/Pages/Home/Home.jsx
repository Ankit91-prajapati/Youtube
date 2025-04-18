import React, { useState } from 'react'
import Sidebar from '../../Components/Sidebar/Sidebar.jsx'
import './Home.css'
import Feed from '../../Components/Feed/Feed.jsx'
const Home = ({sidebar}) => {

  const[category ,setCategory] = useState(0)
  
  return (
    <>
    <div ><Sidebar sidebar={sidebar} category={category} setCategory={setCategory}/>
    <div className={`container ${sidebar ? "" : 'large-container'}`}>
      <Feed category={category}/>
    </div>
    </div>
    </>
  )
}

export default Home;