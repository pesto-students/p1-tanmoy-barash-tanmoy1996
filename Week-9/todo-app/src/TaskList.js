import React, { Component } from 'react';
import AddTask from './AddTask';
import { MdDelete, MdDone, MdClose } from 'react-icons/md';
import './styles/TaskList.css'

class TaskList extends Component{
  constructor(props){
    super(props);
    this.state = {
      showAddDialog:false,
      tasks:[{
        id:1,
        title:'Demo Task 1',
        done:false,
        desc:'Details of Task1'
      },{
        id:2,
        title:'Demo Task 2',
        done:true,
        desc:'Details of Task2'
      },{
        id:3,
        title:'Demo Task 3',
        done:false,
        desc:'Details of Task3'
      }],
    }
  }
  addTask(task){
    var {tasks,showAddDialog} = this.state;
    tasks.push(task);
    this.setState({tasks:tasks, showAddDialog: !showAddDialog});
  }
  hideAddTask(){
    const {showAddDialog} = this.state;
    this.setState({showAddDialog:!showAddDialog})
  }
  removeTask(id){
    var {tasks} = this.state;
    var temp = tasks.filter((task)=>{return task.id !==id})
    this.setState({tasks:temp});
  }
  doneTask(id){
    var {tasks} = this.state;
    var task = tasks.find(tsk=>tsk.id===id);
    var idx=tasks.indexOf((task));
    task.done=!task.done;
    tasks.splice(idx,1,task)
    this.setState({tasks:tasks});
  }
  render(){
    const {tasks,showAddDialog} = this.state;
    const {search} = this.props;
    return (
        <div className="card">
          <div className="cardTitle">
            <h2>Tasks</h2>
            {
              !showAddDialog && <button className="button addTask"
              onClick={()=>{this.setState({showAddDialog:!showAddDialog})}}>
                Add Task
              </button>
            }
          </div>
          <div>
            {
              showAddDialog && <AddTask 
              tasks={tasks} 
              newTask={(task)=>{this.addTask(task)}}
              hideAddTask={()=>{this.hideAddTask()}}/>
            }
          </div>
          <div className="cardText">
            {search==='' && tasks.map(t=>{
              return <div key={t.id} className="d-flex justify-content-spaceBtw task">
                <div className="taskDetails">
                  { !t.done && <h3>{t.title}</h3> }
                  { !t.done && <p>{t.desc}</p> }
                  { t.done && <h3><s>{t.title}</s></h3> }
                  { t.done && <p><s>{t.desc}</s></p> }
                </div>
                <div className="d-flex align-center">
                  <button className="btn search" onClick={(e)=>this.doneTask(t.id)}>
                    {!t.done && <MdDone/>}
                    {t.done && <MdClose/>}
                  </button>
                  <button className="btn filter" onClick={(e)=>this.removeTask(t.id)}>
                    <MdDelete/>
                </button>
                </div>
              </div>
            })}
            {
              search !=='' && tasks.filter((t)=>{
                return t.title.toLowerCase().search(search.toLowerCase())>-1}).map(t=>{
                  return <div key={t.id} className="d-flex justify-content-spaceBtw task">
                    <div className="taskDetails">
                      { !t.done && <h3>{t.title}</h3> }
                      { !t.done && <p>{t.desc}</p> }
                      { t.done && <h3><s>{t.title}</s></h3> }
                      { t.done && <p><s>{t.desc}</s></p> }
                    </div>
                    <div className="d-flex align-center">
                      <button className="btn search" onClick={(e)=>this.doneTask(t.id)}>
                      {!t.done && <MdDone/>}
                      {t.done && <MdClose/>}
                      </button>
                      <button className="btn filter" onClick={(e)=>this.removeTask(t.id)}>
                        <MdDelete/>
                    </button>
                    </div>
                  </div>
                })
            }

          </div>
        </div>
    )
  }
}

export default TaskList;