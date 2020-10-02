import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { AppState } from "../../store";
import { getAllFiles, deleteFile } from "../../store/files/FilesActions";
import { File } from "../../store/files/types/Files";
import download from "downloadjs";

interface Props {
  files: File[];
  userId: string;
  getAllFiles: () => Promise<void>;
  deleteFile: (id: string) => Promise<void>;
}

const Files: React.FC<Props> = ({ files, userId, getAllFiles, deleteFile }) => {
  useEffect(() => {
    getAllFiles();
  }, [getAllFiles]);

  const [searchInput, setSearchInput] = useState<string>("");

  const formatDate = (date: Date) => {
    const uploadDate = new Date(date);
    const year = uploadDate.getFullYear();
    const monthIndex = uploadDate.getMonth();
    const day = uploadDate.getDate();

    let month;

    switch (monthIndex) {
      case 0:
        month = "Jan";
        break;
      case 1:
        month = "Feb";
        break;
      case 2:
        month = "Mar";
        break;
      case 3:
        month = "Apr";
        break;
      case 4:
        month = "May";
        break;
      case 5:
        month = "Jun";
        break;
      case 6:
        month = "Jul";
        break;
      case 7:
        month = "Aug";
        break;

      case 8:
        month = "Sept";
        break;

      case 9:
        month = "Oct";
        break;

      case 10:
        month = "Nov";
        break;

      case 11:
        month = "Dec";
        break;
    }

    return `${month}-${day}-${year}`;
  };

  const downloadFile = async (fileId: string, title: string) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/files/download-file/${fileId}/${userId}`
      );
      const blob = await res.blob();
      download(blob, `${title}.pdf`);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  return (
    <div className="user-container">
      <h1>All Files</h1>
      <input
        type="text"
        className="form-control mb-4"
        placeholder="Search Files"
        value={searchInput}
        onChange={handleChange}
      />
      <table className="table table-bordered">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Title</th>
            <th scope="col">File</th>
            <th scope="col">Upload Date</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {files.length > 0 ? (
            files.map((file: File) => (
              <tr
                key={file.id}
                className={
                  searchInput.length
                    ? !file.title
                        .toLowerCase()
                        .includes(searchInput.toLowerCase())
                      ? "display-none"
                      : ""
                    : ""
                }
              >
                <td>{file.title}</td>
                <td>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => downloadFile(file.id, file.title)}
                  >
                    Download File
                  </button>
                </td>
                <td>{formatDate(file.created_at)}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteFile(file.id)}
                  >
                    Delete File
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4}>
                <h3 className="text-center">You haven't uploaded any files</h3>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  files: state.files.files,
  userId: state.auth.user!.id,
});

export default connect(mapStateToProps, { getAllFiles, deleteFile })(Files);
