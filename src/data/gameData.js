import bearThumbnail from "../assets/images/GameThumbnail/bear-Thumbnail.png";
import bearBanner from "../assets/images/GameThumbnail/bear-Banner.png";


const formattedObj = (value) => {
    let obj = {}
    gameArr.forEach((item)=>{
        obj[item.gameName] = item[value]
    })
    return obj;
}


export const gameArr = [{id : 4, gameName : "BEAR BAKER", thumbnail : bearThumbnail, banner : bearBanner},]

// Ex)gameBannerArr = {"BEAR BAKER" : bearBanner}
export const gameBannerArr = formattedObj("banner");

// Ex) gameIdArr = {"BEAR BAKER" : 4}
export const gameIdArr = formattedObj("id");


export const gameNameArr = gameArr.map((item)=> item.gameName);