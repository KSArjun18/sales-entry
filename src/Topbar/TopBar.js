import React from 'react';
import './TopBar.css'

const Topbar = () => {
  const [date, setDate] = React.useState(new Date());

  React.useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="topbar">
        <div className="animated-word">Welcome to unplugapps</div>
      <div className="date-time">
        {date.toLocaleDateString()} {date.toLocaleTimeString()}
      </div>
    </div>
  );
};

export default Topbar;