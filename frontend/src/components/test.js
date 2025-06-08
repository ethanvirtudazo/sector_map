import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import data from "../../data/test.json";

const GicsTreeChart = () => {
  const chartRef = useRef();

  useEffect(() => {
    const container = chartRef.current;
    if (!container) return;
    container.innerHTML = "";

    const marginTop = 20;
    const marginRight = 100;
    const marginBottom = 20;
    const marginLeft = 100;
    const dx = 10; // horizontal spacing
    const dy = 200; // vertical spacing between levels

    function normalizeNames(node) {
      if (node.sector) node.name = node.sector;
      if (node.industry_group) node.name = node.industry_group;
      if (node.industry) node.name = node.industry;
      if (node.children) node.children.forEach(normalizeNames);
    }
    normalizeNames(data);

    const root = d3.hierarchy(data);
    const tree = d3.tree().nodeSize([dx, dy]);
    const diagonal = d3.linkVertical().x(d => d.x).y(d => d.y);

    tree(root);

    let x0 = Infinity;
    let x1 = -Infinity;
    root.each(d => {
      if (d.x < x0) x0 = d.x;
      if (d.x > x1) x1 = d.x;
    });

    const width = x1 - x0 + marginLeft + marginRight;
    const height = root.height * dy + marginTop + marginBottom;

    const svg = d3.create("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [x0 - marginLeft, 0, width, height])
      .attr("style", "display: block; margin: auto; font: 10px sans-serif; user-select: none;");

    svg.append("g")
      .attr("fill", "none")
      .attr("stroke", "#555")
      .attr("stroke-opacity", 0.4)
      .attr("stroke-width", 1.5)
      .selectAll("path")
      .data(root.links())
      .join("path")
      .attr("d", diagonal);

    const node = svg.append("g")
      .attr("stroke-linejoin", "round")
      .attr("stroke-width", 3)
      .selectAll("g")
      .data(root.descendants())
      .join("g")
      .attr("transform", d => `translate(${d.x},${d.y})`);

    node.append("circle")
      .attr("fill", d => d.children ? "#555" : "#999")
      .attr("r", 3);

    node.append("text")
      .attr("dy", "0.31em")
      .attr("y", d => d.children ? -6 : 6)
      .attr("text-anchor", "middle")
      .text(d => d.data.name)
      .clone(true).lower()
      .attr("stroke", "white");

    container.appendChild(svg.node());
  }, []);

  return (
    <div style={{
      width: "100vw",
      height: "100vh",
      overflow: "auto",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}>
      <div ref={chartRef} />
    </div>
  );
};

export default GicsTreeChart;
