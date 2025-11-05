// import React, { createContext, useContext, useState, useEffect } from "react";

// const NotificationContext = createContext();

// export const NotificationProvider = ({ children }) => {
//   const [notifications, setNotifications] = useState(
//     JSON.parse(localStorage.getItem("notifications")) || []
//   );

//   // Save to localStorage
//   useEffect(() => {
//     localStorage.setItem("notifications", JSON.stringify(notifications));
//   }, [notifications]);

//   const addNotification = (message, type = "info") => {
//     const newNote = {
//       id: Date.now(),
//       message,
//       type,
//       time: new Date().toLocaleTimeString(),
//     };
//     setNotifications((prev) => [newNote, ...prev]);
//   };

//   const clearNotifications = () => setNotifications([]);

//   return (
//     <NotificationContext.Provider
//       value={{ notifications, addNotification, clearNotifications }}
//     >
//       {children}
//     </NotificationContext.Provider>
//   );
// };

// export const useNotifications = () => useContext(NotificationContext);

import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const getBaseURL = () => {
    const role = localStorage.getItem("role")?.toLowerCase() || "admin";
    return `https://blog-backend.onrender.com/${role}/notification`;
  };

  // Fetch from backend on load
  const fetchRecentNotifications = async () => {
    try {
      const res = await axios.get(`${getBaseURL()}/recent`);
      if (res.data.success) setNotifications(res.data.notes);
    } catch (err) {
      console.error("Failed to fetch notifications:", err);
    }
  };


  useEffect(() => {
    fetchRecentNotifications();
    console.log(fetchRecentNotifications())
  }, []);

  return (
    <NotificationContext.Provider
      value={{ notifications, fetchRecentNotifications }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => useContext(NotificationContext);
