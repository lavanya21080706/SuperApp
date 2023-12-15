import React, { useState, useEffect } from "react";
import CountdownTimer from './CountdownTimer';
import News from './News';
import Weather from './Weather';
import './page.css';
import user from './images/user.jpg';

function Profile() {
    const [userData, setUserData] = useState(null);
    const [categoryData, setCategoryData] = useState([]);
    const [notes, setNotes] = useState('');

    const handleNotesChange = (event) => {
        const newNotes = event.target.value;
        setNotes(newNotes);
        localStorage.setItem('userNotes', newNotes);
    };


    useEffect(() => {
        const storedData = localStorage.getItem('formData');
        if (storedData) {
            const parsedData = JSON.parse(storedData);
            setUserData(parsedData);
        }
    }, []);


    useEffect(() => {
        const categoriesData = localStorage.getItem('selectedCategories');
        if (categoriesData) {
            const parsedCategories = JSON.parse(categoriesData);
            setCategoryData(parsedCategories);
        }
    }, []);



    return (
        <div className="profile_page">
            <div className="page3">
                <div className="left_profile">
                    <div className="upper">
                        <div>
                            <div className="user_profile">
                                {userData ? (
                                    <div className="flex">
                                        <img src={user} className="user" alt="User"></img>
                                        <div className="data">
                                            <div>
                                                <p className="user_details">{userData.name}</p>
                                                <p className="user_details">{userData.email}</p>
                                                <p className="user_details">{userData.username}</p>
                                            </div>
                                            <div>
                                                <div>
                                                    <div className="selected-labels">
                                                        {categoryData.map((category, index) => (
                                                            <div className="labels">
                                                            <span key={index} className="label">{category}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : null}
                            </div><br />
                            <div>
                                <Weather />
                            </div>
                        </div>
                        <div className="notes">
                            <h2 className="all_notes">All Notes</h2>
                            <textarea class="textarea" placeholder="This is how I am going to learn MERN Stack in next 3 months." value={notes} onChange={handleNotesChange}></textarea>
                        </div>
                    </div><br />
                    <div className="lower">
                        <CountdownTimer />
                    </div>
                </div>
                <div className="right_profile">
                    <News />
                </div>

            </div>
            <button className="browse">Browse</button>
        </div>
    );
}

export default Profile;