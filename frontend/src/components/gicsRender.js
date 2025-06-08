import React, { useMemo } from "react";
import gicsTree from "../d3/gicsTree.js";
import data from "../../data/test.js";
import * as d3 from "d3";
import GicsNode from "./gicsNode.js"

// Helper to get a unique path for each node
function getNodePath(node, parentPath = "") {
  const nodeName = node.sector || node.industry_group || node.industry || node.root || node.name || "";
  return parentPath ? `${parentPath}/${nodeName}` : nodeName;
}

const GicsRender = ({ selectedNode, setSelectedNode, expandedNodes, setExpandedNodes }) => {
  const { root, dimensions } = useMemo(() => {
    const dataCopy = JSON.parse(JSON.stringify(data));

    // Recursive function to filter children based on expanded state
    function filterChildren(node, parentPath = "") {
      const nodePath = getNodePath(node, parentPath);
      const isRoot = !parentPath;
      const isExpanded = isRoot || expandedNodes.has(nodePath);
      node._nodePath = nodePath; // Attach for later use
      if (node.children && node.children.length > 0) {
        if (isExpanded) {
          node.children = node.children.map(child => filterChildren(child, nodePath));
        } else {
          node.children = [];
        }
      }
      return node;
    }

    const filteredData = filterChildren(dataCopy);
    return gicsTree(filteredData);
  }, [expandedNodes]);

  return (
    <div style={{ 
        display: "flex", 
        height: "100vh", 
        overflow: "auto" }}>
      <svg
        width={dimensions.width}
        height={dimensions.height}
        style={{ flex: 1 }}
      >
        <g transform={`translate(${50 - dimensions.x0}, 50)`}>
          {root.links().map((link, i) => (
            <path
              key={i}
              d={d3.linkVertical()
                .x(d => d.x)
                .y(d => d.y)(link)}
              fill="none"
              stroke="#ccc"
              strokeWidth={1.5}
            />
          ))}

          {root.descendants().map((node, i) => (
            <GicsNode 
              key={node.data._nodePath || i} 
              node={node} 
              setSelectedNode={setSelectedNode}
              expandedNodes={expandedNodes}
              setExpandedNodes={setExpandedNodes}
            />
          ))}
        </g>
      </svg>

      {selectedNode && (
        <div
          style={{
            width: 300,
            padding: 16,
            background: "#f9f9f9",
            overflowY: "auto"
          }}
        >
          <h3>{selectedNode.name}</h3>
          <pre style={{ fontSize: 10 }}>
            {JSON.stringify(selectedNode, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default GicsRender;