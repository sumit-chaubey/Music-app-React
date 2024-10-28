import { useEffect, useState } from 'react';
import './App.css';
import Headder from './Components/Headder';
import SongTable from './Components/SongTable';

import Player from './Components/Player';
import { Routes,Route, useNavigate } from 'react-router-dom';
function App() {
  const navigate=useNavigate();
  const savedStr=localStorage.getItem('data');
  const data=JSON.parse(savedStr);
 
  const [res,setRes]=useState({});
  function setResponse(param1){
      setRes(param1);
  }

  const[song,setSong]=useState();
  function changeSong(ele){ 
    setSong(ele);
  }

  useEffect(()=>{
    navigate('/')
  },[])



  return (
    
   <div className='app'>
   <div className='head'>
    <Headder setResponse={setResponse}></Headder >
    </div>

   <div className='main-body'>
    <Routes>  
   <Route path='/' element={<SongTable data={data} changeSong={changeSong} action={"delete"}/>} />
   <Route path="/search" element={<SongTable data={res} changeSong={changeSong} action={"download"}/>} />
    </Routes>
   </div>


   <div className='player'>
    <Player song={song} data={data} changeSong={changeSong}></Player>
   </div>

   </div>
   
  );
}

export default App;
