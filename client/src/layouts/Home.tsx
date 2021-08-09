import React, { useState, useCallback, useEffect } from "react";
import { Modal, Button, TextField, FormControl } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const Home: React.FC = () => {
    const [showRoomNameModal, setShowRoomNameModal] = useState(false);
    const [roomName, setRoomName] = useState("");
    const [error, setError] = useState(false);
    const history = useHistory();

    useEffect(() => {
        console.log("start");
    }, []);

    const onClickCreate = useCallback(() => {
        setShowRoomNameModal(true);
    }, []);

    const onCloseModal = () => {
        setShowRoomNameModal(false);
    };

    const handleChangeRoomName = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const {
            target: { value },
        } = event;

        if (value) setError(false);
        setRoomName(value);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        const { key } = event;
        console.log("key : ", key);
        if (key === "Enter") handleSubmit();
    };

    const handleSubmit = () => {
        if (roomName === "") return setError(true);

        return history.push(`/room/${roomName}`);
    };

    return (
        <div className="home">
            <h1>Chat & Something</h1>
            <Button variant="contained" color="primary" onClick={onClickCreate}>
                Create Room
            </Button>
            <Modal
                className="room-name-input"
                disablePortal
                open={showRoomNameModal}
            >
                <FormControl>
                    <TextField
                        color="primary"
                        label="room name"
                        variant="outlined"
                        onChange={handleChangeRoomName}
                        onKeyDown={handleKeyDown}
                        value={roomName}
                        required
                        error={error}
                        helperText={error && "you have to fill this field"}
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
                        <Button
                            className="btn"
                            variant="contained"
                            size="small"
                            onClick={onCloseModal}
                        >
                            Cancel
                        </Button>
                    </div>
                </FormControl>
            </Modal>
        </div>
    );
};

export default Home;
