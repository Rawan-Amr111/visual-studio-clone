import { coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
interface IProps {
  content?: string;
}

const FileSyntaxHighlighter = ({ content }: IProps) => {
  return (
    <SyntaxHighlighter
      language="javascript"
      style={coldarkDark}
      customStyle={{
        backgroundColor: "transparent",
        width: "100%",
        maxHeight: "100vh",
        overflowX: "auto",
      }}
      showLineNumbers
    >
      {String(content)}
    </SyntaxHighlighter>
  );
};
export default FileSyntaxHighlighter;
