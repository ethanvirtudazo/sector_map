export default function getAllDescendantPaths(node) {
    let paths = [];
    if (node.children && node.children.length > 0) {
      node.children.forEach(child => {
        if (child.data._nodePath) {
          paths.push(child.data._nodePath);
        }
        paths = paths.concat(getAllDescendantPaths(child));
      });
    }
    return paths;
  }