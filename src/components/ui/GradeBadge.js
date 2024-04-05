import "./GradeBadge.scss";
import generalBadge from "../../assets/images/CardList/general-badge.svg";
import premiumBadge from "../../assets/images/CardList/premium-badge.svg";
import platinumBadge from "../../assets/images/CardList/platinum-badge.svg";

const GradeBadge =({grade = "general"})=>{
    let img;
    const gradeLower = grade.toLocaleLowerCase();
    if(gradeLower === "general"){
        img = generalBadge;
    }else if (gradeLower === "premium"){
        img = premiumBadge;
    }else{
        img = platinumBadge
    }

    return <div className={`grade-button__border ${gradeLower+"-border"}`}>
        <div className={`grade-button__content ${gradeLower}`}>
            <img src={img} alt="badge" draggable={false}/> {gradeLower.toUpperCase()}
        </div>
    </div>
}

export default GradeBadge;