import React, { useEffect, useState } from 'react';
import arrow_black from '../../assets/arrow_back.png';
import { useNavigate, useParams } from 'react-router-dom';

const Player = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [apiData, setApiData] = useState({
    name: '',
    key: '',
    published_at: '',
    type: ''
  });

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.REACT_APP_TMDB_TOKEN}`
    }
  };

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
      .then(response => response.json())
      .then(response => setApiData(response.results[0] || {}))
      .catch(err => console.error(err));
  }, [id]);

  return (
    <>
      <div className='player'>
        <img
          src={arrow_black}
          alt='Back'
          onClick={() => navigate(-1)}
          style={{ cursor: 'pointer' }}
        />
        {apiData.key ? (
          <iframe
            width='90%'
            height='90%'
            src={`https://www.youtube.com/embed/${apiData.key}`}
            title='trailer'
            frameBorder='0'
            allowFullScreen
          />
        ) : (
          <p>Loading trailer...</p>
        )}
        <div className='player-info'>
          <p>{apiData.published_at ? apiData.published_at.slice(0, 10) : ''}</p>
          <p>{apiData.name || ''}</p>
          <p>{apiData.type || ''}</p>
        </div>
      </div>

      <style>{`
        .player {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 20px;
          color: white;
          min-height: 100vh;
          background-color: #000;
          gap: 20px;
          position: relative;
        }
        .player img {
          align-self: flex-start;
          width: 40px;
          height: 40px;
          cursor: pointer;
          position: absolute;
          top: 20px;
          left: 20px;
          z-index: 10;
        }
        iframe {
          border-radius: 8px;
          max-width: 900px;
          width: 100%;
          aspect-ratio: 16 / 9;
        }
        .player-info {
          max-width: 900px;
          width: 100%;
          display: flex;
          justify-content: space-between;
          font-size: 14px;
          color: #ccc;
        }
        .player-info p {
          margin: 0;
        }
        @media (max-width: 768px) {
          .player {
            padding: 10px;
          }
          .player img {
            width: 30px;
            height: 30px;
            top: 10px;
            left: 10px;
          }
          iframe {
            max-width: 100%;
            height: 200px;
          }
          .player-info {
            flex-direction: column;
            gap: 8px;
            font-size: 12px;
          }
        }
      `}</style>
    </>
  );
};

export default Player;

