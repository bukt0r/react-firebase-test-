import React from 'react';
import * as Toast from '@radix-ui/react-toast';
import './App.css';

function App() {
  const [open, setOpen] = React.useState(false);
  const eventDateRef = React.useRef(new Date());
  const timerRef = React.useRef(0);

  React.useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  const notify = () => {
    setOpen(false);
    window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => {
      eventDateRef.current = oneWeekAway();
      setOpen(true);
    }, 100);
  }

  return (
    <Toast.Provider swipeDirection="right">
      <div className="flex flex-col align-middle">
        <h1 className="text-3xl text-center">Notification System</h1>
        <div className="flex flex-col justify-center items-center h-[100vh] gap-10">
          <button
            className="Button large violet"
            onClick={notify}
          >
            Send notification #1
          </button>
          <button
            className="Button large violet"
            onClick={notify}
          >
            Send notification #2
          </button>
          <button
            className="Button large violet"
            onClick={notify}
          >
            Send notification #3
          </button>
        </div>
      </div>

      <Toast.Root className="ToastRoot" open={open} onOpenChange={setOpen}>
        <Toast.Title className="ToastTitle">Notification #1</Toast.Title>
        <Toast.Description asChild>
          <time className="ToastDescription" dateTime={eventDateRef.current.toISOString()}>
            {prettyDate(eventDateRef.current)}
          </time>
        </Toast.Description>
        <Toast.Action className="ToastAction" asChild altText="Read">
          <button className="Button small green">Read</button>
        </Toast.Action>
      </Toast.Root>
      <Toast.Viewport className="ToastViewport"/>
    </Toast.Provider>
  );
}

function oneWeekAway(date?: Date) {
  const now = new Date();
  const inOneWeek = now.setDate(now.getDate() + 7);
  return new Date(inOneWeek);
}

function prettyDate(date?: Date) {
  return new Intl.DateTimeFormat('en-US', {dateStyle: 'full', timeStyle: 'short'}).format(date);
}

export default App;
