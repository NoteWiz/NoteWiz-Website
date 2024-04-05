'use client'
import React from 'react';
import { useDropzone } from 'react-dropzone';

const DragDrop = () => {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

  const files = acceptedFiles.map(file => (
    <li key={file.name}>
      {file.name} - {file.size} bytes
    </li>
  ));

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <section className="container mx-auto mt-10 p-10 border border-black rounded-lg mb-10">
        <div {...getRootProps({ className: 'dropzone p-20 border border-dashed border-gray-400 rounded-lg cursor-pointer' })}>
          <input {...getInputProps()} />
          <p className="text-gray-600">Drag 'n' drop some files here, or click to select files</p>
        </div>
        {acceptedFiles.length > 0 && (
          <aside className="mt-4">
            <h4 className="text-lg font-bold">Files</h4>
            <ul className="list-disc list-inside">{files}</ul>
          </aside>
        )}
      </section>
    </div>
  );
};

export default DragDrop;
