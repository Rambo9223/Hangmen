// modal opens with correct props, passes props and changes bool value when clicked, and modal closes
import DisplayModalAuto from './DisplayModalAuto';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

let show = true;
const handleClose = () =>{show = !show};
let modalProps = {
    body:"This is the modal body", 
    title:"Modal Title"
}


describe('DisplayModal Tests', () => {

    

    test('Page matches snapshot', () => {
        render(<DisplayModalAuto show={true}/>);
        expect(screen).toMatchSnapshot();
    });

    test('Modal opens, props pass, modal closes', async () => {
        // render page with show true
        let page = render(<DisplayModalAuto body={modalProps.body} show={show} handleClose={handleClose} title={modalProps.title}/>);

        // assert elements exist
        let modalBody = await page.findByText(modalProps.body);
        let modalTitle = await page.findByText(modalProps.title);
        let closeButton = await page.findByText("Close",{exact:false});
        
        expect(modalBody).toBeInTheDocument();
        expect(modalTitle).toBeInTheDocument();
        expect(closeButton).toBeInTheDocument();

        // click button that changes the useState value
        await waitFor(()=>{
            fireEvent.click(closeButton);
        })
        //rerender with new value
        page.rerender(<DisplayModalAuto body={modalProps.body} show={show} handleClose={handleClose} title={modalProps.title}/>)
        
        // assert elements no longer exist, in wait for as assertions happening before rerender
        await waitFor(()=>{
        expect(page.queryByText(modalProps.body)).toEqual(null);
        expect(page.queryByText(modalProps.title)).toEqual(null);
        expect(page.queryByText("Close")).toEqual(null);
        expect(show).toEqual(false);
        })
        
    });

});