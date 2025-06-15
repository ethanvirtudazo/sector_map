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
            {selectedNode && selectedNode.sub_industry && selectedNode.information && ( // Ensure information exists
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "350px",
                        height: "100vh",
                        background: "#fff",
                        borderRight: "1px solid #ddd",
                        boxShadow: "2px 0 8px rgba(0,0,0,0.05)",
                        zIndex: 2000,
                        padding: "24px",
                        overflowY: "auto"
                    }}
                >
                    <h3 style={{marginTop: 0}}>{selectedNode.sub_industry}</h3>
                    <p style={{whiteSpace: "pre-line"}}>{selectedNode.information}</p>
                    <button onClick={() => setSelectedNode(null)} style={{marginTop: 16}}>Close</button>
                </div>
            )}
            <div style={{
                width: "100vw",
                height: "100vh",
                overflow: "auto",
                position: "relative",
                marginLeft: selectedNode && selectedNode.sub_industry && selectedNode.information ? 350 : 0
            }}> {/* Adjust margin when panel is open */}
                <TreeRender 
                    handleReset={handleReset}
                    selectedNode={selectedNode}
                    setSelectedNode={setSelectedNode}
                    expandedNodes={expandedNodes}
                    setExpandedNodes={setExpandedNodes}
                />
            </div>
        </>
    );
};

export default App;