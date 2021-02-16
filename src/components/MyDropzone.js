import React from "react";
import { useDropzone } from "react-dropzone";

function MyDropzone({ picture, setPicture }) {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

  const files = acceptedFiles.map((file) => {
    return file.path;
  });

  return (
    <section className="container">
      <div {...getRootProps({ className: "dropzone" })}>
        <input
          {...getInputProps({
            onChange: (event) => setPicture(files[0]),
          })}
        />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      <aside>
        <h4>Files</h4>
        <ul>{files}</ul>
      </aside>
    </section>
  );
}

<MyDropzone />;

export default MyDropzone;
