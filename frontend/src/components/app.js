// Manages UI state
import React, { useState, useEffect } from "react";
import TreeRender from "./TreeRender.js"

const EXPANDED_NODES_KEY = "expandedNodes";
const SELECTED_NODE_KEY = "selectedNode";

const App = () => {
    // Load from localStorage or use default
    const [expandedNodes, setExpandedNodes] = useState(() => {
        const saved = localStorage.getItem(EXPANDED_NODES_KEY);
        return saved ? new Set(JSON.parse(saved)) : new Set();
    });
    const [selectedNode, setSelectedNode] = useState(() => {
        const saved = localStorage.getItem(SELECTED_NODE_KEY);
        return saved ? JSON.parse(saved) : null;
    });

    // Save expandedNodes to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem(EXPANDED_NODES_KEY, JSON.stringify(Array.from(expandedNodes)));
    }, [expandedNodes]);

    // Save selectedNode to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem(SELECTED_NODE_KEY, JSON.stringify(selectedNode));
    }, [selectedNode]);

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