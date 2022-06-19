import {useState} from 'react';
import {GoArrowRight} from 'react-icons/go';
import homeImg from './assets/homePageImg.svg';
import ShortList from './components/ShortList';
import './styles/Home.css'


function Home() {
  const [list, setList] = useState([
    {
      full_short_link: "https://shrtco.de/KCveN",
      original_link: "http://example.org/very/long/link.html",
      id:1
    },
    {
      full_short_link: "https://shrtco.de/KCveN",
      original_link: "http://example.org/very/long/link.html",
      id:2
    }
  ])
  return (
      <div className="home">
        <img className="landingImg" 
        src={homeImg} 
        alt="Home Page Image"/>
        <div className='heading'>
          <h1>The privacy-friendly URL Shortener</h1>
          <p>With this free Link Shortener you can make Links 
            shorter and easier to remember. When visiting the 
            short-Link, the short-Link will immediately redirect 
            you to the long Link.</p>
          <div className="receiveUrl">
            <fieldset className="textfield">
              <input type="text" placeholder="example.com" id="urlInput" name="URL"/>
            </fieldset>
            <button className="submitBtn">
              <GoArrowRight/>
            </button>
          </div>
          <ShortList list={list}/>
        </div>
      </div>
    );
  }
  
  export default Home;