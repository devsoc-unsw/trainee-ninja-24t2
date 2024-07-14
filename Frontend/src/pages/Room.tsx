import './Room.css'
import Chat from '../components/Chat'
import WidgetsContainer from '../components/WidgetsContainer'

function Room() {
  return (
    <div id='room-container'>
      <WidgetButton/>
      <ExitButton/>
      <Chat/>
      <WidgetsContainer/>
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
  )
}

function ExitButton() {
  // TODO: Delete room button if owner, potentially in the same container

  const exitRoom = () => {
    // TODO: Exit the room and go back to home page
    console.log("Exited room");
  }

  return (
    <div id="exit-button" onClick={exitRoom}>Exit Room</div>
  )
}
  
export default Room