import { io, Socket } from "socket.io-client";
import { useStorage } from "./";

const serverUrl =
    process.env.NODE_ENV === "production" ? "" : "http:/localhost:8000";

const ENDPOINT = "https://zzid-chat-server-first.herokuapp.com/";

const sockets: { [key: string]: Socket } = {};
const useSocket = (room?: string): [Socket | undefined, () => void] => {
    if (!room) {
        return [undefined, disconnect];
    }
    if (!sockets[room]) {
        // sockets[room] = io(`${serverUrl}/room-${room}`, {
        //     transports: ["websocket"],
        // });
        sockets[room] = io(ENDPOINT);
        sockets[room].emit("join", { name: "test", room }, (err: any) =>
            console.log(err)
        );
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

// const useSocket = (room?: string): [Socket | undefined, () => void] => {
//     if (!room) {
//         return [undefined, disconnect];
//     }
//     sockets[room] = io(ENDPOINT);
//     console.info("create socket", room, sockets[room].id);

//     const disconnect = () => {
//         if (room && sockets[room]) {
//             sockets[room].disconnect();
//             delete sockets[room];
//         }
//         return [sockets[room], disconnect];
//     };
// };
export default useSocket;
