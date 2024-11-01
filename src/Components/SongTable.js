import download from "../Resources/download-svgrepo-com.svg"
import deleteIcon from "../Resources/delete-svgrepo-com.svg"
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import emt from '../Resources/search-propertie-svgrepo-com.svg'

export default function SongTable({data,changeSong,action}){
 
      const navigate=useNavigate();
      function downloadSong(ele){

        const data1=localStorage.getItem("data");
        console.log(data1);

          var temp=JSON.parse(data1);
          const flag=temp.data.results.find((e)=>e.id===ele.id);
          if(flag===undefined){
            temp.data.results.push(ele);
            const str=JSON.stringify(temp);
            localStorage.setItem("data",str);
            alert("Song downloaded!!");
          }
          else{
            alert("This song is already in your download list!!");
          }
      }
      function removeSong(id){
        
        const data1=localStorage.getItem("data");
        var temp=JSON.parse(data1);
        
        const newArr=temp.data.results.filter((e)=> e.id!==id);
        temp.data['results']=newArr;
        const str=JSON.stringify(temp);
       
        localStorage.setItem("data",str);
        navigate('/');
 
      }

      const decodeHtml = (html) => {
        const txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
      };
      useEffect(() => {
        const data1=localStorage.getItem("data");
        
        if(data1===null||data1.length===0){
            localStorage.setItem('data',`{   
          "success": true,
          "data": {
            "total": 0,
            "start": 0,
            "results": []
          }
          }`)
        }
      }, []);

return(
    <div className='song-table'>
      {data?.data?.results.length>0? data?.data?.results?.map((ele)=>(
        <div className="table-row" key={ele.id}>
        <button className='song-row'  onClick={()=>{          
          changeSong(ele)
        }}>
        <div className='img-container'><img src={ele.image[2].url} alt="song-img" /></div>
        <div className='song-desc'>
          <h4>Name : {decodeHtml(ele?.name)}</h4>
          <h5>Artist : {decodeHtml(ele?.artists?.primary[0]?.name)}</h5>
          <h5>Album : {decodeHtml(ele?.album?.name)}</h5>
        </div>
        <div className='song-duration'><h5>{(ele?.duration /60).toFixed(1)} min</h5></div>
        </button>
        <button className="action" onClick={()=>{
          if(action==="delete"){
            removeSong(ele.id);
          }
          else if(action==="download"){
            downloadSong(ele);
          }
        }}>{action==="delete"?<img src={deleteIcon} alt="" />:<img src={download} alt="download-icon" />}</button>
        </div>
      )):<div className="empty"> <img src={emt} alt="empty-icon"></img> <p>We did not find any songs in your {action==="download"?<>search.</>:<>downloads.</>} You can search for your favourate songs in the search box at the top to listen.</p> </div>}
    </div>
)
}