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

    const [zoomLevel, setZoomLevel] = useState(1.5); // Initial zoom level

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
    };

    return (
        <>
            <button
                onClick={handleReset}
                style={{
                    position: "fixed", // Use fixed positioning
                    top: 10,
                    left: 10,
                    zIndex: 2001, // Ensure it's above the side panel if both are visible
                    padding: "8px 12px",
                    background: "#f0f0f0",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    cursor: "pointer"
                }}
            >
                Reset Tree
            </button>
            <div style={{
                width: "100vw",
                height: "100vh",
                overflow: "auto",
                position: "relative",
            }}> {/* Adjust margin when panel is open */}
                <TreeRender 
                    selectedNode={selectedNode}
                    setSelectedNode={setSelectedNode}
                    expandedNodes={expandedNodes}
                    setExpandedNodes={setExpandedNodes}
                    zoomLevel={zoomLevel} 
                />
            </div>
        </>
    );
};

export default App;