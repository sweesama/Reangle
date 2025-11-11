"use client";

import { useState, useRef } from "react";
import { useTranslations } from "next-intl";
import { Upload, X, Image as ImageIcon } from "lucide-react";

interface ImageUploaderProps {
  onImageUpload: (image: string) => void;
  uploadedImage: string | null;
}

export default function ImageUploader({
  onImageUpload,
  uploadedImage,
}: ImageUploaderProps) {
  const t = useTranslations('uploader');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragging(true);
    } else if (e.type === "dragleave") {
      setIsDragging(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        onImageUpload(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    onImageUpload(null!);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="apple-card p-6">
      <h2 className="text-lg font-semibold text-apple-gray-800 mb-1">{t('title')}</h2>
      <p className="text-apple-gray-500 text-sm mb-6">{t('subtitle')}</p>

      {!uploadedImage ? (
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`
            relative border-2 border-dashed rounded-xl p-12 text-center cursor-pointer
            transition-all duration-200
            ${
              isDragging
                ? "border-apple-blue bg-apple-gray-50"
                : "border-apple-gray-200 hover:border-apple-gray-300"
            }
          `}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileInput}
          />

          <Upload className="w-12 h-12 text-apple-gray-400 mb-4 mx-auto" />
          <p className="text-apple-gray-800 font-medium mb-1">
            {t('dragText')}
          </p>
          <p className="text-apple-gray-500 text-sm">
            {t('sizeHint')}
          </p>
        </div>
      ) : (
        <div className="relative group">
          <img
            src={uploadedImage}
            alt="Uploaded"
            className="w-full h-auto rounded-xl"
          />
          <button
            onClick={removeImage}
            className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-colors opacity-0 group-hover:opacity-100"
          >
            <X className="w-4 h-4 text-apple-gray-800" />
          </button>

          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 rounded-xl">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-5 py-2.5 bg-white rounded-full text-apple-gray-800 font-medium text-sm flex items-center space-x-2 shadow-lg"
            >
              <ImageIcon className="w-4 h-4" />
              <span>{t('changeImage')}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
