import { io, Socket } from "socket.io-client";

const serverUrl =
    process.env.NODE_ENV === "production" ? "" : "http:/localhost:8080";

const sockets: { [key: string]: Socket } = {};
const useSocket = (room?: string): [Socket | undefined, () => void] => {
    if (!room) {
        return [undefined, disconnect];
    }
    if (!sockets[room]) {
        sockets[room] = io(`${serverUrl}/room-${room}`, {
            transports: ["websocket"],
        });
        console.info("create socket", room, sockets[room].id);
    }
    function disconnect() {
        if (room && sockets[room]) {
            sockets[room].disconnect();
            delete sockets[room];
        }
    }
    return [sockets[room], disconnect];
};

export default useSocket;
