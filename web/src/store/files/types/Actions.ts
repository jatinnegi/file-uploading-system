export const GET_ALL_FILES = "GET_ALL_FILES";
export const UPLOAD_FILE = "UPLOAD_FILE";
export const DELETE_FILE = "DELETE_FILE";

interface GetAllFilesAction {
  type: typeof GET_ALL_FILES;
  payload: any;
}

interface UploadFileAction {
  type: typeof UPLOAD_FILE;
  payload: any;
}

interface DeleteFileAction {
  type: typeof DELETE_FILE;
  payload: any;
}

export type FileActionTypes =
  | GetAllFilesAction
  | UploadFileAction
  | DeleteFileAction;
