import React, { useState, useEffect } from 'react';
import './page.css';
import './app.css';

const Movies = () => {
  const [moviesByGenre, setMoviesByGenre] = useState({});

  useEffect(() => {
    const selectedCategories = JSON.parse(localStorage.getItem('selectedCategories'));
    const apiKey = '3b8b8f1a7596045101c7d7e8c67031b5'; // Replace with your actual TMDb API key

    const fetchMoviesByGenre = async () => {
      try {
        const genreIds = getGenreIds(selectedCategories);
        const movieData = {};

        for (const genreId of genreIds) {
          const apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genreId}&page=1`;
          const response = await fetch(apiUrl);
          const data = await response.json();
          movieData[genreId] = data.results.slice(0, 4); // Limit to 4 movies per genre
        }

        setMoviesByGenre(movieData);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    if (selectedCategories) {
      fetchMoviesByGenre();
    }
  }, []);

  const getGenreIds = (selectedCategories) => {
    const genreMap = {
      action: 28,
      thriller: 53,
      romance: 10749,
      horror: 27,
      music: 10402,
      fiction: 878,
      fantasy: 14,
      western: 37,
      drama: 18,
    };

    return selectedCategories.map(category => genreMap[category.toLowerCase()]);
  };

  return (
    <div>
        <div>
        <p className="heading">Super app</p>
        <p style={{
            color: '#FFF',
            fontFamily : 'Roboto, sans-serif',
            fontSize : '1.9rem',
            fontStyle : 'normal',
            fontWeight: 400,
            lineHeight : '139.688%',
            paddingLeft : '4rem',            
        }}>Entertainment according to your choice</p>
        </div>
      {Object.keys(moviesByGenre).map(genreId => (
        <div key={genreId}>
          <h2 style={{
            color: '#878787',
            fontFamily: 'Roboto, sans-serif',
            fontSize: '1.875rem',
            fontStyle: 'normal',
            fontWeight: 500,
            lineHeight: '139.688%',
            letterSpacing: '0.0375rem',
            padding: '0',
            margin: '0',
          }}>
            {getGenreName(parseInt(genreId))} 
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent : 'space-between'}}>
            <h3>{getGenreName(parseInt(genreId))}</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              {moviesByGenre[genreId].map(movie => (
                <div key={movie.id} style={{ marginRight: '20px' }}>
                    <img
                src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
                alt={movie.title}
                style={{
                  width: '14.37044rem',
                  height: '12.02088rem',
                  flexShrink: 0,
                  paddingRight : '10px',
                }}/>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const getGenreName = (genreId) => {
  const genreMap = {
    28: 'Action',
    53: 'Thriller',
    10749: 'Romance',
    27: 'Horror',
    10402: 'Music',
    878: 'Science Fiction',
    14: 'Fantasy',
    37: 'Western',
    18: 'Drama',
    // Add more genre names and IDs as needed
  };

  return genreMap[genreId] || 'Unknown Genre';
};

export default Movies;
