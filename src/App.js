import React from 'react';
import { Todos } from "./features/todos/Todos";
// import { Users } from "./features/Users/User";
// import { AddUser} from "./features/AddUser/AddUser";
import './App.css';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';


function App() {
                return (
                        <Router>
                          <nav className="navbar">
                            <Route path="/">
                                <Link className="pm" to="/Todos">Todo Task</Link>
                                <Link className="pm" to="/Users">Users</Link>
                                <Link className="pm" to="/AddUser">Add User</Link>
                            </Route>
                          </nav>
                          <Switch>
                              <Route exact path="/">    <Redirect to = "/Todos" />   </Route>
                              <Route path="/Todos">     <Todos />                    </Route>
                              {/*
                              <Route path="/Users">     <Users />                    </Route>
                              <Route path="/AddUser">   <AddUser />                  </Route>
                              */}
                          </Switch>
                        </Router>
                        );
                }

export default App;
