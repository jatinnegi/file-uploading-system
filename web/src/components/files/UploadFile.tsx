import React, { useState } from "react";
import { connect } from "react-redux";
import { uploadFile } from "../../store/files/FilesActions";

interface Props {
  uploadFile: (formData: FileForm) => void;
}

const UploadFile: React.FC<Props> = ({ uploadFile }) => {
  const [filename] = useState<string>("");
  const [formData, setFormData] = useState<FileForm>({
    title: "",
    pdfFile: null,
  });
  const { title } = formData;

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const fileChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pdfFile = e.target.files![0];
    setFormData({ ...formData, pdfFile });
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    uploadFile(formData);
  };

  return (
    <div className="user-container">
      <h1>Upload File</h1>
      <form onSubmit={submitHandler}>
        <div className="form-group">
          <label htmlFor="title">
            <b>Enter title</b>
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={title}
            onChange={changeHandler}
          />
        </div>
        <div className="form-group">
          <label htmlFor="filename">Enter a PDF File</label>
          <input
            type="file"
            className="form-control-file"
            id="filename"
            value={filename}
            onChange={fileChangeHandler}
          />
        </div>
        <button className="btn btn-primary mt-2" type="submit">
          Upload
        </button>
      </form>
    </div>
  );
};

export default connect(null, { uploadFile })(UploadFile);
