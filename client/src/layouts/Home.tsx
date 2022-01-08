import React, { useState, useCallback, useEffect } from "react";
import { Modal, Button, TextField, FormControl } from "@material-ui/core";
import { useNavigate } from "react-router-dom";

import { Footer } from "@layouts";

import { useStorage, useInput } from "@hooks";

const Home: React.FC = () => {
    const [showRoomNameModal, setShowRoomNameModal] = useState(false);
    const [roomName, setRoomName] = useState("");
    // const [userName, setUserName] = useState("");
    const [error, setError] = useState(false);
    const [storageUserName, setStorageUserName] = useStorage({
        key: "ZZID_APP::userName",
        type: "session",
    });
    const [userName, onChangeUserName, setUserName] = useInput("");
    const navigate = useNavigate();

    useEffect(() => {
        console.log("start");
    }, []);

    const onClickCreate = useCallback(() => {
        setShowRoomNameModal(true);
    }, []);

    const onCloseModal = () => {
        setShowRoomNameModal(false);
    };

    const handleInputChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        type: string
    ) => {
        const {
            target: { value },
        } = event;

        if (value) setError(false);
        switch (type) {
            case "userName":
                return setUserName(value);
            case "roomName":
                return setRoomName(value);
            default:
                break;
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        const { key } = event;
        console.log("key : ", key);
        if (key === "Enter") handleSubmit();
    };

    const handleSubmit = () => {
        if (roomName === "") return setError(true);
        setStorageUserName(userName);

        return navigate(`/room/${roomName}`);
    };

    const UserNameInput = () => (
        <TextField
            fullWidth
            className="inputText"
            label="enter user name"
            variant="outlined"
            onChange={onChangeUserName}
            onKeyDown={handleKeyDown}
            value={userName}
            error={error}
            helperText={error && "you have to fill this field"}
        />
    );
    const RoomNameInput = () => (
        <TextField
            fullWidth
            className="inputText"
            label="enter room name"
            variant="outlined"
            onChange={(e) => handleInputChange(e, "roomName")}
            onKeyDown={handleKeyDown}
            value={roomName}
            error={error}
            helperText={error && "you have to fill this field"}
        />
    );
    const Buttons = () => (
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
            <Button
                className="btn"
                variant="contained"
                size="small"
                onClick={onCloseModal}
            >
                Cancel
            </Button>
        </div>
    );

    return (
        <div className="home">
            <h1>Chat & Something</h1>
            {showRoomNameModal ? (
                <FormControl className="create-room-input">
                    <UserNameInput />
                    <RoomNameInput />
                    <Buttons />
                </FormControl>
            ) : (
                <Button
                    className="create-room-btn"
                    variant="contained"
                    color="primary"
                    onClick={onClickCreate}
                >
                    Create Room
                </Button>
            )}
            <Footer />
        </div>
    );
};
