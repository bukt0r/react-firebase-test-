import React from 'react';
import * as Toast from '@radix-ui/react-toast';
import './App.css';

interface ToastNotification {
  id: number;
  eventDate: Date;
  message: string;
  open: boolean;
}

function App() {
  const [toasts, setToasts] = React.useState<ToastNotification[]>([]);
  const timerRef = React.useRef<number>(0);

  React.useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  const notify = (message: string) => {
    const id = Date.now();
    const eventDate = oneWeekAway();
    setToasts((prevToasts) => [
      ...prevToasts,
      { id, eventDate, message, open: true },
    ]);
  };

  const handleClose = (id: number) => {
    setToasts((prevToasts) =>
      prevToasts.map((toast) =>
        toast.id === id ? { ...toast, open: false } : toast
      )
    );
  };

  return (
    <Toast.Provider swipeDirection="right">
      <div className="flex flex-col align-middle">
        <h1 className="text-3xl text-center">Notification System</h1>
        <div className="flex flex-col justify-center items-center h-[100vh] gap-10">
          <button
            className="Button large violet"
            onClick={() => notify('Message #1')}
          >
            Send notification #1
          </button>
          <button
            className="Button large violet"
            onClick={() => notify('Message #2')}
          >
            Send notification #2
          </button>
          <button
            className="Button large violet"
            onClick={() => notify('Message #3')}
          >
            Send notification #3
          </button>
        </div>
      </div>

      {toasts.map((toast) => (
        <Toast.Root
          key={toast.id}
          className="ToastRoot"
          open={toast.open}
          onOpenChange={(open) => handleClose(toast.id)}
        >
          <Toast.Title className="ToastTitle">{toast.message}</Toast.Title>
          <Toast.Description asChild>
            <time className="ToastDescription" dateTime={toast.eventDate.toISOString()}>
              {prettyDate(toast.eventDate)}
            </time>
          </Toast.Description>
          <Toast.Action className="ToastAction" asChild altText="Read">
            <button className="Button small green" onClick={() => handleClose(toast.id)}>
              Read
            </button>
          </Toast.Action>
        </Toast.Root>
      ))}

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
