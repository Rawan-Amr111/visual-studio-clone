import { useSelector } from "react-redux";
import FileSyntaxHighlighter from "./FileSyntaxHighlighter";
import OpenedFileBar from "./OpenedFileBar";
import type { RootState } from "../app/store";

const Preview = () => {
  const {
    clickedFile: { fileContent },
  } = useSelector((state: RootState) => state.tree);

  return (
    <>
      <OpenedFileBar />
      <FileSyntaxHighlighter content={fileContent} />
    </>
  );
};

export default Preview;
