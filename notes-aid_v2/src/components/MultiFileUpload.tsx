import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FilePlus } from 'lucide-react';

type MultiFileUploadProps = {
    onFilesAccepted: (files: File[]) => void;
};

const MultiFileUpload: React.FC<MultiFileUploadProps> = ({ onFilesAccepted }) => {
    const onDrop = useCallback(
        (acceptedFiles: File[]) => {
            onFilesAccepted(acceptedFiles);
        },
        [onFilesAccepted]
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'application/pdf': ['.pdf'] },
        multiple: true,
    });

    const dropText = isDragActive
        ? 'Drop your PDFs here...'
        : 'Drag and drop PDFs here, or click to select files';

    return (
        <div
            {...getRootProps()}
            className={`flex items-center justify-center gap-2 p-12 w-full cursor-pointer border-2 border-dashed rounded-xl transition-all duration-200
        ${isDragActive ? 'bg-blue-50 border-blue-500 scale-105' : 'bg-gray-50 border-gray-300 hover:bg-gray-100 hover:border-blue-400'}`}
        >
            <input {...getInputProps()} />
            <FilePlus size={32} className={isDragActive ? 'text-blue-500' : 'text-gray-400'} />
            <p className="text-center text-gray-600">{dropText}</p>
        </div>
    );
};

export default MultiFileUpload;
