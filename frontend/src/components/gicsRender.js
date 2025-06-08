import React, { useMemo, useState } from "react";
import gicsTree from "../d3/gicsTree.js";
import data from "../../data/test.js";
import * as d3 from "d3";

const GicsRenderer = () => {
  const [selectedNode, setSelectedNode] = useState(null);

  const { root, dimensions } = useMemo(() => gicsTree(data), []);

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "auto" }}>
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
            <g
              key={i}
              transform={`translate(${node.x},${node.y})`}
              onClick={() => setSelectedNode(node.data)}
              style={{ cursor: "pointer" }}
            >
              <circle r={4} fill={node.children ? "#555" : "#999"} />
              <text
                dy="0.32em"
                x={6}
                textAnchor="start"
                style={{ fontSize: 10 }}
                >
                {node.data.name}
            </text>
            </g>
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

export default GicsRenderer;
