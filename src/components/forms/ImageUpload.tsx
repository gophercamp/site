'use client';

import { uploadImage } from '@/components/forms/uploadImage';
import Image from 'next/image';
import { ChangeEvent, forwardRef, useEffect, useState } from 'react';
import { FaTimes, FaUpload } from 'react-icons/fa';

interface ImageUploadProps {
  name: string;
  label: string;
  value?: string;
  onChange: (url: string) => void;
  error?: string;
  required?: boolean;
  bucketName?: string;
  folderPath?: string;
}

const ImageUpload = forwardRef<HTMLInputElement, ImageUploadProps>(
  (
    {
      name,
      label,
      value,
      onChange,
      error,
      required,
      bucketName = 'images',
      folderPath = 'uploads',
    },
    ref
  ) => {
    const [isUploading, setIsUploading] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string | null>(value || null);
    const [uploadError, setUploadError] = useState<string | null>(null);

    useEffect(() => {
      setPreviewUrl(value || null);
    }, [value]);

    const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      try {
        setIsUploading(true);
        setUploadError(null);

        // Create FormData to send to server action
        const formData = new FormData();
        formData.append('file', file);

        // Call server action to handle the upload
        const result = await uploadImage(formData, bucketName, folderPath);

        if (!result.success || !result.url) {
          throw new Error(result.error || 'Failed to upload image');
        }

        // Update form and preview with the returned URL
        onChange(result.url);
        setPreviewUrl(result.url);
      } catch (err) {
        console.error('Error uploading image:', err);
        setUploadError(
          err instanceof Error ? err.message : 'Failed to upload image. Please try again.'
        );
      } finally {
        setIsUploading(false);
      }
    };

    const handleClearImage = () => {
      onChange('');
      setPreviewUrl(null);
    };

    return (
      <div>
        <label htmlFor={name} className="block text-sm font-medium text-[var(--text-secondary)]">
          {label} {required && <span className="text-[var(--form-error-color)]">*</span>}
        </label>

        <div className="mt-1">
          {previewUrl ? (
            <div className="relative inline-block">
              <Image
                src={previewUrl}
                alt="Preview"
                width={120}
                height={120}
                className="rounded-md object-cover h-30 w-30"
              />
              <button
                type="button"
                onClick={handleClearImage}
                className="absolute -top-2 -right-2 bg-[var(--form-error-color)] text-white rounded-full p-1 shadow-md hover:bg-[var(--form-error-text)] transition-colors"
              >
                <FaTimes size={12} />
              </button>
            </div>
          ) : (
            <div
              className={`flex justify-center items-center border-2 border-dashed rounded-md p-6
                ${error || uploadError ? 'border-[var(--form-error-border)]' : 'border-[var(--border-color)]'}`}
            >
              <div className="space-y-1 text-center">
                <FaUpload className="mx-auto h-12 w-12 text-[var(--text-secondary)]" />
                <div className="text-sm text-[var(--text-secondary)]">
                  <label
                    htmlFor={name}
                    className="relative cursor-pointer rounded-md font-medium text-[var(--form-focus-color)] hover:text-[var(--go-blue-dark)] focus-within:outline-none"
                  >
                    <span>Upload an image</span>
                    <input
                      id={name}
                      name={name}
                      type="file"
                      accept="image/*"
                      ref={ref}
                      className="sr-only"
                      onChange={handleUpload}
                      disabled={isUploading}
                    />
                  </label>
                  <p>or drag and drop</p>
                </div>
                <p className="text-xs text-[var(--text-secondary)]">
                  PNG, JPG, WEBP, GIF up to 5MB
                </p>
                {isUploading && (
                  <div className="mt-2">
                    <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-[var(--form-focus-color)] mx-auto"></div>
                    <p className="text-sm text-[var(--text-secondary)] mt-1">Uploading...</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {(error || uploadError) && (
          <p className="mt-1 text-sm text-[var(--form-error-text)]">{error || uploadError}</p>
        )}
      </div>
    );
  }
);

ImageUpload.displayName = 'ImageUpload';

export default ImageUpload;
