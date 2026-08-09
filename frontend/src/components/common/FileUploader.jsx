import { useRef, useState } from 'react';
import { UploadCloud, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { uploadsApi } from '../../api/uploads.api';
import { fileUrl } from '../../utils/constants';
import { extractErrorMessage } from '../../utils/format';
import { Spinner } from './Spinner';

export function FileUploader({ label, value = [], onChange, accept = 'image/*' }) {
  const inputRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);

  async function handleFiles(e) {
    const files = e.target.files;
    if (!files || !files.length) return;
    setIsUploading(true);
    try {
      const { files: uploaded } = await uploadsApi.upload(files);
      onChange([...value, ...uploaded.map((f) => f.url)]);
    } catch (err) {
      toast.error(extractErrorMessage(err));
    } finally {
      setIsUploading(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  }

  function removeAt(idx) {
    onChange(value.filter((_, i) => i !== idx));
  }

  return (
    <div>
      {label && <span className="field-label">{label}</span>}
      <div className="flex flex-wrap gap-3">
        {value.map((url, idx) => (
          <div key={url + idx} className="relative h-20 w-20 overflow-hidden rounded-lg border border-field-100">
            <img src={fileUrl(url)} alt="" className="h-full w-full object-cover" />
            <button
              type="button"
              onClick={() => removeAt(idx)}
              className="absolute right-1 top-1 rounded-full bg-black/60 p-0.5 text-white"
              aria-label="Remove file"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={isUploading}
          className="flex h-20 w-20 flex-col items-center justify-center gap-1 rounded-lg border-2 border-dashed border-field-200 text-field-400 hover:border-field-400 hover:text-field-600"
        >
          {isUploading ? <Spinner className="h-5 w-5" /> : <UploadCloud className="h-5 w-5" />}
          <span className="text-[10px] font-medium">Add</span>
        </button>
        <input
          ref={inputRef}
          type="file"
          name="files"
          multiple
          accept={accept}
          onChange={handleFiles}
          className="hidden"
        />
      </div>
    </div>
  );
}
