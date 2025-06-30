import IconImg from "./IconImg";
import { FileIcon } from "./SVG/file";

interface IProps {
  filename: string;
  isFolder?: boolean;
  isOpen?: boolean;
}
const iconMap: Record<string, string> = {
  tsx: "react_ts",
  jsx: "react",
  html: "html",
  js: "javascript",
  node_modules: "folder-node",
  public: "folder-public",
  src: "folder-src",
  components: "folder-components",
};

const RenderFileIcon = ({ filename, isFolder, isOpen }: IProps) => {
  const ICON_BASE = `${import.meta.env.BASE_URL}icons/`;

  const ext = filename.split(".").pop() || "";

  if (isFolder && iconMap[filename]) {
    const name = iconMap[filename] + (isOpen ? "-open" : "");
    return <IconImg src={`${ICON_BASE}${name}.svg`} />;
  }

  if (iconMap[ext]) {
    return <IconImg src={`${ICON_BASE}${iconMap[ext]}.svg`} />;
  }

  if (isFolder) {
    const name = isOpen ? "folder-default-open" : "folder-default";
    return <IconImg src={`${ICON_BASE}${name}.svg`} />;
  }
  return <FileIcon />;
};

export default RenderFileIcon;
