import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home, Room } from "@layouts";

const App: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/room/:roomName" element={<Room />} />
        </Routes>
    );
};

export default App;
