import { useRef } from "react";
import Countdown from "react-countdown";
import Draggable from "react-draggable";
import './CountdownTimer.css';


interface rendererProps {
    hours: number;
    minutes: number;
    seconds: number;
    completed: any
}

export const CountdownTimer = () => {
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
        return <span>{minutes}:{seconds}</span>;
    };

    return (
        <Draggable defaultPosition={{x: -850, y: 150}}>
            <div className="countdown-timer">
                <Countdown renderer={renderer} 
                        autoStart={false} 
                        date={Date.now() + pomodoroTime} 
                        ref={countdownRef}>
                </Countdown>
                <button onClick={handleStartTimer}>Start</button>
                <button onClick={handlePauseTimer}>Pause</button>
            </div>
        </Draggable>
    )
}