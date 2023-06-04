import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
        inputRequest, 
        addTodo, resetTodo, updateTodo, cancelTodo, 
        markTodo,  editTodo, deleteTodo,   
        selectTodo, selectInput, selectIsEdit 
        } from './todosSlice';
import styles from './Todos.module.css';

const Todos = () => {
  
                            const todoSlice =  useSelector(selectTodo);
                            const inputSlice = useSelector(selectInput);
                            const isEditSlice = useSelector(selectIsEdit);
                            const dispatch = useDispatch();
                            
      return (<>
                <center>
                <input  className={styles.textbox} 
                        aria-label="Enter Task" 
                        value={inputSlice} 
                        onChange={(e) => dispatch(inputRequest(e.target.value))} />
        
                {(isEditSlice)?<>
                      <button className={styles.button} onClick={() => dispatch(addTodo())}>Add Task</button>
                      <button className={styles.button} onClick={() => dispatch(resetTodo())}> Reset </button>                      
                  </>
                :
                  <>
                    <button className={styles.button} onClick={()=> dispatch(updateTodo())}>Update</button>
                    <button className={styles.button} onClick={()=>dispatch(cancelTodo())}>Cancel</button>
                  </>
                }
          
                <br />
                {todoSlice.length > 0 && 
                  (<div>
                    <h3><u>To Do List</u></h3> 
                    <table border={"1px solid black"}>
                    <thead>
                      <tr>
                          <th>To-Do Task</th>
                          <th>Mark</th>
                          <th colSpan={"2"}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                    {todoSlice.filter(task => task.status === false).map((task) => {
                          return (<React.Fragment key={task.id}>
                                    <tr>
                                      <td style={{listStyleType:"none"}} >{task.title}</td>
                                      <td style={{textAlign:"center"}}>
                                          <input type="checkbox" onClick={()=>dispatch(markTodo(task.id))} value={task.title} />
                                      </td>
                                      <td>
                                          <button className={styles.pm} onClick={(e)=>{dispatch(editTodo(task.id))}} disabled={!isEditSlice}>Edit</button>
                                      </td>
                                      <td>
                                          <button className={styles.pm} onClick={() => dispatch(deleteTodo(task.id))}>Delete</button>
                                      </td>
                                    </tr>
                                  </React.Fragment>
                                  )
                            })
                    
                    }
                    </tbody>
                    </table>
                  </div>)}
                  <hr />
                
                {todoSlice.length > 0 && 
                  (<div>
                    <h3><u>Completed Task</u></h3>
                    <table border={"1px solid black"}>
                    <thead>
                      <tr>
                        <th>Completed Task</th>
                        <th>UnMark</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                  <tbody>
                  {todoSlice.filter(task => task.status === true).map((task) => {
                        return (<React.Fragment key={task.id}> 
                                <tr>
                                <td style={{textDecorationLine:"line-through", listStyleType:"none"}} > {task.title} 
                                </td>
                                <td style={{textAlign:"center"}}>
                                    <input type="checkbox" onChange={()=>dispatch(markTodo(task.id))} checked={task.status} value={task.title} /> 
                                </td>
                                <td>
                                    <button className={styles.pm} onClick={() => dispatch(deleteTodo(task.id))}>Delete</button>
                                </td>
                                </tr>
                                </React.Fragment>
                                )})
                  }
                  </tbody>
                  </table>
                  </div>
                  )}
              </center>
              </>
            );
      };

export default Todos;