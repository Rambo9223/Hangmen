import { VolumeMuteFill,VolumeUpFill } from "react-bootstrap-icons";

// button that toggles the in game music on/off
export default function MuteButton(props){

    let mute = props.mute;// current mute status - boolean
    let setMute = props.setMute;//useState function to change mute
    let gameRound = props.gameRound;//current round

    function ToggleMute(){setMute(!mute)};

    //if game is currently playing display mute, logo changes depending on mute status
    return (<>
        {(gameRound!==0)?<>
        <div id="" onClick={ToggleMute}>
        {(mute===true)?<><> <VolumeMuteFill/></></>:<><><VolumeUpFill/></></>}
        </div>
        </>:null}
    </>)
}