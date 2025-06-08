import React, { useState } from "react";
import GicsRender from "./gicsRender.js";

const App = () => {
    const [selectedNode, setSelectedNode] = useState(null);
    const [expandedNodes, setExpandedNodes] = useState(new Set());

    return (
        <GicsRender 
            selectedNode={selectedNode}
            setSelectedNode={setSelectedNode}
            expandedNodes={expandedNodes}
            setExpandedNodes={setExpandedNodes}
        />
    );
};

export default App;