import Notification from "./Notification";
import { render,screen } from "@testing-library/react";
import "@testing-library/jest-dom";

const props = {message:"this is a prop message",type:"error",time:1, setNotification:jest.fn()};

function MockNotification(){
    return <Notification message={props.message} type={props.type} time={props.time} setNotification={props.setNotification}/>
}


describe('Notification Page Tests', () => {

    jest.useFakeTimers();
    let interval = jest.spyOn(global,"setInterval");

    test('Page Matches Snapshot', () => {
        render(<MockNotification/>);
        expect(screen).toMatchSnapshot();
    });

    test('Page Renders Correctly', async () => {
        render(<MockNotification/>);
        let message = await screen.findByText(props.message);
        expect(message).toBeInTheDocument();
        expect(message.outerHTML.includes(props.type)).toEqual(true);
    });

    test('SetInterval is Called', async () => {
        render(<MockNotification/>);
        expect(interval).toHaveBeenCalledTimes(1);
    })
})
