// App.js
function App() {
  return (
    <div className="app">
      <h1>Digital Clock</h1>
      <DigitalClock />
    </div>
  );
}

// DigitalClock component
function DigitalClock() {
  // State to store the current time
  const [time, setTime] = React.useState(new Date());
  
  React.useEffect(() => {
    // Set up interval to update time every second
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);
    
    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array means this effect runs once on mount
  
  // Format the time using toLocaleTimeString
  const formattedTime = time.toLocaleTimeString();
  
  return (
    <div className="digital-clock">
      {formattedTime}
    </div>
  );
}

// Render the App component to the DOM
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);