import React, { Component } from 'react';
import Header from './Header';
import TaskList from './TaskList';

class App extends Component{
  constructor(props){
    super(props);
    this.state={
      search:'',
    }
  }
  searchText(text){
    this.setState({search:text});
  }
  render(){
    var {search}=this.state;
    return <div>
      <Header searchText={(text)=>{this.searchText(text)}}/>
      <TaskList search={search}/>
    </div>
  }
}

export default App;
