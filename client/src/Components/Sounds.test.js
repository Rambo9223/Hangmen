import Sounds from "./Sounds";
import { render,screen,cleanup } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom";




describe('Sound Page Tests', () => {

    beforeEach(()=>{
        jest.clearAllMocks()
    })
    const play = jest.fn();
    const pause = jest.fn();



    test('SoundRef pause called on true mute', () => {
        const useRefSpy = jest.spyOn(React, 'useRef').mockReturnValueOnce({current:{ pause }});
        let mute = false; 
        render(<Sounds gameOver={{status:true,result:true}} gameRound={1} mute={mute}/>)

        expect(useRefSpy).toHaveBeenCalledTimes(1);
        expect(pause).toHaveBeenCalled();
        expect(play).not.toHaveBeenCalled();
        //cleanup();

        //render(<Sounds gameOver={{status:true,result:false}} gameRound={1} mute={mute}/>);

        //expect(useRefSpy).toHaveBeenCalledTimes(1);
        //.mockReturnValueOnce({ current: { previousSibling: { focus } } });;


    })

    /*
    test('Play on loss', () => { 
    const useRefSpy = jest.spyOn(React, 'useRef').
    
    mockReturnValue({current:{pause}}); 

    render(<Sounds gameOver={{status:true,result:true}} gameRound={6} mute={false}/>);

    expect(useRefSpy).toHaveBeenCalledTimes(2);

     })*/
})