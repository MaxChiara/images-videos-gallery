import { FaSistrix } from "react-icons/fa";
import AdvancedSearch from './AdvancedSearch';

const Search = ({sendTerm, sendSearchBar, searchBar, sendSarchQ, mediaType, settings, advSearchOp, setMediaType}) => {
    function search(e){
        if (e.keyCode === 13){
          sendTerm(e.target.value)
        }
      }
    
    function retrieveSearchQ(obj){
      sendSarchQ(obj)
    }
   
  return (
    <div className=''>
      <div className= {`z-10 shadow relative top-[3px] right-0 text-2xl h-[72px] w-[260px] bg-slate-300 rounded shadow-lg border-2 flex flex-nowrap items-start flex-col space-between smoothTransition ${searchBar ? "" : "barHide"}`}>
          <input type="text" placeholder='Search tags...' className='z-10 inline-block text-base px-2 w-[220px]' onKeyDown={(e) => search(e)}></input>
          <div className={`relative smoothTransition justify-between	bg-white flex flex-row flex-nowrap w-full	px-2 mt-px z-10 border`}>
            <div className='text-xs block' >
              <label htmlFor="order">Order:</label>
              <select name="order" id="order" onChange={(e) => advSearchOp(e.target.value)}>
                <option value="popular">Popular</option>
                <option value="latest">Latest</option>
              </select>
            </div>
            <div className='text-xs block' >
              <label htmlFor="mediaType">Type:</label>
              <select name="mediaType" id="mediaType" onChange={(e) => setMediaType(e.target.value)} >
                <option value="image">Images</option>
                <option value="video">Videos</option>
              </select>
            </div>
        </div>
            <AdvancedSearch retrieveSearchQ={retrieveSearchQ} mediaType={mediaType} />
      </div>
      <FaSistrix className='z-20 text-2xl absolute sm:right-2 right-2 top-1.5 rounded cursor-pointer' id='searchIcon' onClick={(e) => sendSearchBar(e)}/>
    </div>
  )
}

export default Search