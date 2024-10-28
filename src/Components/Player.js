import { useEffect, useRef, useState } from "react";
import pausImg from "../Resources/controls-pause-svgrepo-com.svg"
import playImg from "../Resources/controls-play-svgrepo-com.svg"
import forwImg from "../Resources/forwar-svgrepo-com.svg"
import backImg from "../Resources/rewind-svgrepo-com.svg"
const audio=new Audio();
export default function Player({song,data,changeSong}){
    const pointer=useRef();
    const [percent,setPercent]=useState(0);
    var interval; 
  

    useEffect(()=>{
        pointer.current.style.width=`${percent}%`;
        if(percent===100){
            let ind=(Math.random().toFixed(1))*10;
            ind=ind%data.data.results.length;
            if(data.data.results.length>0){
                changeSong(data.data.results[ind]);
            }
        }
        // console.log(`${percent}%`);
    },[percent])
      
    const [playstatus,setPlayStatus]=useState(false);
    function handlePlay(){
        
        if(playstatus===true){
            audio.pause()
            clearInterval(interval)
            setPlayStatus(false);
            // console.log("paused");
        }
        else if(playstatus===false){ 
            audio.play()
            .then(()=>{
                setPlayStatus(true);
                interval=setInterval(()=>{
                    setPercent((audio.currentTime/audio.duration)*100);
                },250)
            })
        }
    }


    function forward(){
        if(playstatus===true){
            handlePlay();
            audio.currentTime=audio.currentTime+10;
            audio.play()
            .then(()=>{
                setPlayStatus(true)
                interval=setInterval(()=>{
                    setPercent((audio.currentTime/audio.duration)*100);
                },250)
            })
        }
        else{
            audio.currentTime=audio.currentTime+10;
            audio.play()
            .then(()=>{
                setPlayStatus(true)
                interval=setInterval(()=>{
                    setPercent((audio.currentTime/audio.duration)*100);
                },250)
            })
        }
    }
    function back(){
        if(playstatus===true){
            handlePlay();
            audio.currentTime=audio.currentTime-10;
            audio.play()
            .then(()=>{
                setPlayStatus(true)
                interval=setInterval(()=>{
                    setPercent((audio.currentTime/audio.duration)*100);
                },250)
            })
        }
        else{
            audio.currentTime=audio.currentTime-10;
            audio.play()
            .then(()=>{
               setPlayStatus(true)
               interval=setInterval(()=>{
                setPercent((audio.currentTime/audio.duration)*100);
            },250)
            })
        }
    }


    useEffect(()=>{
     
        if (song) {   
            if(playstatus===true){
                handlePlay();
                audio.src=song.downloadUrl[4]?.url;
                audio.play()
                .then(()=>{
                    setPlayStatus(true);
                    interval=setInterval(()=>{
                        setPercent((audio.currentTime/audio.duration)*100);
                    },250)
                })
            }
            if(playstatus===false){
                audio.src=song.downloadUrl[4]?.url;
                audio.play()
                .then(()=>{
                    setPlayStatus(true);
                    interval=setInterval(()=>{
                        setPercent((audio.currentTime/audio.duration)*100);
                    },250)
                }) 
            }
        }
    },[song?.id])
    
    return(
        <div className="player-body">
            <div className="timeline">
                <div ref={pointer} className="cursor"></div>
            </div>
            <div className="player-img-container"><img src={song?.image[2]?.url} alt="" /></div>
        <div className="player-song-desc">
            <h4>{song?.name} </h4>
            <h5>{song?.album?.name} </h5>
            <h5>{song?.artists?.primary[0]?.name} </h5>
        </div>
        <div  className="controles">
            <button onClick={()=>{
                back()
            }}>
            <img src={backImg} alt="" />
            </button>
            <button  onClick={()=>{
                handlePlay();
            }}>
               {playstatus?(<img src={pausImg} alt="" />):
                (<img src={playImg} alt="" />)}
            </button>
            <button  onClick={()=>{
                forward()
            }}>
                <img src={forwImg} alt="" />
            </button>
        </div>
        <div className="more-details">
            <h4>{song?.label} </h4>
            {song?<h5>Released: {song?.year} </h5>:null}
            {song?<h5>Views: {song?.playCount} </h5>:null }
        </div>
        </div>
    )
}