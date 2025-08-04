import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const TitleCards = ({ title, category }) => {
  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYTQ0NmIxNTY1NmZmYTJmNDI2MzFlYTY0NmMzYzIzYiIsIm5iZiI6MTcyNjEyNTQxMy43MDQ2NjcsInN1YiI6IjY2ZDVlNTYxNTBmODQyYzAyODI3NjE1NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mx_Txdt38FQMac8XaCYt3iT20JmzMias0zmaiFo2F1s',
    },
  };

  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  };

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${category ? category : 'now_playing'}?language=en-US&page=1`,
      options
    )
      .then((response) => response.json())
      .then((response) => setApiData(response.results))
      .catch((err) => console.error(err));

    cardsRef.current?.addEventListener('wheel', handleWheel);
  }, []);

  return (
    <>
      <div className="title-cards">
        <h2>{title ? title : 'Popular on Netflix'}</h2>
        <div className="card-list" ref={cardsRef}>
          {apiData.map((card, index) => (
            <Link to={`/player/${card.id}`} className="card" key={index}>
              <img
                src={`https://image.tmdb.org/t/p/w500${card.backdrop_path}`}
                alt={card.name}
              />
              <p>{card.original_title}</p>
            </Link>
          ))}
        </div>
      </div>

      
      <style>{`
        .title-cards {
          margin-top: 50px;
          margin-bottom: 30px;
        }

        .title-cards h2 {
          margin-bottom: 8px;
          color: #fff;
        }

        .card-list {
          display: flex;
          gap: 10px;
          overflow-x: scroll;
        }

        .card-list::-webkit-scrollbar {
          display: none;
        }

        .card-list img {
          width: 240px;
          border-radius: 4px;
          cursor: pointer;
        }

        .card-list .card {
          position: relative;
          text-decoration: none;
        }

        .card-list .card p {
          position: absolute;
          bottom: 10px;
          right: 10px;
          color: #fff;
          text-shadow: 1px 1px 2px #000;
        }

        @media (max-width: 800px) {
          .title-cards {
            margin-top: 20px;
            margin-bottom: 0;
          }

          .title-cards h2 {
            font-size: 20px;
          }

          .card-list img {
            width: 165px;
          }

          .card-list p {
            font-size: 12px;
          }
        }
      `}</style>
    </>
  );
};

export default TitleCards;

