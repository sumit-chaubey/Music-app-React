export default function SongTable({data,changeSong}){
   
return(
    <div className='song-table'>
      {data?.data?.results?.map((ele)=>(
        <button className='song-row' key={ele.id} onClick={()=>{          
            changeSong(ele)
            }}>
        <div className='img-container'><img src={ele.image[2].url} alt="song-img" /></div>
        <div className='song-desc'>
          <h4>Name : {ele?.name}</h4>
          <h5>Artist : {ele?.artists?.primary[0]?.name}</h5>
          <h5>Album : {ele?.album?.name}</h5>
        </div>
        <div className='song-duration'><h5>{(ele?.duration /60).toFixed(1)} min</h5></div>
      </button>
      ))}
    </div>
)
}