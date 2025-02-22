import { FC, InputHTMLAttributes, useRef } from "react";
import { MdFileUpload, MdClose } from "react-icons/md";

interface ImageUploaderProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  name: string;
  val?: File | string;
  error?: string;
  touched?: boolean;
  setFieldValue: (
    field: string,
    value: unknown,
    shouldValidate?: boolean | undefined
  ) => void;
}

const ImageUploader: FC<ImageUploaderProps> = ({
  label,
  name,
  setFieldValue,
  val,
  error,
  className = "",
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleRemoveImage = () => {
    setFieldValue(name, undefined);
    if (inputRef.current?.value) inputRef.current.value = "";
  };
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) {
      setFieldValue(name, event.target.files[0]);
    }
  };
  return (
    <div className={`max-w-md mx-auto p-6 ${className}`}>
      <div className="flex flex-col items-center gap-4">
        {/* Upload Area with Preview */}
        <label className="relative group cursor-pointer">
          <input
            ref={inputRef}
            type="file"
            className="hidden"
            accept="image/*"
            onChange={onChange}
          />

          <div
            className={`
            avatar relative
            ${!val && "placeholder"} 
            w-32 h-32
          `}
          >
            <div
              className={`
              w-full rounded-box
              ${!val && "bg-base-300 border-2 border-neutral/10 border-dashed"}
            `}
            >
              {val && (
                <div className="relative w-full h-full">
                  <img
                    src={
                      typeof val === "string" ? val : URL.createObjectURL(val)
                    }
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-box">
                    <MdFileUpload className="w-8 h-8 text-white" />
                  </div>
                </div>
              )}
              {/* PlaceHolder */}
              {!val && (
                <div className="flex flex-col items-center justify-center">
                  <MdFileUpload className="w-8 h-8" />
                  <span className="text-xs mt-2">
                    {label || "Upload Photo"}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Remove Button */}
          {val && (
            <button
              onClick={(e) => {
                e.preventDefault();
                handleRemoveImage();
              }}
              className="btn btn-error btn-circle btn-xs absolute -top-2 -right-2"
            >
              <MdClose className="w-3 h-3" />
            </button>
          )}
        </label>

        {/* Error Message */}
        {error && <div className="text-error text-sm text-center">{error}</div>}
      </div>
    </div>
  );
};

export default ImageUploader;
