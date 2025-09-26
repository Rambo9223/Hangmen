import { useEffect,useRef,useCallback } from "react";
import { gameover1,gameover2,gameover3,gameover4,gameover5,gameover6,gameover7,
    loop1_2,loop3,loop4,loop5,song } from "../Assets/Sounds";
const lostSounds = [gameover1,gameover2,gameover3,gameover4,gameover5,gameover6,gameover7]
const playingSounds = [loop1_2,loop3,loop4,loop5]

/* The sounds component plays the music during the game */
export default function Sounds(props){


    let gameRound = props.gameRound;// change sounds based on the round
    let gameOver = props.gameOver;// sound for a lost game
    let mute = props.mute;// user selectable mute 
    const soundRef = useRef(null);

    //TogglePlay determines if a sound should be played or paused
    const TogglePlay = useCallback(()=>{// no sound loaded in soundRef
        if(soundRef.current===null){// do nothing
            //console.log("no sound loaded")
        }
        else if(soundRef.current!==null&&mute===false){//if not muted play sound
        //console.log("Plays");
        soundRef.current.play();
        }else{// if sound is playing - mute
        //console.log("Mutes");
        soundRef.current.pause();    
        }
    },[mute]);

    
    useEffect(()=>{
    // randomiser for the gameOver sounds    
    let randomiser = Math.floor(Math.random() * (6 - 0 + 1)) + 0;
    if(soundRef.current!==null||gameOver.status===true){
        soundRef.current.pause();
    };
    // if the game has been started and is not lost
    if(gameRound>0&&gameRound<6&&gameOver.status===false){
    switch(gameRound){// play sound respective to gameRound
        case 1:
        soundRef.current = new Audio(loop1_2);// round 1 & 2 loop
        break;
        case 2:
        soundRef.current = new Audio(loop1_2);// round 1 & 2 loop
        break;
        case 3:
        soundRef.current = new Audio(playingSounds[1]); //round 3
        break;
        case 4:
        soundRef.current = new Audio(playingSounds[2]); //round 4
        break;
        case 5:
        soundRef.current = new Audio(playingSounds[3]); //round 5
        break;
        default:
    }
        soundRef.current.loop = true;// loop these sounds
        TogglePlay();
    }else if(gameRound===6){//game is won
        soundRef.current = new Audio(song); // play full song
        TogglePlay();
    }else if(gameOver.status===true&&gameOver.result===false){// game is lost 
        soundRef.current = new Audio(lostSounds[randomiser]);
        // play randomised game over sound
        TogglePlay();
    }
    },[gameOver.status,gameOver.result,gameRound,TogglePlay])

}