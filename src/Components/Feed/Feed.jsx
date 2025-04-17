import React, { useEffect, useState } from 'react'
import './Feed.css'
// import thumbnail1 from '../../assets/thumbnail1.png'
// import thumbnail2 from '../../assets/thumbnail2.png'
// import thumbnail3 from '../../assets/thumbnail3.png'
// import thumbnail4 from '../../assets/thumbnail4.png'
// import thumbnail5 from '../../assets/thumbnail5.png'
// import thumbnail6 from '../../assets/thumbnail6.png'
// import thumbnail7 from '../../assets/thumbnail7.png'
// import thumbnail8 from '../../assets/thumbnail8.png'
import { Link } from 'react-router-dom'
import { value_convertor , API_KEY } from '../../data'
import moment from 'moment'
const Feed = ({category }) => {
  const [data ,setData] = useState([])

  const fetchData = async ()=>{
    const videoList = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=1000&regionCode=IN&videoCategoryId=${category}&key=${API_KEY}`
    try{
      const response = await fetch(videoList)
      const data =await response.json()
      setData(data.items)
    }
    catch(error){
      return `Error fetching data:${error}`
    }   
  }


  useEffect(()=>{
    fetchData();
  },[category])

  return (
    
    
    <div className='feed'>
      {data.map((item ,index)=>{return(
       <Link to={`video/${item.snippet.categoryId}/${item.id}`} className='card' key={index}>
       <img src={item.snippet.thumbnails.medium.url} alt="feed" />
        <h2>{item.snippet.title}</h2>
        <h3>{item.snippet.channelTitle}</h3>
        <p>{value_convertor(item.statistics.viewCount)}views &bull: {moment(item.snippet.publishedAt).fromNow()}</p>
       </Link>

      )})}
      

       
      
    </div>
  )
}

export default Feed