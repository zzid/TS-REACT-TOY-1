import React, { useState, useCallback, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { Home, Room } from "@layouts";

const App: React.FC = () => {
    return (
        <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/room/:roomName" component={Room} />
        </Switch>
    );
};

export default App;
