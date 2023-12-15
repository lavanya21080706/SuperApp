import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Styles from './api2.module.css';
import { useNavigate } from 'react-router-dom';
import './page.css';

function News() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const navigate=useNavigate();
  const [posts, setPosts] = useState();
  const [counter, setCounter] = useState(0);
  const [newIndex, setNewIndex] = useState(0);
  
  useEffect(() => {
    console.log('newIndex changed:', newIndex);
  }, [newIndex]);

  useEffect(() => {
    fetchData();

    const intervalId = setInterval(() => {
      setNewIndex((prevIndex) => prevIndex + 1);
    }, 60000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    console.log('newIndex changed:', newIndex);
    const currentMinute = currentTime.getMinutes();
    const timeoutDuration = (60 - currentMinute) * 60000; 
    const timeoutId = setTimeout(() => {
      console.log('Current time:', new Date());
      setNewIndex((prevIndex) => prevIndex + 1);
    }, timeoutDuration);

    return () => clearTimeout(timeoutId);
  }, [newIndex, currentTime]);

  const fetchData = () => {
    axios
      .get('https://newsapi.org/v2/everything?q=apple&from=2023-12-09&to=2023-12-09&sortBy=popularity&apiKey=9eaa5eb9fd6f463fa2e18280defb0e34')
      .then((response) => {
        console.log(response.data); 
        setPosts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  useEffect(() => {
    if (posts) {
      const newIndexValue = newIndex % posts.articles.length;
      setCounter(newIndexValue);
    }
  }, [counter, posts, newIndex]);

  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentTime(new Date());
    }, 100);

    return () => clearInterval(timerId);
  }, []);

  return (
    <div className='right_profile'>
      {posts && (
        <div className={Styles.newsimage}>
          <img
            src={posts.articles[counter].urlToImage}
            alt="Article"
            style={{ height: '500px',  width: '23.9375rem', objectFit: 'cover', borderRadius: '19px 19px 0px 0px' }}
          />

          <div className={Styles.back}>
            <div className={Styles.mobile}>{posts.articles[counter].title}</div>
            <span id={Styles.update} style={{width: '23.9375rem'}}>
              {formatDate(currentTime)} |&nbsp;{formatTime(currentTime)}
            </span>
          </div>
          <div className={Styles.info}>
            <div className={Styles.infotext} style={{width:'23.9375rem'}}>{posts.articles[counter].content}</div>          
          </div>
        </div>
      )}
    </div>
  );
}

const formatDate = (date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

const formatTime = (date) => {
  const hours = date.getHours() % 12 || 12;
  const minutes = date.getMinutes();
  const amOrPm = date.getHours() >= 12 ? 'PM' : 'AM';
  return `${hours}:${minutes} ${amOrPm}`;
};

export default News;
