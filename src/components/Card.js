import {capitalize} from '../index.js'
import React from 'react'
import {FaPlay} from 'react-icons/fa'

const Card = ({card, sendTerm, mediaType}) => {
  const tags = card.tags.split(",");
  const src = mediaType === "image" ? card.webformatURL : " https://i.vimeocdn.com/video/"+card.picture_id+"_960x540.jpg";

  function openMedia(){
    if (mediaType === "image"){
      window.open(card.largeImageURL)
    }
    else if (mediaType === "video"){
      if (card.videos.large.url){
        window.open(card.videos.large.url)
      }
      else {window.open(card.videos.medium.url)}
    }
  }

  return (
    <div className="my-4 max-w-xs object-contain rounded overflow-hidden shadow-lg inline-block mx-1 relative" >
      <div className='flex relative vidPrev' >
        { mediaType === "video" ? 
        <FaPlay className='absolute top-2/4 left-2/4 -translate-y-1/2 -translate-x-1/2 text-slate-300/50 text-2xl' />
        : ""  
      }
        <img src={src} alt="" className='w-full max-h-[34rem] cursor-pointer hover:opacity-80 opaTrans' onClick={() => openMedia()}></img>
      </div>
      
      <div className="px-6 py-4">
        <div className="font-bold text-purple-500 text-xl mb-2">
          {capitalize(mediaType)} by <a href={`https://pixabay.com/users/${card.user}`} className='hover:text-purple-600' >{card.user}</a>
        </div>
        <ul>
          <li><strong>Views:</strong> {card.views}</li>
          <li><strong>Downloads:</strong> {card.downloads}</li>
          <li><strong>Likes:</strong> {card.likes}</li>
        </ul>
        
      </div>
      <div className="flex flex-wrap justify-evenly mt-4 px-1 mb-4">
            {tags.map((tag, i) => <div className="inline-block rounded-full bg-slate-300 hover:bg-slate-200 mb-2 px-4 py-1 min-w-fit text-center flex" key={i} >#<span onClick={(event)=> sendTerm(event.target.innerHTML)} className='inline-block min-w-fit m-auto leading-4 cursor-pointer'>{tag}</span></div>)}
        </div>
    </div>
  )
}

export default Card