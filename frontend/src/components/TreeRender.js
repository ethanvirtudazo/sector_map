import React, { useMemo, useRef } from "react";
import treeOject from "../d3/treeObject.js";
import data from "../../data/test.js";
import * as d3 from "d3";
import TreeNode from "./TreeNode.js";

// Helper to get a unique path for each node
function getNodePath(node, parentPath = "") {
  const nodeName = node.sector || node.industry_group || node.industry || node.root || node.name || "";
  return parentPath ? `${parentPath}/${nodeName}` : nodeName;
}

const TreeRender = ({ selectedNode, setSelectedNode, expandedNodes, setExpandedNodes }) => {
  const svgRef = useRef();
  const gRef = useRef();

  const { root, dimensions } = useMemo(() => {
    const dataCopy = JSON.parse(JSON.stringify(data));

    function filterChildren(node, parentPath = "") {
      const nodePath = getNodePath(node, parentPath);
      const isRoot = !parentPath;
      const isExpanded = isRoot || expandedNodes.has(nodePath);
      node._nodePath = nodePath;
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
    return treeOject(filteredData);
  }, [expandedNodes]);

  const centerX = dimensions.width / 2 - root.x;

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "auto" }}>
      <svg
        ref={svgRef}
        width={dimensions.width}
        height={dimensions.height}
        style={{ flex: 1 }}
      >
        <g ref={gRef} transform={`translate(${centerX}, 50)`}>
          {root.links().map((link, i) => (
            <path
              key={i}
              d={d3.linkVertical().x(d => d.x).y(d => d.y)(link)}
              fill="none"
              stroke="#ccc"
              strokeWidth={1.5}
            />
          ))}

          {root.descendants().map((node, i) => (
            <TreeNode
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

export default TreeRender;

