import { Link } from "react-router-dom";
import './styles/Navbar.css'
function Navbar() {
  return (
    <nav className="navbar">
      <h2 className="logo"> 
      <span className="s">S</span>
      <span className="h">h</span>
      <span className="o">o</span>
      <span className="r">r</span>
      <span className="t">t</span>
      <span className="i">i</span>
      <span className="f">f</span>
      <span className="y">y</span> 
      </h2>
      <ul className="nav">
        <li className="nav--link">
          <Link className="nav--link-item" to="/">Home</Link>
        </li>
        <li className="nav--link">
          <Link className="nav--link-item" to="/contact">Contact</Link>
        </li>
      </ul>
    </nav>
  );
}
  
  export default Navbar;