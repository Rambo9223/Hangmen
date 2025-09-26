import { useState, useEffect } from 'react';
// notification display component that shows for pre-determined time
export default function Notification(props) {
    let message = props.message;//message
    let type = props.type;// error or other
    let time = props.time;// time notification is shown 
    let setNotification = props.setNotification;//the usestate function to set the notification
    const [count, setCount] = useState(time);// useStae count to be used in setInterval function

    useEffect(() => {
        //Implementing the setInterval method
        const interval = setInterval(() => {
            setCount(count - 1);
        }, 1000);

        // when cound is 0 clear the interval & delete the notification
        return () => {
            if(count === 0){
                clearInterval(interval);
                setNotification({
                    message: "",
                    type: "",
                    time: 0
                });
            }
        };
    }, [count,setNotification]);

    return (
        <>
        <div className={`${type}-notification`}>
            {message}
        </div>
        </>
    )

}