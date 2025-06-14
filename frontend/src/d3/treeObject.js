import * as d3 from "d3";

function normalizeNames(node) {
  if (node.sector) node.name = node.sector;
  if (node.industry_group) node.name = node.industry_group;
  if (node.industry) node.name = node.industry;
  if (node.children) node.children.forEach(normalizeNames);
}

/**
 * Builds a D3 tree layout and returns both the root and its dimensions
 */
export default function treeOject(data, dx = 100, dy = 180) {
  const raw = JSON.parse(JSON.stringify(data));
  raw.name = raw.root;
  normalizeNames(raw);

  const root = d3.hierarchy(raw);
  d3.tree().nodeSize([dx, dy])(root);

  // Dynamically compute bounding box
  let x0 = Infinity, x1 = -Infinity, y1 = -Infinity;
  root.each(d => {
    if (d.x < x0) x0 = d.x;
    if (d.x > x1) x1 = d.x;
    if (d.y > y1) y1 = d.y;
  });

return {
  root,
  dimensions: {
    width: x1 - x0 + 300, // ← increase buffer (try 300+)
    height: y1 + 200,
    x0
  }
}
};
