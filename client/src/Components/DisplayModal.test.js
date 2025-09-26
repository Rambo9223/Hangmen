// modal renders, opens on button click, props are passed and closes on click
import DisplayModal from "./DisplayModal";
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';

const modalProps = {
    body:"This is the modal body", 
    buttonText:"Open",
    buttonVariant:"primary", 
    title:"Modal Title"
}

describe('DisplayModal Tests', () => {

    test('Page matches snapshot', () => {
        render(<DisplayModal/>);
        expect(screen).toMatchSnapshot();
    })

    test('Button shows on render', async () => {
        render(<DisplayModal/>);
        let button = await screen.findByRole("button");
        expect(button).toBeInTheDocument();
    });

    test('Modal opens, props pass, modal closes', async () => {
        render(<DisplayModal body={modalProps.body} buttonText={modalProps.buttonText} buttonVariant={modalProps.buttonVariant} title={modalProps.title}/>);

        let button = await screen.findByText("Open");

        expect(button).toBeInTheDocument();
        expect(screen.queryByText(modalProps.title)).toEqual(null);

        act(()=>{
            fireEvent.click(button);
        });

        let modalBody = await screen.findByText(modalProps.body);
        let modalTitle = await screen.findByText(modalProps.title);
        let closeButton = await screen.findByText("Close",{exact:false});
        
        expect(modalBody).toBeInTheDocument();
        expect(modalTitle).toBeInTheDocument();
        expect(closeButton).toBeInTheDocument();

        
        await waitFor(()=>{
            fireEvent.click(closeButton);
            expect(screen.queryByText(modalProps.body)).toEqual(null);
            expect(screen.queryByText(modalProps.title)).toEqual(null);
            expect(screen.queryByText("Close")).toEqual(null);
        })
    });

});