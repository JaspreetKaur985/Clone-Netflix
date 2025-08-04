import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import TitleCards from '../../components/TitleCards/TitleCards';
import main_banner from '../../assets/main_banner.jpg';
import banner_title from '../../assets/banner_title.png';
import play_btn from '../../assets/play_btn.png';
import info_mark from '../../assets/info_mark.png';


const Home = () => {
  return (
    <>
      <div className='home'>
        <Navbar />
        <div className='hero'>
          <img src={main_banner} alt="Main Banner" className='banner-img' />
          <div className='hero-caption'>
            <img src={banner_title} alt="Banner Title" className='caption-img' />
            <p>
              Discovering his ties to a secret ancient order, a young man living in modern Istanbul embarks on a quest to save the city from an immortal enemy.
            </p>
            <div className="hero-btns">
              <button className='btn'>
                <img src={play_btn} alt="Play" />Play
              </button>
              <button className='btn dark-btn'>
                <img src={info_mark} alt="Info" />More info
              </button>
            </div>
          </div>
        </div>
        <div className='more-cards'>
          <TitleCards title={"Popular on Netflix"} category={"now_playing"} />
          <TitleCards title={"Blockbuster Movies"} category={"top_rated"} />
          <TitleCards title={"Only on Netflix"} category={"popular"} />
          <TitleCards title={"Upcoming"} category={"upcoming"} />
          <TitleCards title={"Top picks for you"} category={"now_playing"} />
        </div>
      </div>

      <style>{`
        .hero {
          position: relative;
        }
        .banner-img {
          width: 100%;
          mask-image: linear-gradient(to right, transparent, black 75%);
          -webkit-mask-image: linear-gradient(to right, transparent, black 75%);
        }
        .hero-caption {
          position: absolute;
          width: 100%;
          padding-left: 6%;
          bottom: 0;
        }
        .caption-img {
          width: 90%;
          max-width: 420px;
          margin-bottom: 30px;
        }
        .hero-caption p {
          max-width: 700px;
          font-size: 17px;
          margin-bottom: 20px;
          color: white;
        }
        .hero-btns {
          display: flex;
          gap: 10px;
          margin-bottom: 50px;
        }
        .hero-btns .btn img {
          width: 25px;
        }
        .hero-btns .btn {
          border: 0;
          outline: 0;
          padding: 8px 20px;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-size: 15px;
          font-weight: 600;
          background: white;
          border-radius: 4px;
          cursor: pointer;
        }
        .hero-btns .btn.dark-btn {
          color: #fff;
          background: #6d6d6eb3;
        }
        .hero-btns .btn:hover {
          background: #ffffffbf;
        }
        .hero-btns .btn.dark-btn:hover {
          background: #6d6d6eb3;
        }
        .more-cards {
          padding-left: 6%;
        }
        @media (max-width: 1024px) {
          .hero-caption .title-cards {
            display: none;
          }
          .hero-btns {
            margin-bottom: 30px;
          }
        }
        @media (max-width: 800px) {
          .hero-caption {
            padding-left: 4%;
          }
          .caption-img {
            margin-bottom: 10px;
            width: 40%;
          }
          .hero-btns .btn img {
            width: 20px;
          }
          .more-cards {
            padding-left: 4%;
          }
        }
        @media (max-width: 800px) {
          .caption-img {
            display: none;
          }
          .hero-btns .btn img {
            width: 15px;
          }
          .hero-btns .btn {
            padding: 4px 10px;
            gap: 5px;
            font-size: 10px;
          }
        }
      `}</style>
    </>
  );
};

export default Home;
