import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:3000");

interface Props {}

export const SyncEditor: React.FC<Props> = () => {
    const [value, setValue] = useState("");
    const id = useRef(`${Date.now()}`);
    const editor = useRef<any>(null);
    const remote = useRef(false);

    useEffect(() => {
        socket.on(
            "new-operation",
            ({ editorId, ops }: { editorId: string; ops: string }) => {
                if (id.current !== editorId) {
                    remote.current = true;
                    JSON.parse(ops).forEach((op: any) =>
                        editor.current!.applyOperation(op)
                    );
                    remote.current = false;
                }
            }
        );
    }, []);

    return <div>hey</div>;
};
