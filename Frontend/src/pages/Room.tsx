import './Room.css'
import Chat from '../components/Chat'

function Room() {
  return (
    <div id='room-container'>
      <WidgetButton/>
      <ExitButton/>
      <Chat/>
    </div>
  )
}

function WidgetButton() {
  const openWidgetMenu = () => {
    // TODO: Open the widget menu and make the button hide
    console.log("Opened widget menu");
  }

  return (
    <div id="widget-button" onClick={openWidgetMenu}></div>
  );
}

function ExitButton() {
  const exitRoom = () => {
    // TODO: Exit the room and go back to home page
    console.log("Exited room");
  }

  return (
    <div id="exit-button" onClick={exitRoom}>Exit Room</div>
  );
}
  
export default Room