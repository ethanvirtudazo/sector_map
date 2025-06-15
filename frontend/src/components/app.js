// Manages UI state
import React, { useState, useEffect } from "react";
import TreeRender from "./TreeRender.js"

const EXPANDED_NODES_KEY = "expandedNodes";
const SELECTED_NODE_KEY = "selectedNode";

const App = () => {
    // Load from localStorage or use default
    const [expandedNodes, setExpandedNodes] = useState(() => {
        // const saved = localStorage.getItem(EXPANDED_NODES_KEY);
        const saved = ""
        return saved ? new Set(JSON.parse(saved)) : new Set();
    });
    const [selectedNode, setSelectedNode] = useState(() => {
        const saved = ""
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

    const handleReset = () => {
        // Clear localStorage
        localStorage.removeItem(EXPANDED_NODES_KEY);
        localStorage.removeItem(SELECTED_NODE_KEY);

        // Reset state
        setExpandedNodes(new Set());
        setSelectedNode(null);

        // Optionally, you can set a new root node here if you want to randomize or use a different root
        // For example, if you want to use a new root, you could set a state for the root and update it here
    };

    return (
        
        <TreeRender 
            handleReset={handleReset}
            selectedNode={selectedNode}
            setSelectedNode={setSelectedNode}
            expandedNodes={expandedNodes}
            setExpandedNodes={setExpandedNodes}
        />
    );
};

export default App;