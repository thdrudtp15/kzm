import kozmoIcon from "../assets/images/NetworkTicker/koz-token.svg";
import icon from "../assets/images/NetworkTicker/coinbase-Ticker.svg";


const formattedObj = (value)=>{
    let obj = {}
    TokenDataArr.forEach((item)=>{
        obj[item.name] = item[value]
    })
    return obj;
}



//이미지가 필요한 경우
export const TokenDataArr = [{name : "KOZ", img : kozmoIcon}]

export const TokenImgArr = formattedObj("img");

//이름만 필요한 경우
export const TokenNameDataArr = TokenDataArr.map((item,index) => item.name);