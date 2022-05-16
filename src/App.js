import {useState, useEffect } from 'react';
import Card from './components/Card';
import { FaCircleNotch } from "react-icons/fa";
import Search from './components/Search';


function App() {
  const [images, setImages] = useState([]); 
  const [isLoading, setIsLoading] = useState(true);
  const [searchBar, setSearchBar] = useState(false);
  const [advSearchOp, setAdvSearchOp] = useState({order: "popular"});
  // const [settings, setSettings] = useState(false);
  const [mediaType, setMediaType] = useState("image");

  window.addEventListener("mousedown", function(e){
    const isOutsideSearchBar = !(checkParents('searchBar', e.target.parentElement) || e.target.classList.contains('searchBar'));
    if (isOutsideSearchBar && searchBar){
      setSearchBar(false)
    }
  })
  
  function checkParents(className, parent){
    if (parent.classList.contains(className)){
      return true
    }
    else if(parent.parentElement !== null){
      return checkParents(className, parent.parentElement)
    }
    else {return false}
  }

  useEffect(() => {
    if (mediaType === "image"){
      setIsLoading(true);
      const imageType = advSearchOp.imageType  || "";
      const orientation = advSearchOp.orientation  || "";
      const categories = advSearchOp.categories  || "";
      const minWidth = advSearchOp.minWidth  || "";
      const minHeight = advSearchOp.minHeight  || "";
      const sfw = advSearchOp.sfw  || "";
      fetch(`https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_API_KEY}&q=${advSearchOp.term}&per_page=100&order=${advSearchOp.order}${imageType}${orientation}${categories}${minWidth}${minHeight}${sfw}`)
      .then((res)=> res.json())
      .then((data)=> {
        setImages(data.hits);
        setIsLoading(false)
      })
      .catch((err)=> console.log(err))
    }
    else if (mediaType === "video"){
      const videoType = advSearchOp.videoType  || "";
      setIsLoading(true);
      fetch(`https://pixabay.com/api/videos/?key=${process.env.REACT_APP_PIXABAY_API_KEY}&q=${advSearchOp.term}${videoType}`)
      .then(res => res.json())
      .then((data) => {
        setImages(data.hits);
        setIsLoading(false)
      })
      .catch((err)=> console.log(err))
    }
  },[advSearchOp, mediaType])

  function sendTerm(t){
    setAdvSearchOp({
      ...advSearchOp,
      term: t,
    });
  }

  function sendSearchBar(e){
    e.stopPropagation();
    setSearchBar((c) => !c)
  }
  
  function sendSarchQ(obj){
    setAdvSearchOp({
      ...advSearchOp,
      ...obj
    });
  }

  function advSearch(value){
    setAdvSearchOp({...advSearchOp, order : value})
  }

  return (
    <div className='container mx-auto relative flex min-h-[100vh] overflow-hidden'>
      <div className="absolute right-px max-h-[30rem] top-2 searchBar">
        <Search sendTerm={sendTerm} sendSarchQ={sendSarchQ} advSearchOp={advSearch} setMediaType={setMediaType} sendSearchBar={sendSearchBar} searchBar={searchBar} mediaType={mediaType} />
      </div>
      {isLoading ? <FaCircleNotch className='m-auto loading'/> :
        images.length > 0 ? 
          <div className="flex flex-wrap	justify-evenly mx-4 sm:mt-o mt-6">
        {images.map((card) => {
            return <Card key={card.id} card={card} sendTerm={sendTerm} mediaType={mediaType} />
          })} 
          </div>
          :
        <h1 className='m-auto text-xl'>No media found</h1> 
      }
    </div>
  );
}

export default App;
