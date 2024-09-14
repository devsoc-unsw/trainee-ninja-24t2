import React, { MouseEventHandler, useRef } from "react";
import Countdown from "react-countdown";
import Draggable from "react-draggable";
import './CountdownTimer.css';


interface rendererProps {
    hours: number;
    minutes: number;
    seconds: number;
    completed: any
}

// React memo prevents this component from being rerendered accidentally 
// when another widget is rerendered
export const CountdownTimer = React.memo(() => {
    const countdownRef = useRef<any>();
    const pomodoroTime = 25 * 60 * 1000;

    const handleStartTimer = () => {
        if (countdownRef.current) {
            countdownRef.current.start();
        }
    }

    const handlePauseTimer = () => {
        if (countdownRef.current) {
            countdownRef.current.pause();
        }
    }

    // Format countdown timer
    const renderer = ({ hours, minutes, seconds, completed }: rendererProps) => {
        // Pad with zeros
        if (seconds === 0) {
            return <span>{minutes}:{"00"}</span>;
        } 
        else {
            return <span>{minutes}:{seconds}</span>;
        }
    };

    return (
        <Draggable defaultPosition={{x: -850, y: 150}}>
            <div className="countdown-timer">
                <Countdown renderer={renderer} 
                        autoStart={false} 
                        zeroPadTime={2}
                        date={Date.now() + pomodoroTime} 
                        ref={countdownRef}>
                </Countdown>
                <button className="button-default" onClick={handleStartTimer}>Start</button>
                <button className="button-default" onClick={handlePauseTimer}>Pause</button>
            </div>
        </Draggable>
    )
})