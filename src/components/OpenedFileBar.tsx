import { useSelector } from "react-redux";

import type { RootState } from "../app/store";
import OpenedFileBarTab from "./OpenedFileBarTab";
import DropMenu from "./ui/DropMenu";
import { useState } from "react";

const OpenedFileBar = () => {
  const [menuPosition, setMenuPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [showMenu, setShowMenu] = useState(false);
  const { openedFile } = useSelector((state: RootState) => state.tree);
  return (
    <div className="w-full">
      <div
        className="flex items-center border-b-[1px] border-[#ffffff1f]"
        onContextMenu={(e) => {
          e.preventDefault();
          setMenuPosition({ x: e.clientX, y: e.clientY });
          setShowMenu(true);
        }}
      >
        {openedFile.map((file) => (
          <OpenedFileBarTab file={file} key={file.id} />
        ))}
      </div>
      {showMenu && (
        <DropMenu positions={menuPosition} setShowMenu={setShowMenu} />
      )}
    </div>
  );
};

export default OpenedFileBar;
