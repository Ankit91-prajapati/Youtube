import React, { useEffect, useState } from 'react';
import './PlayVideo.css';
import like from '../../assets/like.png';
import dislike from '../../assets/dislike.png';
import share from '../../assets/share.png';
import save from '../../assets/save.png';
import jack from '../../assets/jack.png';
import user_profile from '../../assets/user_profile.jpg';
import { value_convertor, API_KEY } from '../../data';
import moment from 'moment';
import { useParams } from 'react-router-dom';

const PlayVideo = () => {
    const { videoId } = useParams();
    const [apiData, setApiData] = useState(null);

    useEffect(() => {
        const fetchVideoData = async () => {
            const videoDetailsURL = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoId}&key=${API_KEY}`;

            try {
                const response = await fetch(videoDetailsURL);
                if (!response.ok) throw new Error('Network response was not ok');
                
                const data = await response.json();
                
                if (data.items && data.items.length > 0) {
                    setApiData(data.items[0]);
                } else {
                    console.error('Video data not found');
                }
            } catch (error) {
                console.error('Fetching error:', error);
            }
        };

        fetchVideoData();
    }, [videoId]);

    return (
        <div className='play-video'>
            <iframe
                src={`https://www.youtube.com/embed/${videoId}`} 
                border="1" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullScreen
            />
            <h3>{apiData ? apiData.snippet.title : "Loading video..."}</h3>

            <div className="play-video-info">
                <p>{apiData ? `${value_convertor(apiData.statistics.viewCount)} Views • ${moment(apiData.snippet.publishedAt).fromNow()}` : "Loading..."}</p>
                <div>
                    <span><img src={like} alt="Like" /> {apiData ? apiData.statistics.likeCount : '120'}</span>
                    <span><img src={dislike} alt="Dislike" /> 0</span>
                    <span><img src={share} alt="Share" /> Share</span>
                    <span><img src={save} alt="Save" /> Save</span>
                </div>
            </div>

            <hr />

            <div className="publisher">
                <img src={jack} alt="Channel Logo" />
                <div>
                    <p>Stack</p>
                    <span>1 million subscribers</span>
                </div>
                <button>Subscribe</button>
            </div>

            <div className="vid-description">
                <p>Channel to make learning very easy</p>
                <p>Subscribe</p>
                <hr />
                <h4>130 comments</h4>

                
                
            </div>
        </div>
    );
};

export default PlayVideo;
