import React, { useState } from "react";
import { Redirect, useParams } from "react-router-dom";

interface Props {}

const Room: React.FC<Props> = () => {
    const params = useParams<{ roomName: string }>();
    // const {params} = useParams(<ParamTypes>)
    console.log("params : ", params);
    if (!params?.roomName) return <Redirect to="/" />;

    return (
        <div className="room">
            <h1>Room #{params?.roomName}</h1>
        </div>
    );
};

export default Room;
