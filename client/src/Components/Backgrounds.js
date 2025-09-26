import { useEffect, useState } from "react";
import { CityBackground,MallBackground,CountrySideBackground,Polluted,Winter,Refuge } from "../Assets/Images";

/* Page to control the background images, gameRound is passed as props and the background 
changes on game won */
export default function Backgrounds({gameRound}){
    let backgrounds = [CityBackground,MallBackground,CountrySideBackground,Polluted,Winter,Refuge];
    const [index,setIndex] = useState(Math.floor(Math.random() * (5 - 0 + 1)) + 0)
    useEffect(()=>{//when game is won change index on the image array
        if(gameRound===6){
        setIndex(Math.floor(Math.random() * (2 - 0 + 1)) + 0);
        }
    },[gameRound])

    // return the background image
    return <img width={"1520px"} height={"852px"} id='background' src={backgrounds[index]} alt={`background-${index}`} />

}