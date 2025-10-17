import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FilePlus } from 'lucide-react';

type FileUploadProps = {
    onFileAccepted: (file: File) => void;
};

const FileUpload: React.FC<FileUploadProps> = ({ onFileAccepted }) => {
    const onDrop = useCallback(
        (acceptedFiles: File[]) => {
            onFileAccepted(acceptedFiles[0]);
        },
        [onFileAccepted]
    );


    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept:{ 'application/pdf': ['.pdf'] },
        maxFiles: 1,
        multiple: false,
    });

    const dropText = isDragActive
        ? 'Drop it like it’s hot…'
        : 'Drag and drop your file here, or click to select files';

    return (
        <div
            {...getRootProps()}
            className={`flex items-center justify-center gap-2 p-16 my-8 w-full cursor-pointer border-2 border-dashed rounded-lg transition-colors duration-200
        ${isDragActive ? 'bg-teal-100 border-teal-500' : 'bg-transparent border-gray-300 hover:bg-gray-100'}`}
        >
            <input {...getInputProps()} />
            <FilePlus size={24} />
            <p className="text-center">{dropText}</p>
        </div>
    );
};

export default FileUpload;
