import React, { Component } from 'react';
import './styles/AddTask.css'
class AddTask extends Component{
  handleSubmit(e){
    e.preventDefault();
    var form =e.target;
    if(form.title.value==''){
      window.alert("Please enter Task Title");
      return;
    }
    const {tasks,newTask} = this.props;
    var task = {
      title: form.title.value,
      desc:form.desc.value,
      done:false,
      id:tasks.length>0?tasks[tasks.length-1].id+1:1
    }
    form.title.value='';
    form.desc.value='';

    newTask(task);
  }
  cancel(){
    const {hideAddTask} = this.props;
    hideAddTask();
  }
  render(){
    return (
        <div>
          <form className="form" 
            onSubmit={(e)=>this.handleSubmit(e)}>
            <fieldset className="textfield">
              <input 
                type="text"
                name="title"
                placeholder='Task Title'
                />
            </fieldset>
            <fieldset className="textfield">
              <textarea
                rows="4"
                type="text-area"
                name="desc"
                placeholder='Task Details'
                />
            </fieldset>
                <div className="d-flex">
                <button className="btn-cancel ml-auto"
                  onClick={()=>this.cancel()}>
                    Cancel
                  </button>
                  <button type="submit" className="btn addTask">
                    Add
                  </button>
                </div>
          </form>
        </div>
    )
  }
}

export default AddTask;