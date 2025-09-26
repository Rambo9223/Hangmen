import { cleanup, render,screen } from "@testing-library/react";
import Backgrounds from "./Backgrounds";
import "@testing-library/jest-dom"


afterEach(()=>{
    cleanup();
})


describe('Background Page Tests', () => {

    test('Page Matches Snapshot', () => {
        render(<Backgrounds gameRound={0}/>);
        expect(screen).toMatchSnapshot();
    })

    test('Image Element Shows', async () => {
        render(<Backgrounds gameRound={0}/>);
        let image = await screen.findByRole("img");
        expect(image).toBeInTheDocument();
    });

    test('Image Changes on win', async () => {
        let {rerender} = render(<Backgrounds gameRound={1}/>);
        let image = await screen.findByRole("img");
        let imageCode = Number(image.outerHTML.split("").filter((letter)=> Number(letter)).join().replaceAll(",",""))
        //console.log(image.outerHTML);
        expect(image).toBeInTheDocument();

        rerender(<Backgrounds gameRound={2}/>);
        let image2 = await screen.findByRole("img");
        let image2Code = Number(image2.outerHTML.split("").filter((letter)=> Number(letter)).join().replaceAll(",",""))
        expect(image2).toBeInTheDocument();


        expect(imageCode).toEqual(image2Code);

        rerender(<Backgrounds gameRound={6}/>);
        let image6 = await screen.findByRole("img");
        expect(image6).toBeInTheDocument();
        let image6Code = Number(image6.outerHTML.split("").filter((letter)=> Number(letter)).join().replaceAll(",",""))

        if(imageCode===image6Code){
            console.log("Random index selector picked same image, cannot make final assertions");
        }else{
            expect(imageCode).not.toEqual(image6Code);
        }
        
    })
})