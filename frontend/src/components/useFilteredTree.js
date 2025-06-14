// Hook: tracks changes in expandedNodes
import { useMemo } from "react";
import getNodePath from "./utils/getNodePath"; // or inline it here
import treeObject from "../d3/treeObject.js";
import data from "../../data/test.js";

export default function useFilteredTree(expandedNodes) {
  return useMemo(() => {
    const dataCopy = JSON.parse(JSON.stringify(data));

    function filterChildren(node, parentPath = "") {
      const nodePath = getNodePath(node, parentPath);  // generates unique path for a given node
      const isRoot = !parentPath;                      // is node the root node?
      const isExpanded = isRoot || expandedNodes.has(nodePath);
      node._nodePath = nodePath;
      
      if (node.children?.length) {
        node.children = isExpanded
          ? node.children.map(child => filterChildren(child, nodePath))
          : [];
      }
      return node;
    }

    const filteredData = filterChildren(dataCopy);
    return treeObject(filteredData);
  }, [expandedNodes]);
}
