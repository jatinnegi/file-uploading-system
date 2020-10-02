import {
  GET_ALL_FILES,
  UPLOAD_FILE,
  DELETE_FILE,
  FileActionTypes,
} from "./types/Actions";
import { FileState } from "./types/Files";
import { Reducer } from "redux";

const initialState: FileState = {
  files: [],
};

export const files: Reducer<FileState, FileActionTypes> = (
  state = initialState,
  action: FileActionTypes
) => {
  const { type, payload } = action;

  switch (type) {
    case GET_ALL_FILES:
      return {
        ...state,
        files: payload,
      };

    case UPLOAD_FILE:
      return {
        ...state,
        files: [...state.files, payload],
      };

    case DELETE_FILE:
      return {
        ...state,
        files: state.files.filter((file) => file.id !== payload),
      };
    default:
      return state;
  }
};
