export default function getNodePath(node, parentPath = "") {
    const nodeName = node.sector || node.industry_group || node.industry || node.root || node.name || "";
    return parentPath ? `${parentPath}/${nodeName}` : nodeName;
  }