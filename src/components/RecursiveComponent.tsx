import { useState } from "react";
import type { IFile } from "../interfaces";
import RightArrowIcon from "./SVG/Right";
import BottomArrowIcon from "./SVG/Bottom";
import RenderFileIcon from "./RenderFileIcon";
import { useDispatch, useSelector } from "react-redux";
import {
  setClickedFileAction,
  setOpenedFilesAction,
} from "../app/features/fileTreeSlice";
import type { RootState } from "../app/store";
import { doesFileObjectExist } from "../utils/functions";

interface IProps {
  fileTree: IFile;
}

const RecursiveComponent = ({ fileTree }: IProps) => {
  const { id, name, isFolder, children, content } = fileTree;
  const {
    openedFile,
    clickedFile: { activeTabId },
  } = useSelector((state: RootState) => state.tree);
  const dispatch = useDispatch();

  const isActive = id === activeTabId;
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const toggle = () => setIsOpen((prev) => !prev);
  const onFileClicked = () => {
    const exists = doesFileObjectExist(openedFile, id);
    dispatch(
      setClickedFileAction({
        filename: name,
        fileContent: content,
        activeTabId: id,
      })
    );
    if (exists) return;
    dispatch(setOpenedFilesAction([...openedFile, fileTree]));
  };
  return (
    <div className=" w-full mb-2 ml-1 cursor-pointer">
      <div className="flex items-center mb-1.5">
        {isFolder ? (
          <div onClick={toggle} className="flex items-center">
            <span className="mr-2">
              {isOpen ? <BottomArrowIcon /> : <RightArrowIcon />}
            </span>
            <RenderFileIcon filename={name} isOpen={isOpen} isFolder />
            <span>{name}</span>
          </div>
        ) : (
          <div
            className={`ml-6 items-center flex   ${
              isActive ? "bg-[#464444] w-full rounded-md" : ""
            }`}
            onClick={onFileClicked}
          >
            <RenderFileIcon filename={name} />
            <span className="ml-2 text-lg">{name}</span>
          </div>
        )}
      </div>
      {isOpen &&
        children &&
        children.map((file, idx) => (
          <RecursiveComponent fileTree={file} key={idx} />
        ))}
    </div>
  );
};

export default RecursiveComponent;
