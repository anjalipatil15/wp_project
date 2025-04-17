import Groups from "./Groups";
import Discover from "./Discover";
import React from "react";


const CreateServer = () => {
    return (
        <div>
        <Groups />
        <Discover />
        <div className="bg-[#393943] flex-1 h-screen overflow-y-auto">
            <div className="flex items-center justify-center h-full">
                <h1 className="text-white text-3xl">Create a Server</h1>
            </div>

    </div>
    </div>
    )};

    export default CreateServer;