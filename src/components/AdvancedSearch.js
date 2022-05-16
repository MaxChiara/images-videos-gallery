import React from 'react';
import {useState, useEffect, useRef} from 'react';
import { capitalize } from '..';

const AdvancedSearch = ({ retrieveSearchQ, mediaType }) => {

  const [showForm, setShowForm] = useState(false);
  const [searchQ, setSearchQ] = useState({});
  const [imageType, setImageType] = useState({photo:true, illustration: true, vector: true});
  const [videoType, setVideoType] = useState({film: true, animation: true});
  const [orientation, setOrientation] = useState({vertical: true, horizontal: true});
  const [category, setCategory] = useState([]);
  const [minDim, setMinDim] = useState(["100", "100"]); //[width, height]
  const [sfw, setSfw] = useState(false);
  const firstRender = useRef(true);

  function advSearch(event) {
    event.preventDefault();
    firstRender.current = false;
    //console.log(event);
    let imageTypeList = [];
    let alignmentList = [];
    let categoriesString = [];
    let minWidth, minHeight, sfw;
    if (event.target.photo.checked){imageTypeList.push("photo")}
    if (event.target.illustration.checked){imageTypeList.push("illustration")}
    if (event.target.vector.checked){imageTypeList.push("vector")}
    let imageTypeString = "&image_type="+imageTypeList.join("+");
    if (event.target.vertical){alignmentList.push("vertical")}
    if (event.target.orizzontal){alignmentList.push("horizontal")}
    let alignmentString = "&orientation=" + alignmentList.join("+");
    let categories = [];
    for(let i = 5; i < 25; i++){
      if(event.target[i].checked){categories.push(event.target[i].name)}
    }
    if (categories.length > 0 ){categoriesString = "&category="+categories.join("+")}
    minWidth = "&min_width="+event.target[25].value;
    minHeight = "&min_height="+event.target[26].value;
    if (event.target[27].checked){
      sfw="&safesearch=true"
    }
    else {sfw="&safesearch=false"}
    setSearchQ({
      imageType : imageTypeString,
      imageOrientation : alignmentString,
      categories : categoriesString,
      minWidth : minWidth,
      minHeight : minHeight,
      sfw : sfw,
    })  
  }
  

  useEffect(() => {
    firstRender.current = false;
    //creo list con key che hanno value truthy altrimenti torno null, poi uso filter per togliere i null
    let imageTypeList = Object.entries(imageType).map((e) => e[1] ? e[0] : null).filter((e) => e);
    let imageTypeString = "&image_type="+imageTypeList.join("+");
    setSearchQ((searchQ) =>  {
      return{
         ...searchQ,
         imageType :  imageTypeString,
        }})
  }, [imageType])
  
  useEffect(() => {
    firstRender.current = false;
    //creo list con key che hanno value truthy altrimenti torno null, poi uso filter per togliere i null
    let videoTypeList = Object.entries(videoType).map((e) => e[1] ? e[0] : null).filter((e) => e);
    let videoTypeString = "&video_type="+videoTypeList.join("+");
    setSearchQ((searchQ) =>  {
      return{
         ...searchQ,
         videoType :  videoTypeString,
        }})
  }, [videoType])
  
  useEffect(() => {
    firstRender.current = false;
    //creo list con key che hanno value truthy altrimenti torno null, poi uso filter per togliere i null
    let orientationList = Object.entries(orientation).map((e) => e[1] ? e[0] : null).filter((e) => e);
    let orientationString = "&orientation="+orientationList.join("+");

    setSearchQ((searchQ) => {
      return {
        ...searchQ,
        orientation : orientationString
      }
    })
  }, [orientation])

  useEffect(() => {
    firstRender.current = false;
      setSearchQ((searchQ) => {
        return {
          ...searchQ,
          categories: category.length > 0 ? "&category="+category.join("+") : "&category=all"
        }
    })
  }, [category])

  function onCategoriesChange(e) {
    if (e.target.checked) {
      setCategory([...category, e.target.name])
    }
    else {
      setCategory(category.filter((cat) => cat !== e.target.name))
    }
  }

  function fireDim(){
    setSearchQ({
      ...searchQ,
      minWidth :  "&min_width="+minDim[0],
      minHeight :  "&min_heigth="+minDim[1],
    })
  }

  useEffect(() => {
    setSearchQ((searchQ) => {
      return {
        ...searchQ,
        sfw : "&safesearch="+sfw,
      }
    })
  }, [sfw])

  useEffect(() => {
    if (!firstRender.current){
      retrieveSearchQ(searchQ)
    }
  }, [searchQ])


  return (
    <>
    <p className='z-10 absolute leading-5 rounded-b text-[0.5em] w-full text-left top-[47px] bg-slate-400 px-2 cursor-pointer hover:text-slate-500' onClick={()=> setShowForm(!showForm)} >Advanced Search</p>
    <form onSubmit={advSearch} className={`z-0 absolute top-[65px] px-2 w-full text-left bg-slate-400 overflow-y-auto max-h-80  smoothTransition ${showForm ? "" : "formHide"}`} >
        <div className='text-[0.5em] italic border-b border-slate-500 mt-1'>
            <p className='text-[1.3em] not-italic leading-5' >{capitalize(mediaType)} type</p>
            {(mediaType === "image") &&
              <>
              <input type="checkbox" id="photo" name="photo" value="photo" className='mr-px'defaultChecked onChange={(e)=> setImageType({...imageType, photo: e.target.checked})} />
              <label htmlFor="photo" className='mr-2'>Photo</label>
              <input type="checkbox" id="illustration" name="illustration" value="illustration" className='mr-px' defaultChecked onChange={(e)=> setImageType({...imageType, illustration: e.target.checked})} />
              <label htmlFor="illustration" className='mr-2'>Illustration</label>
              <input type="checkbox" id="vector" name="vector" value="vector" className='mr-px' defaultChecked onChange={(e)=> setImageType({...imageType, vector: e.target.checked})} />
              <label htmlFor="vector" className='mr-2'>Vector</label>
              </>
            }
             {(mediaType === "video") &&
              <>
              <input type="checkbox" id="film" name="film" value="film" className='mr-px'defaultChecked onChange={(e)=> setVideoType({...videoType, film: e.target.checked})} />
              <label htmlFor="film" className='mr-2'>Film</label>
              <input type="checkbox" id="animation" name="animation" value="animation" className='mr-px' defaultChecked onChange={(e)=> setVideoType({...videoType, animation: e.target.checked})} />
              <label htmlFor="animation" className='mr-2'>Animation</label>
              </>
            }
        </div>
        { (mediaType === "image") &&
        <div className='text-[0.5em] italic border-b border-slate-500 mt-1'>
            <p className='text-[1.3em] not-italic leading-5' >Image orientation</p>
            <input type="checkbox" id="vertical" name="vertical" value="vertical" className='mr-px'defaultChecked onChange={(e)=> setOrientation({...orientation, vertical: e.target.checked})}/>
            <label htmlFor="vertical" className='mr-2'>Vertical</label>
            <input type="checkbox" id="orizzontal" name="orizzontal" value="orizzontal" className='mr-px'defaultChecked onChange={(e)=> setOrientation({...orientation, horizontal: e.target.checked})}/>
            <label htmlFor="orizzontal" className='mr-2'>Orizzontal</label>
        </div>
        }
        <div className='text-[0.5em] italic border-b border-slate-500 mt-1'>
            <p className='text-[1.3em] not-italic leading-5' >Categories</p>
            <div className="grid auto-cols-min grid-flow-column categoriesGrid">
              <input type="checkbox" id="backgrounds" name="backgrounds" value="backgrounds" className='m-auto'onChange={(e) => onCategoriesChange(e)} />
              <label htmlFor="backgrounds" className='mr-2'>Backgrounds</label>
              <input type="checkbox" id="fashion" name="fashion" value="fashion" className='m-auto' onChange={(e) => onCategoriesChange(e)}  />
              <label htmlFor="fashion" className='mr-2'>Fashion</label>
              <input type="checkbox" id="nature" name="nature" value="nature" className='m-auto' onChange={(e) => onCategoriesChange(e)}  />
              <label htmlFor="nature" className='mr-2'>Nature</label>
              <input type="checkbox" id="science" name="science" value="science" className='m-auto' onChange={(e) => onCategoriesChange(e)}  />
              <label htmlFor="science" className='mr-2'>Science</label>
              <input type="checkbox" id="education" name="education" value="education" className='m-auto' onChange={(e) => onCategoriesChange(e)}  />
              <label htmlFor="education" className='mr-2'>Education</label>
              <input type="checkbox" id="feelings" name="feelings" value="feelings" className='m-auto' onChange={(e) => onCategoriesChange(e)}  />
              <label htmlFor="feelings" className='mr-2'>Feelings</label>
              <input type="checkbox" id="health" name="health" value="health" className='m-auto' onChange={(e) => onCategoriesChange(e)}  />
              <label htmlFor="health" className='mr-2'>Health</label>
              <input type="checkbox" id="people" name="people" value="people" className='m-auto' onChange={(e) => onCategoriesChange(e)}  />
              <label htmlFor="people" className='mr-2'>People</label>
              <input type="checkbox" id="religion" name="religion" value="religion" className='m-auto' onChange={(e) => onCategoriesChange(e)}  />
              <label htmlFor="religion" className='mr-2'>Religion</label>
              <input type="checkbox" id="places" name="places" value="places" className='m-auto' onChange={(e) => onCategoriesChange(e)}  />
              <label htmlFor="places" className='mr-2'>Places</label>
              <input type="checkbox" id="animals" name="animals" value="animals" className='m-auto' onChange={(e) => onCategoriesChange(e)}  />
              <label htmlFor="animals" className='mr-2'>Animals</label>
              <input type="checkbox" id="industry" name="industry" value="industry" className='m-auto' onChange={(e) => onCategoriesChange(e)}  />
              <label htmlFor="industry" className='mr-2'>Industry</label>
              <input type="checkbox" id="computer" name="computer" value="computer" className='m-auto' onChange={(e) => onCategoriesChange(e)}  />
              <label htmlFor="computer" className='mr-2'>Computer</label>
              <input type="checkbox" id="food" name="food" value="food" className='m-auto' onChange={(e) => onCategoriesChange(e)}  />
              <label htmlFor="food" className='mr-2'>Food</label>
              <input type="checkbox" id="sports" name="sports" value="sports" className='m-auto' onChange={(e) => onCategoriesChange(e)}  />
              <label htmlFor="sports" className='mr-2'>Sports</label>
              <input type="checkbox" id="transportation" name="transportation" value="transportation" className='m-auto' onChange={(e) => onCategoriesChange(e)}  />
              <label htmlFor="transportation" className='mr-2'>Transportation</label>
              <input type="checkbox" id="travel" name="travel" value="travel" className='m-auto' onChange={(e) => onCategoriesChange(e)}  />
              <label htmlFor="travel" className='mr-2'>Travel</label>
              <input type="checkbox" id="buildings" name="buildings" value="buildings" className='m-auto' onChange={(e) => onCategoriesChange(e)}  />
              <label htmlFor="buildings" className='mr-2'>Buildings</label>
              <input type="checkbox" id="business" name="business" value="business" className='m-auto' onChange={(e) => onCategoriesChange(e)}  />
              <label htmlFor="business" className='mr-2'>Business</label>
              <input type="checkbox" id="music" name="music" value="music" className='m-auto' onChange={(e) => onCategoriesChange(e)}  />
              <label htmlFor="music" className='mr-2'>Music</label>
            </div>
        </div>
        <div className='text-[0.5em] italic border-b border-slate-500 mt-1 leading-3'>
          <label htmlFor="min-width">Min-width:<span>{minDim[0]}</span></label><br/>
          <input type="range" id="min-width" name="min-width" min="100" max="2000" onChange={(e)=> setMinDim([e.target.value, minDim[1]])} onMouseUp={fireDim} ></input><br/>
          <label htmlFor="min-height">Min-height:<span>{minDim[1]}</span></label><br/>
          <input type="range" id="min-height" name="min-height" min="100" max="2000" onChange={(e)=> setMinDim([minDim[0], e.target.value])} onMouseUp={fireDim}></input><br/>
        </div>  
        <div className='text-[0.5em] italic border-b border-slate-500 mt-1'>
            <input type="checkbox" id="sfw" name="sfw" value="sfw" className='mr-px' onChange={(e) => setSfw(!sfw)}/>
            <label htmlFor="sfw" className='mr-2'>Safe search</label>
        </div>
    </form>
    </>
  )
}

export default AdvancedSearch