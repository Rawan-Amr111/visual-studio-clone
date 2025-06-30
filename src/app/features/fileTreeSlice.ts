import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IFile } from "../../interfaces";

interface IClickedFile {
  filename: string;
  fileContent: string | undefined;
  activeTabId: string | null;
}
interface IInitialState {
  openedFile: IFile[];
  clickedFile: IClickedFile;
  tabIdToRemove: string | null;
}
const initialState: IInitialState = {
  openedFile: [],
  clickedFile: {
    activeTabId: null,
    filename: "",
    fileContent: "",
  },
  tabIdToRemove: null,
};
const fileTreeSlice = createSlice({
  name: "fileTree",
  initialState,
  reducers: {
    setOpenedFilesAction: (state, action: PayloadAction<IFile[]>) => {
      state.openedFile = action.payload;
    },
    setClickedFileAction: (state, action: PayloadAction<IClickedFile>) => {
      state.clickedFile = action.payload;
    },
    setTabIdToRemoveAction: (state, action: PayloadAction<string | null>) => {
      state.tabIdToRemove = action.payload;
    },
  },
});
export const {
  setOpenedFilesAction,
  setClickedFileAction,
  setTabIdToRemoveAction,
} = fileTreeSlice.actions;
export default fileTreeSlice.reducer;
