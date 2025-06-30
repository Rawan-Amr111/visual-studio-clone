import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOpenedFilesAction } from "../../app/features/fileTreeSlice";
import type { RootState } from "../../app/store";

interface IProps {
  setShowMenu: (val: boolean) => void;
  positions: {
    x: number;
    y: number;
  };
}

const DropMenu = ({ positions, setShowMenu }: IProps) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const { openedFile, tabIdToRemove } = useSelector(
    (state: RootState) => state.tree
  );
  const closeAll = () => {
    dispatch(setOpenedFilesAction([]));
    setShowMenu(false);
  };
  const onClose = () => {
    const filtered = openedFile.filter((file) => file.id !== tabIdToRemove);
    dispatch(setOpenedFilesAction(filtered));
    setShowMenu(false);
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [setShowMenu]);
  return (
    <div ref={menuRef}>
      <ul
        className="bg-white text-black w-git px-7 py-2 rounded-md"
        style={{ position: "absolute", top: positions.y, left: positions.x }}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
      >
        <li
          className="cursor-pointer hover:bg-gray-300 text-gray-700 px-4 py-2 text-sm duration-300 rounded-sm "
          onClick={onClose}
          role="menuitem"
        >
          close
        </li>
        <li
          onClick={closeAll}
          className="cursor-pointer hover:bg-gray-300 text-gray-700 px-4 py-2 text-sm duration-300 rounded-sm "
          role="menuitem"
        >
          close all
        </li>
      </ul>
    </div>
  );
};

export default DropMenu;
