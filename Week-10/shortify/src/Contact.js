import { MdCall, MdChat, MdMail} from 'react-icons/md';
import './styles/Contact.css'
function Contact() {
    return (
      <div className="Contact">
        <h1>We are here to help</h1>
        <div className='row'>
          <div className='col'>
            <button className="contactBtn">
              <MdCall/>
            </button>
            <h1>Call Us</h1>
            <p>You can call Us at +91 828 285 9995</p>
          </div>
          <div className='col'>
            <button className="contactBtn">
              <MdChat/>
            </button>
            <h1>Chat Live</h1>
            <p>We are available Mon 10:00AM IST - Fri 06:00PM IST</p>
          </div>
          <div className='col'>
            <button className="contactBtn">
              <MdMail/>
            </button>
            <h1>Ask a Question</h1>
            <p>Reach us at our mail info@shortly.com</p>
          </div>
        </div>
      </div>
    );
  }
  
  export default Contact;