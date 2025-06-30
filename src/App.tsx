import { useSelector } from "react-redux";
import type { RootState } from "./app/store";
import Preview from "./components/Preview";
import RecursiveComponent from "./components/RecursiveComponent";
import ResizeablePanel from "./components/ResizeablePanel";
import { fileTree } from "./data/fileTree";
import "./index.css";
import WelcomeTab from "./components/WelcomeTab";

function App() {
  const { openedFile } = useSelector(({ tree }: RootState) => tree);
  return (
    <div>
      <div className="flex h-screen">
        <ResizeablePanel
          showLeftPanel
          leftPanel={
            <div className="w-64   p-2 ">
              <RecursiveComponent fileTree={fileTree} />
            </div>
          }
          rightPanel={openedFile.length ? <Preview /> : <WelcomeTab />}
        />
      </div>
    </div>
  );
}

export default App;
