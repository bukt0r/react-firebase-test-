import React from 'react';
import * as Toast from '@radix-ui/react-toast';
import { addDoc, collection, onSnapshot, updateDoc, doc, Timestamp } from "firebase/firestore";
import { db } from "./firebase";

import './App.css';

interface ToastNotification {
  id: string;
  eventDate: Date;
  message: string;
  open: boolean;
}

function App() {
  const [toasts, setToasts] = React.useState<ToastNotification[]>([]);

  React.useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'notifications'), (snapshot) => {
      const notifications = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          eventDate: data.eventDate.toDate(),
          message: data.message,
          open: data.open,
        } as ToastNotification;
      });
      setToasts(notifications);
    });

    return () => unsubscribe();
  }, []);

  const notify = async (message: string) => {
    const eventDate = new Date();
    await addDoc(collection(db, "notifications"), {
      eventDate: Timestamp.fromDate(eventDate),
      message,
      open: true
    });
  };

  const handleClose = async (id: string) => {
    await updateDoc(doc(db, "notifications", id), { open: false });
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

function prettyDate(date?: Date): string {
  return new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'short' }).format(date);
}

export default App;
