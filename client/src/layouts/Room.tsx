import React, { useState, useEffect } from "react";
import { Redirect, useParams } from "react-router-dom";
import { useSocket, useStorage } from "@hooks";
import { Button, TextField } from "@material-ui/core";
import { useNavigate } from "react-router-dom";

interface Props {}

interface Messages {
    user: string;
    text: string;
}

const Room: React.FC<Props> = () => {
    const navigate = useNavigate();
    const [messages, setMessages] = useState<Messages[]>([]);
    const [msg, setMsg] = useState<string>("");
    const params = useParams<{ roomName: string }>();
    const [storageUserName, setStorageUserName] = useStorage({
        key: "ZZID_APP::userName",
        type: "session",
    });

    const [socket, disconnect] = useSocket(params?.roomName);

    useEffect(() => {
        console.log(params?.roomName);
        return () => {
            disconnect();
        };
    }, [params?.roomName]);

    useEffect(() => {
        socket?.on("message", (message) => {
            setMessages([...messages, message]);
        });
        return () => {};
    }, [messages]);

    if (!params?.roomName) return <Redirect to="/" />;

    const handleInputChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const {
            target: { value },
        } = event;

        return setMsg(value);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        const { key } = event;
        console.log("key : ", key);
        if (key === "Enter") handleSubmit();
    };

    const handleSubmit = () => {
        console.log("msg:", msg);
        if (msg) {
            socket?.emit("sendMessage", msg, () => setMsg(""));
        }
    };

    return (
        <div className="room">
            <h1 onClick={() => navigate("/")}>Go home</h1>
            <h1>Room #{params?.roomName}</h1>
            <h3>And your user name is {storageUserName}</h3>
            <TextField
                fullWidth
                className="inputText"
                // label="msg"
                variant="outlined"
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                value={msg}
                // error={error}
                // helperText={error && "you have to fill this field"}
            />

            <div className="btn-area">
                <Button
                    className="btn"
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={handleSubmit}
                >
                    Confirm
                </Button>
            </div>
            {messages?.map((msg: Messages, idx: number): JSX.Element => {
                const { user, text } = msg;
                console.log("msg : ", msg);
                return (
                    <div
                        key={idx}
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            alignContent: "center",
                            justifyContent: "center",
                        }}
                    >
                        <div style={{ fontSize: "20px" }}>{user} : </div>
                        <div>{text}</div>
                    </div>
                );
            })}
        </div>
    );
};

export default Room;
