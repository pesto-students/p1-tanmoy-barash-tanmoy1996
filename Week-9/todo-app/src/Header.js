import React, { Component } from 'react';
import { FaSearch } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';
import './styles/Header.css';
class Header extends Component{
  handleSubmit(e){
    e.preventDefault();
    var form =e.target;
    const {searchText} = this.props;
    searchText(form.search.value);
  }
  clearSearch(){
    var form = document.querySelector('#searchForm');
    form.search.value='';
    const {searchText} = this.props;
    searchText('');
  }
  render(){
    return (
    <form className='d-flex mx-16 my-8' id="searchForm"
      onSubmit={(e)=>this.handleSubmit(e)}>
      <fieldset className="textfield">
        <input 
            type="search"
            name="search"
            placeholder='Search with Task Title'
            />
      </fieldset>
        <button type="submit" className="btn search">
            <FaSearch/>
        </button>
        <button onClick={()=>this.clearSearch()} className="btn filter">
          <MdClose/>
        </button>
    </form>
    )}
}

export default Header;