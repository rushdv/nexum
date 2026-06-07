import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useAuth } from "./AuthContext";

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
    const { user } = useAuth();
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        if (!user) {
            if (socket) socket.disconnect();
            setSocket(null);
            return;
        }

        const s = io("http://localhost:5000");
        s.on("connect", () => {
            s.emit("join", user.id);
        });
        setSocket(s);

        return () => {
            s.disconnect();
        };
    }, [user]);

    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    );
};

export const useSocket = () => useContext(SocketContext);
