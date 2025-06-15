// src/components/TreeRender.jsx
import React, { useRef } from "react";
import useFilteredTree from "./useFilteredTree";
import * as d3 from "d3";
import TreeNode from "./TreeNode";

const TreeRender = ({ handleReset, selectedNode, setSelectedNode, expandedNodes, setExpandedNodes }) => {
  const svgRef = useRef();
  const gRef = useRef();
  const { root, dimensions } = useFilteredTree(expandedNodes);
  const centerX = dimensions.width / 2 - root.x;

  return (
    <div style={{ width: "100vw", height: "100vh", overflow: "auto", position: "relative" }}>
      {/* <div style={{ transform: "scale(1)", transformOrigin: "0 0" }}> */}
        <button
          onClick={handleReset}
          style={{ position: "absolute", top: 10, left: 10, zIndex: 1000 }}
        >
          Reset Tree
        </button>
        <svg ref={svgRef} width={dimensions.width} height={dimensions.height} style={{ flex: 1 }}>
          <g ref={gRef} transform={`translate(${centerX}, 50)`}>
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
  // </div>
  );
};

export default TreeRender;
