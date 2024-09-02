import { useState, useEffect } from 'react';
import './WidgetsContainer.css'

function WidgetsContainer() {
  const [widgets, setWidgets] = useState([]);
  
  useEffect(() => {
    getWidgets();
  }, []);

  const getWidgets = () => {
    // TODO: Send a request to the server to get the widgets info
    console.log("Got widgets");
    setWidgets([]);
  }

  return (
    <div id='widgets-container'>
      {widgets.map((widget:any) => (
        // TODO: Display the widgets
        <div>{widget.id}</div>
      ))}
    </div>
  )
}

export default WidgetsContainer