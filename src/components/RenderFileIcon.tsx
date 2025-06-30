import IconImg from "./iconImg";
import { FileIcon } from "./SVG/file";

interface IProps {
  filename: string;
  isFolder?: boolean;
  isOpen?: boolean;
}
const extensionIconPaths: Record<string, string> = {
  tsx: "/icons/react_ts",
  jsx: "/icons/react",
  html: "/icons/html",
  js: "/icons/javascript",
  node_modules: "/icons/folder-node",

  public: "/icons/folder-public",
  src: "/icons/folder-src",
  components: "/icons/folder-components",
};

const RenderFileIcon = ({ filename, isFolder, isOpen }: IProps) => {
  const extension = filename.split(".").pop();
  if (
    extension &&
    Object.prototype.hasOwnProperty.call(extensionIconPaths, extension)
  ) {
    const iconPath = isFolder
      ? isOpen
        ? `${extensionIconPaths[extension]}-open.svg`
        : `${extensionIconPaths[extension]}.svg`
      : `${extensionIconPaths[extension]}.svg`;

    return <IconImg src={iconPath} />;
  }
  if (isFolder && !isOpen) return <IconImg src="/icons/folder-default.svg" />;
  if (isFolder && isOpen)
    return <IconImg src="/icons/folder-default-open.svg" />;

  return <FileIcon />;
};

export default RenderFileIcon;
