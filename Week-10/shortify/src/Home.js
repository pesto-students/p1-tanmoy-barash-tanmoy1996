import {useState} from 'react';
import {GoArrowRight} from 'react-icons/go';
import homeImg from './assets/homePageImg.svg';
import ShortList from './components/ShortList';
import LinearLoader from './components/LinearLoader';
import axios from 'axios';
import './styles/Home.css'


function Home() {
  const [state, setState] = useState(
    {
      list:[],
      loading:false,
    }
  )

  function handleSubmit(e){
    e.preventDefault();
    setState({
      ...state,
      loading:true})
    var original=e.target.urlInput.value;
    axios.post(`https://api.shrtco.de/v2/shorten?url=${original}`)
    .then((res)=>{
      if(res.data.ok){
        var listItem = {
          id: state.list.length>0?state.list[state.list.length-1].id+1:1,
          full_short_link:res.data.result.full_short_link,
          original_link:res.data.result.original_link,
        }
        state.list.push(listItem);
      }
      setState({
        list:state.list,
        loading:false
      })
      e.target.urlInput.value='';
    })
    .catch((err)=>{
      console.log(err);
      setState({
        list:state.list,
        loading:false
      })
    })
  }

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
          <form className="receiveUrl" onSubmit={(e)=>handleSubmit(e)}>
            <fieldset className="textfield">
              <input type="text" placeholder="example.com" name="urlInput"/>
            </fieldset>
            <button disabled={state.loading} className="submitBtn">
              <GoArrowRight/>
            </button>
          </form>
          { state.loading && <LinearLoader/>}
          <ShortList list={state.list}/>
        </div>
      </div>
    );
  }
  
  export default Home;