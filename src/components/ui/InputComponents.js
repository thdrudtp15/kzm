import { useState, useEffect } from 'react';

import "./InputComponents.scss";
import searchIcon from "../../assets/images/GameList/search.svg"
import expendIcon from "../../assets/images/expend.png";

//인풋 컴포넌트의 경우 반응형 사용을 위해 해당 컴포넌트의 부모 컴포넌트로 width값을 정해주어야 합니다.
//인풋 컴포넌트를 두 개 이상 사용할 경우 inputNumber 프롭스로 인풋 식별 번호를 받아야합니다.

const InputComponents = ({
    type, 
    placeholder,
    Value, 
    Function,
    dropdownMenu,
    inputNumber = 0,
    width = "100%",
    valid,
    dropObjectOption,
    textColor,
    searchFunction
    }) => {
        
    //type : 인풋의 타입 ( search,dropbox ) --> string
    //placeholder : 플레이스홀더 --> string
    //Value : 값 ( 드롭박스의 첫 값에 사용 됨 ) --> string , number
    //Function : input 태그를 이용해 사용할 함수 --> function
    //dropdownMenu : 드롭다운에 보여주고 싶은 항목 --> Array
    //inputNumber : 인풋 식별자 ( 두 개 이상의 드롭박스 사용 시 필수 ) --> number
    //width : 길이 기본값 100%
    
    
    const [dropboxStatus,setDropboxStatus] = useState("");

    const handleDropbox = () => {
        if(dropboxStatus === "open") {
            setDropboxStatus("");
        }
        else {
            setDropboxStatus("open");
        }
    }
   
    useEffect(()=>{
        const tag = document.querySelectorAll(".click-event-box");
        function handle (e) {
            if(tag[inputNumber] !== e.target) setDropboxStatus("");
        }
        window.addEventListener("click",handle);
        return()=>{window.removeEventListener("click",handle)}
    },[])
 
    //===========================
    //검색 input 태그
    //===========================
    if(type === "search"){

        const handleEnterKey =(e)=>{
            if(e.key === "Enter")
                searchFunction();
        }

    return  <div className="input-comp__box" style={{maxWidth : width}}>
                <div className="search-input__search-icon" onClick={searchFunction}>
                    <img src={searchIcon} alt="search icon" />
                </div>
                <input type="text" className="search-input__input" placeholder={placeholder} onChange={(e)=>{Function(e.target.value)}} onKeyDown={handleEnterKey}/>
            </div>
    }



    //===========================
    //드롭박스
    //===========================
    else if (type === "dropdown"){
        return <div className="input-comp__box dropdown-option" style={{maxWidth : width}}>
                    <div className='click-event-box'  onClick={()=>{handleDropbox()}}></div>
                    <div className="dropdown__text">{Value === "" ? "Grade Selection" : Value}</div>
                    <img src={expendIcon} alt="expend" draggable={false}/>
                    {dropdownMenu && <div className={`dropdown__box ${dropboxStatus}`}>
                        {dropdownMenu?.map((item,index)=> <div className='dropdown__content' key={index} onClick={()=>{Function(item)}}>{item}</div>)}
                    </div>}
               </div>
    
    }
    //===========================
    //드롭 박스 V2 (이미지)
    //===========================
    else if (type === "dropdownV2"){
        return <div className={`input-comp__box dropdown-option`} style={{maxWidth : width}}>
                    <div className='click-event-box'  onClick={()=>{handleDropbox()}}></div>
                    <div className="dropdown__text"><img src={Value.img} alt='coin'/>{Value.name}</div>
                    <img src={expendIcon} alt="expend" draggable={false} className='dropdownV2__img'/>
                   {dropdownMenu &&  <div className={`dropdown__box ${dropboxStatus}`}>
                        {dropdownMenu?.map((item,index)=> <div className='dropdown__content' key={index} onClick={()=>{Function(item)}}>
                            <img src={item.img} alt="img" className='dropdownV2__img'/>{item.name}
                            </div>)}
                    </div>}
               </div>
    }
    //==========================`=
    //드롭 박스 스크롤
    //===========================
    else if (type === "dropdownScroll"){
        return <div className={`input-comp__box dropdown-option ${valid === false && 'invalid-input'}`} style={{width : "100%", maxWidth : width , minWidth : "62px"}}>
             <div className='click-event-box'  onClick={()=>{handleDropbox()}}></div>
                    <div className="dropdown__text">{Value}</div>
                    <img src={expendIcon} alt="expend" draggable={false} className='dropdownV2__img'/>
                   {dropdownMenu && <div className={`dropdown__box ${dropboxStatus} scroll-option`}>
                        {dropObjectOption === "country" && dropdownMenu?.map((item,index)=><div className='dropdown__content' key={index} onClick={()=>Function(item)}>{item.name}</div>)}
                        {dropObjectOption === undefined && dropdownMenu?.map((item,index)=><div className='dropdown__content' key={index} onClick={()=>Function(item)}>{item}</div>)}
                    </div>}
                </div>
    }

    //===========================
    //날짜 선택
    //===========================
    else if (type === "date") {
        return <input type='datetime-local' className={`input-comp__box date-option ${valid === false && 'invalid-input'}`} style={{maxWidth : width}} id="dates" name="date" value={Value} onChange={(e)=>{Function(e.target.value)}}/>
    }
    //===========================
    //날짜 선택(시간 제외)
    //===========================
    else if (type === "date-no-time") {
        return <input type='date' className={`input-comp__box date-option ${valid === false && 'invalid-input'}`} style={{maxWidth : width}} id="dates" name="date" value={Value} onChange={(e)=>{Function(e.target.value)}}/>
    }
    //===========================
    //일반적 인풋
    //===========================
    else if (type === "input"){
        return <input type="text" className={`input-comp__box input-option ${valid === false && 'invalid-input'}`} style={{maxWidth : width}} value={Value} onChange={Function} placeholder={placeholder}/>
    }
    //===========================
    //검정색 인풋
    //===========================
    else if (type === "inputB"  ){
        return <input type="text" className='input-comp__box--black' style={{maxWidth : width}} value={Value} onChange={Function} placeholder={placeholder} />
    }
    //===========================
    //읽기 전용 인풋
    //===========================
    else if (type === "readOnly"){
        return <input type="text" className='input-comp__box readOnly-option' style={{maxWidth : width, color : textColor}} value={Value} readOnly/>
    
    //===========================
    //border-bottom만 있는 스타일의 input
    //===========================
    }else if (type === "bottomLineInput"){
        return <input type='text' className='bottom-line__input' style={{maxWidth : width}} value={Value} placeholder={placeholder} onChange={Function}/>
    }
}
 
export default InputComponents;