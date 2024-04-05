//========================
//버튼 컴포넌트 안내
//========================
//width ,height ,position , color, borderRadius는 css 스타일입니다.
//원하시는 크기, 포지션, 색상을 props로 보내주시면 됩니다.
//addClass의 경우 원하시는 클래스를 보내주시되 Button.scss 에서 새로 작성하셔야 합니다.
//handleClick의 경우 버튼을 눌렀을 시 실행하고 싶은 함수를 보내주시면 됩니다.
//text 는 기입할 텍스트를 받습니다.
//----현재 가능 색상 : yellow , red, gray


import styles from "./Button.module.scss";

const Button = ({width, 
                height, 
                position, 
                color,
                borderRadius, 
                padding,
                fontSize,
                text, 
                addClass, 
                handleClick,
                fontWeight = "400",
                custom1,
                custom2,
                custom3,
                }) =>{

                //width : width --> string
                //height : height --> string
                //position : position --> string
                //color : background-color --> "yellow", "gray", "red" 
                //borderRadius : border-radius --> string
                //padding : padding --> string  !!! 패딩값의 경우 원하는 값에서 8정도를 빼야 올바른 값이 나옵니다...
                //fontSize : font-size --> string
                //text : 버튼에 들어갈 텍스트 --> string, number
                //addClass : 추가할 클래스 (사용 전 Button.module.scss에 클래스 추가후 사용) --> string
                //handleClick : 버튼을 눌렀을 시 실행할 함수 --> function
                //fontWeight : 폰트의 굵기 --> string



                let cursor;
                switch(color){
                    case "gray" :
                    cursor = "default";
                    break;
                    default :
                    cursor = "pointer";    
                    }

    return <div className={`${styles.Common__button__outter} 
                            ${addClass === "All"&& styles.All}
                            ${addClass === "Connected" && styles.Connected}
                            `} 
                            style={{position : position, borderRadius : borderRadius ,...custom1}}
                            onClick={color !== "gray" ? handleClick : null}
                             >
                <div className={`${styles.Common__button__inner_0} 
                                ${color === "yellow" && styles.Common__button__inner_0_bg_yellow}
                                ${color === "red" && styles.Common__button__inner_0_bg_red}
                                ${color === "gray" && styles.Common__button__inner_0_bg_gray}
                                ${color === "blue" && styles.Common__button__inner_0_bg_blue}
                                ${color === "purple" && styles.Common__button__inner_0_bg_purple}
                                ${color === "pink" && styles.Common__button__inner_0_bg_pink}
                                ${color === "green" && styles.Common__button__inner_0_bg_green}
                                ${color === "black" && styles.Common__button__inner_0_bg_black}
                                `}
                                style={{width : width, height : height, borderRadius : borderRadius,cursor : cursor, ...custom2}}
                                >
                <div className={`${styles.Common__button__inner_1} 
                                ${color === "yellow" && styles.Common__button__inner_1_bg_yellow}
                                ${color === "red" && styles.Common__button__inner_1_bg_red}
                                ${color === "gray" && styles.Common__button__inner_1_bg_gray}
                                ${color === "blue" && styles.Common__button__inner_1_bg_blue}
                                ${color === "purple" && styles.Common__button__inner_1_bg_purple}
                                ${color === "pink" && styles.Common__button__inner_1_bg_pink}
                                ${color === "green" && styles.Common__button__inner_1_bg_green}
                                ${color === "black" && styles.Common__button__inner_1_bg_black}
                                `}
                                style={{ borderRadius : borderRadius,fontSize : fontSize, padding : padding,fontFamily : `ReemKufi${fontWeight}`,...custom3}}
                                >{text}
                </div>
            </div>
        </div>
}

export default Button;