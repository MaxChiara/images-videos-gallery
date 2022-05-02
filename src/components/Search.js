import React, { useEffect } from 'react';
import { FaSistrix } from "react-icons/fa";
import AdvancedSearch from './AdvancedSearch';

const Search = ({sendTerm, sendSearchBar, searchBar, sendSarchQ, mediaType}) => {
    function search(e){
        if (e.code === "Enter"){
          sendTerm(e.target.value)
        }
      }
    
    function retrieveSearchQ(obj){
      sendSarchQ(obj)
    }
   
    

  return (
    <div className='overflow-x-clip'>
      <div className= {`z-10 relative top-[3px] right-0 text-2xl h-120 w-60 text-right bg-slate-300 rounded shadow-lg border-2 inline-flex flex-nowrap	flex-row space-between smoothTransition ${searchBar ? "" : "barHide"}`}>
            <input type="text" placeholder='Search tags...' className='z-10 inline-block text-base px-2' onKeyDown={(e) => search(e)}></input>
            <AdvancedSearch retrieveSearchQ={retrieveSearchQ} mediaType={mediaType} />
      </div>
      <FaSistrix className='z-20 text-2xl absolute sm:right-2 right-2 top-1.5 rounded cursor-pointer' id='searchIcon' onClick={(e) => sendSearchBar(e)}/>
    </div>
  )
}

export default Search