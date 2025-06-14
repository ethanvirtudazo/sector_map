import React from "react";

// Utility to get all descendant paths for a node
function getAllDescendantPaths(node) {
  let paths = [];
  if (node.children && node.children.length > 0) {
    node.children.forEach(child => {
      if (child.data._nodePath) {
        paths.push(child.data._nodePath);
      }
      paths = paths.concat(getAllDescendantPaths(child));
    });
  }
  return paths;
}

export default function TreeNode({ node, setSelectedNode, expandedNodes, setExpandedNodes, zoomToNode }) {
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
  // Use the most specific name available
  const nodeName = node.data.sector || node.data.industry_group || node.data.industry || node.data.root || node.data.name || "";

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

