import avaxIcon from "../assets/images/NetworkTicker/avaxtoken.svg";
import coinbaseTicker from "../assets/images/NetworkTicker/coinbase-Ticker.svg";


const formattedObj = (value) => {
    let obj = {}
    NetworkDataArr.forEach((item)=>{
        obj[item.name] = item[value]
    })
    return obj;
}

//이미지가 필요한 경우
export const NetworkDataArr = [{name : "coinbase", img : coinbaseTicker}]

export const NetworkImgArr = formattedObj("img");


//이름만 필요한 경우
export const NetworkNameDataArr = NetworkDataArr.map((item,index) => item.name);