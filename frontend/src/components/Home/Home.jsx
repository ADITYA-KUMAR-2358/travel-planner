import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import "./home.css"
import video from '../../Assets/video.mp4'
import { GrLocation } from 'react-icons/gr'
import { FiFacebook } from 'react-icons/fi'
import { AiOutlineInstagram } from 'react-icons/ai'
import { FaTripadvisor } from 'react-icons/fa'
import { BsListTask, BsCalendar3, BsMap, BsStar, BsSearch } from 'react-icons/bs'
import { TbApps } from 'react-icons/tb'

import Aos from "aos"
import 'aos/dist/aos.css'

const Home = () => {
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState({
    destination: '',
    date: '',
    maxPrice: 5000
  });

  useEffect(()=>{
    Aos.init({duration: 2000})
  }, [])

  const handleSearch = () => {
    navigate('/destinations', { state: { filters: searchData } });
  };

  const handlePriceChange = (e) => {
    setSearchData({ ...searchData, maxPrice: e.target.value });
  };

  return (
    <section className='home'>
      <div className="overlay"></div>
      <video src={video} muted autoPlay loop type="video/mp4"></video>

      <div className="homeContent container">
        <div className="textDiv">

          <span data-aos="fade-up" className="smallText">
            Our Packages
          </span>

          <h1 data-aos="fade-up" className="homeTitle">Search Your Holiday </h1>

        </div>

        <div data-aos="fade-up" className="cardDiv grid">
          <div className="destinationInput">
            <label htmlFor="city">Search your destination:</label>
            <div className="input flex">
              <input 
                type="text" 
                placeholder='Enter name here....' 
                value={searchData.destination}
                onChange={(e) => setSearchData({ ...searchData, destination: e.target.value })}
              />
              <GrLocation className='icon' />
            </div>
          </div>

          <div className="dateInput">
            <label htmlFor="date">Select your date:</label>
            <div className="input flex">
              <input 
                type="date" 
                value={searchData.date}
                onChange={(e) => setSearchData({ ...searchData, date: e.target.value })}
              />
            </div>
          </div>

          <div className="priceInput">
            <div className="label_total flex">
              <label htmlFor="price">Max Price:</label>
              <h3 className="total">${searchData.maxPrice}</h3>
            </div>
            <div className="input flex">
              <input 
                type="range" 
                max='5000' 
                min='1000' 
                value={searchData.maxPrice}
                onChange={handlePriceChange}
              />
            </div>
          </div>

          <div className="searchOptions flex" onClick={handleSearch}>
            <BsSearch className='icon' />
            <span>SEARCH DESTINATIONS</span>
          </div>

          <div className="featureButtons grid">
            <button className="featureBtn" onClick={() => navigate('/itinerary')}>
              <BsCalendar3 className='icon' />
              <span>Itinerary Builder</span>
            </button>
            <button className="featureBtn" onClick={() => navigate('/bookings')}>
              <BsListTask className='icon' />
              <span>My Bookings</span>
            </button>
            <button className="featureBtn" onClick={() => navigate('/destinations')}>
              <BsMap className='icon' />
              <span>Explore Maps</span>
            </button>
            <button className="featureBtn" onClick={() => navigate('/destinations')}>
              <BsStar className='icon' />
              <span>Reviews</span>
            </button>
          </div>

        </div>

        <div data-aos="fade-up" className="homeFooterIcons flex">

          <div className="rightIcons">
            <FiFacebook className='icon' />
            <AiOutlineInstagram className='icon' />
            <FaTripadvisor className='icon' />
          </div>

          <div className="leftIcons">
            <BsListTask className='icon' />
            <TbApps className='icon' />
          </div>

        </div>



      </div>

    </section>
  )
}

export default Home;