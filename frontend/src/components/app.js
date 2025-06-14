import React, { useState } from "react";
import TreeRender from "./TreeRender.js";

const App = () => {
    const [selectedNode, setSelectedNode] = useState(null);
    const [expandedNodes, setExpandedNodes] = useState(new Set());



    return (
        <TreeRender 
            selectedNode={selectedNode}
            setSelectedNode={setSelectedNode}
            expandedNodes={expandedNodes}
            setExpandedNodes={setExpandedNodes}
        />
    );
};

export default App;