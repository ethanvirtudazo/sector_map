// src/components/TreeRender.jsx
import React, { useRef } from "react";
import useFilteredTree from "./useFilteredTree";
import * as d3 from "d3";
import TreeNode from "./TreeNode";

const TreeRender = ({ handleReset, selectedNode, setSelectedNode, expandedNodes, setExpandedNodes, zoomLevel }) => {
  const svgRef = useRef();
  const gRef = useRef();
  const { root, dimensions } = useFilteredTree(expandedNodes);

  // Calculate translation to position the tree, accounting for its leftmost point (x0)
  // and adding a fixed padding for visual appearance.
  // The initial Y translation is kept fixed to align the root at a specific vertical position.
  const translateX = -dimensions.x0 + 100; // Shift by -x0 to make the leftmost point start near 0, then add padding
  const translateY = 50; // Fixed vertical offset for the root node

  // Calculate scaled dimensions for the SVG container
  // These dimensions should be large enough to contain the entire (potentially zoomed) tree
  const scaledWidth = (dimensions.width + 200) * zoomLevel; // Add extra padding to width before scaling
  const scaledHeight = (dimensions.height + 100) * zoomLevel; // Add extra padding to height before scaling

  return (
    <div style={{ width: "100vw", height: "100vh", overflow: "auto", position: "relative" }}>
      <button
        onClick={handleReset}
        style={{ position: "absolute", top: 10, left: 10, zIndex: 1000 }}
      >
        Reset Tree
      </button>
      <svg ref={svgRef} width={scaledWidth} height={scaledHeight} style={{ flex: 1 }}>
        {/* Apply translation and scale to the main group element */}
        <g ref={gRef} transform={`translate(${translateX * zoomLevel}, ${translateY * zoomLevel}) scale(${zoomLevel})`}>
          {root.links().map((link, i) => (
            <path
              key={i}
              d={d3.linkVertical().
                x(d => d.x).
                y(d => d.y)(link)}
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
    </div>
  );
};

export default TreeRender;
