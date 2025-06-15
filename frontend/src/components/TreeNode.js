import React from "react";
import getAllDescendantPaths from "./utils/getAllDescendentPaths.js";


export default function TreeNode({ node, setSelectedNode, expandedNodes, setExpandedNodes, selectedNodeData }) {
  const nodePath = node.data._nodePath;
  const isExpanded = expandedNodes.has(nodePath);

  const handleClick = (e) => {
    e.stopPropagation();
    const newExpandedNodes = new Set(expandedNodes);
    if (isExpanded) {
      newExpandedNodes.delete(nodePath);
      getAllDescendantPaths(node).forEach(path => newExpandedNodes.delete(path));
    } else {
      newExpandedNodes.add(nodePath);
    }
    setExpandedNodes(newExpandedNodes);
    setSelectedNode(node.data);
  
  };

  const nodeName = node.data.sector
    || node.data.industry_group
    || node.data.industry
    || node.data.sub_industry
    || node.data.information
    || node.data.root
    || node.data.name
    || "";

  const isSelected = selectedNodeData && selectedNodeData._nodePath === nodePath;

  return (
    <g
      transform={`translate(${node.x},${node.y})`}
      onClick={handleClick}
      style={{ cursor: "pointer" }}
    >
      <circle r={4} fill={node.children ? "#555" : "#999"} />
      <text
        dy="0.32em"
        x={6}
        textAnchor="start"
        style={{ fontSize: 10 }}
      >
        {nodeName.split(/(?<=\s)/g).reduce((acc, word) => {
          // Group words into lines of max 18 chars (adjust as needed)
          if (!acc.length || acc[acc.length - 1].length + word.length > 18) {
            acc.push(word);
          } else {
            acc[acc.length - 1] += word;
          }
          return acc;
        }, []).map((line, i) => (
          <tspan key={i} x={6} dy={i === 0 ? 0 : "1.2em"}>
            {line}
          </tspan>
        ))}
      </text>
      {isSelected && node.data.information && (
        <foreignObject
          x={6}
          y={40}
          width={150}
          height={800}
        >
          <div
            style={{
              background: "#fff",
              border: "1px solid #ddd",
              boxShadow: "2px 2px 8px rgba(0,0,0,0.1)",
              padding: "10px",
              borderRadius: "5px",
              fontSize: "12px",
              color: "#333",
            }}
          >
            <h4 style={{ margin: "0 0 5px 0" }}>{node.data.sub_industry}</h4>
            <p style={{ margin: "0", whiteSpace: "pre-line" }}>{node.data.information}</p>
            <button
              onClick={(e) => { e.stopPropagation(); setSelectedNode(null); }}
              style={{                
                marginTop: "10px",
                padding: "5px 10px",
                background: "#f0f0f0",
                border: "1px solid #ccc",
                borderRadius: "3px",
                cursor: "pointer"
              }}
            >
              Close
            </button>
          </div>
        </foreignObject>
      )}
    </g>
  );
}

