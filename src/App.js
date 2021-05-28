import './App.css';
import React from 'react'
import MoviePage from './components/MoviePage';
import { useDispatch,useSelector } from "react-redux";
import {changeUsername,} from '../src/Actions/AppActions'



function App() {
  const name = useSelector((state) => state.name);
  
  const dispatch = useDispatch();
  return (
    <div className="App">
      <nav className="userNav">Username: {name} 
        <button onClick={() => changeUsername(dispatch)}>Change Name </button>
      </nav>
      <MoviePage />
    </div>
  );
}

export default App;
