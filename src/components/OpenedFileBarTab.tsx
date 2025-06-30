import { useDispatch, useSelector } from "react-redux";
import type { IFile } from "../interfaces";
import RenderFileIcon from "./RenderFileIcon";
import CloseIcon from "./SVG/CloseIcon";
import {
  setClickedFileAction,
  setOpenedFilesAction,
  setTabIdToRemoveAction,
} from "../app/features/fileTreeSlice";
import type { RootState } from "../app/store";

interface IProps {
  file: IFile;
}

const OpenedFileBarTab = ({ file }: IProps) => {
  const dispatch = useDispatch();
  const {
    openedFile,
    clickedFile: { activeTabId },
  } = useSelector((state: RootState) => state.tree);
  const onClick = () => {
    const { id, name, content } = file;
    dispatch(
      setClickedFileAction({
        filename: name,
        fileContent: content,
        activeTabId: id,
      })
    );
  };
  const onRemove = (id: string) => {
    const filtered = openedFile.filter((file) => file.id !== id);
    const lastTab = filtered[filtered.length - 1];
    if (!lastTab) {
      dispatch(setOpenedFilesAction([]));
      dispatch(
        setClickedFileAction({
          activeTabId: null,
          fileContent: "",
          filename: "",
        })
      );
      return;
    }
    dispatch(setOpenedFilesAction(filtered));
    dispatch(
      setClickedFileAction({
        activeTabId: lastTab.id,
        fileContent: lastTab.content,
        filename: lastTab.name,
      })
    );
  };
  return (
    <div
      className={`max-w-screen-md flex items-center p-2 border-t-2 ${
        file.id === activeTabId ? "border-[#cf6ccf]" : "border-transparent"
      }`}
      onClick={onClick}
      onContextMenu={(e) => {
        e.preventDefault();
        dispatch(setTabIdToRemoveAction(file.id));
      }}
    >
      <RenderFileIcon filename={file.name} />
      <span className="cursor-pointer duration-300 flex justify-center items-center w-fit mx-2 p-1 rounded-md">
        {file.name}
      </span>
      <span
        className="cursor-pointer hover:bg-[#64646473] duration-300 flex justify-center items-center w-fit mr-2 p-1 rounded-md"
        onClick={(e) => {
          e.stopPropagation();
          onRemove(file.id);
        }}
      >
        <CloseIcon />
      </span>
    </div>
  );
};

export default OpenedFileBarTab;
