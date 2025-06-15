// src/components/TreeRender.jsx
import React, { useRef } from "react";
import useFilteredTree from "./useFilteredTree";
import * as d3 from "d3";
import TreeNode from "./TreeNode";

const TreeRender = ({ selectedNode, setSelectedNode, expandedNodes, setExpandedNodes, zoomLevel }) => {
  const svgRef = useRef();
  const gRef = useRef();
  const { root, dimensions } = useFilteredTree(expandedNodes);

  // Calculate translation to position the tree, accounting for its leftmost point (x0)
  // and adding a fixed padding for visual appearance.
  // The initial Y translation is kept fixed to align the root at a specific vertical position.
  const translateX = (600 / zoomLevel) - dimensions.x0; // Further adjusted to move tree significantly to the right
  const translateY = 400; // Further adjusted to move tree significantly down

  // Calculate scaled dimensions for the SVG container
  // These dimensions should be large enough to contain the entire (potentially zoomed) tree
  const scaledWidth = (dimensions.width + 200) * zoomLevel; // Add extra padding to width before scaling
  const scaledHeight = (dimensions.height + 850) * zoomLevel; // Add extra padding to height before scaling, accounting for info card

  const marketLevelInfo = {};
  root.descendants().forEach(d => {
    if (d.data.sector && !marketLevelInfo.sector) marketLevelInfo.sector = { y: d.y, name: d.data.sector };
    if (d.data.industry_group && !marketLevelInfo.industry_group) marketLevelInfo.industry_group = { y: d.y, name: d.data.industry_group };
    if (d.data.industry && !marketLevelInfo.industry) marketLevelInfo.industry = { y: d.y, name: d.data.industry };
    if (d.data.sub_industry && !marketLevelInfo.sub_industry) marketLevelInfo.sub_industry = { y: d.y, name: d.data.sub_industry };
  });

  return (
    <div style={{ width: "100vw", height: "100vh", overflow: "auto", position: "relative" }}>
      <svg ref={svgRef} width={scaledWidth} height={scaledHeight} style={{ flex: 1 }}>
        {/* Market Level Lines and Labels */}
        {Object.entries(marketLevelInfo).map(([level, info]) => (
          <React.Fragment key={level}>
            <line
              x1={145} // Adjusted to start precisely from the edge of the labels for a connected look
              y1={(info.y * zoomLevel) + (translateY * zoomLevel)}
              x2={scaledWidth - 50} // Extend to right of scaled SVG width with padding
              y2={(info.y * zoomLevel) + (translateY * zoomLevel)}
              stroke="#ddd" // Light gray color for the lines
              strokeDasharray="4 4" // Dashed line
            />
            <text
              x={20} // Increased to ensure 20px margin from left is consistently visible
              y={(info.y * zoomLevel) + (translateY * zoomLevel)}
              dy="0.32em"
              textAnchor="start" // Align text to the start (left)
              style={{ fontSize: "15px", fill: "#555" }}
            >
              {level.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase())} {/* Capitalize and format label */}
            </text>
          </React.Fragment>
        ))}
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
              selectedNodeData={selectedNode}
            />
          ))}
        </g>
      </svg>  
    </div>
  );
};

export default TreeRender;