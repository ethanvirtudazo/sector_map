import React from "react";
import getAllDescendantPaths from "./utils/getAllDescendentPaths.js";


export default function TreeNode({ node, setSelectedNode, expandedNodes, setExpandedNodes }) {
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

  const nodeName = node.data.sector || node.data.industryz_group || node.data.industry || node.data.root || node.data.name || "";

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
        {nodeName}
      </text>
    </g>
  );
}

