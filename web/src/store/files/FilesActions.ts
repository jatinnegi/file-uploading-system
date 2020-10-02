import { GET_ALL_FILES, UPLOAD_FILE, DELETE_FILE } from "./types/Actions";
import api from "../../utils/api";
import { Dispatch } from "redux";
import axios from "axios";
import { createAlert, removeAlert } from "../alert/AlertActions";
import { AlertType } from "../alert/types/Alert";
import { v4 as uuidv4 } from "uuid";

export const getAllFiles = () => async (dispatch: Dispatch) => {
  try {
    const res = await api.get("/files");

    dispatch({
      type: GET_ALL_FILES,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const uploadFile = (formData: FileForm) => (dispatch: Dispatch) => {
  let bodyFormData = new FormData();
  if (formData.pdfFile) {
    bodyFormData.append("pdfFile", formData.pdfFile);
  }
  bodyFormData.append("title", formData.title);

  axios({
    method: "post",
    url: "http://localhost:5000/api/files/upload-file",
    data: bodyFormData,
    headers: {
      "Content-Type": "multipart/form-data",
      "x-auth-token": localStorage.getItem("token"),
    },
  })
    .then((res) => {
      dispatch({ type: UPLOAD_FILE, payload: res.data });
      const id = uuidv4();
      dispatch(
        createAlert(id, "File Uploaded successfully", AlertType.MESSAGE)
      );
      setTimeout(() => dispatch(removeAlert(id)), 3000);
    })
    .catch((err) => {
      const errors: any[] = err.response.data.errors;
      if (errors) {
        errors.forEach((error: any) => {
          const msg = error.msg as string;
          const id = uuidv4();
          dispatch(createAlert(id, msg, AlertType.ERROR));
          setTimeout(() => dispatch(removeAlert(id)), 3000);
        });
      }
    });
};

export const deleteFile = (id: string) => async (dispatch: Dispatch) => {
  try {
    await api.delete(`/files/${id}`);
    dispatch({
      type: DELETE_FILE,
      payload: id,
    });
  } catch (err) {
    console.log(err);
  }
};
