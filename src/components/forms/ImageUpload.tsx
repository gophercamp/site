'use client';

import { getSupabaseClient } from '@/lib/supabase';
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

      // Validate file type and size
      const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
      if (!allowedTypes.includes(file.type)) {
        setUploadError('File type not supported. Please upload a JPEG, PNG, WEBP or GIF image.');
        return;
      }

      // Max size: 5MB
      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        setUploadError('File is too large. Maximum size is 5MB.');
        return;
      }

      try {
        setIsUploading(true);
        setUploadError(null);
        const supabase = getSupabaseClient();

        // Generate a unique filename
        const timestamp = new Date().getTime();
        const fileExtension = file.name.split('.').pop();
        const fileName = `${timestamp}_${Math.random().toString(36).substring(2, 15)}.${fileExtension}`;
        const filePath = `${folderPath}/${fileName}`;

        // Upload file to Supabase Storage
        const { error: uploadError } = await supabase.storage
          .from(bucketName)
          .upload(filePath, file);

        if (uploadError) {
          throw new Error(uploadError.message);
        }

        // Get the public URL
        const { data: publicUrlData } = supabase.storage.from(bucketName).getPublicUrl(filePath);
        const imageUrl = publicUrlData.publicUrl;

        // Update form and preview
        onChange(imageUrl);
        setPreviewUrl(imageUrl);
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
          {label} {required && <span className="text-red-500">*</span>}
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
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600 transition-colors"
              >
                <FaTimes size={12} />
              </button>
            </div>
          ) : (
            <div
              className={`flex justify-center items-center border-2 border-dashed rounded-md p-6
                ${error || uploadError ? 'border-red-500' : 'border-[var(--border-color)]'}`}
            >
              <div className="space-y-1 text-center">
                <FaUpload className="mx-auto h-12 w-12 text-[var(--text-secondary)]" />
                <div className="text-sm text-[var(--text-secondary)]">
                  <label
                    htmlFor={name}
                    className="relative cursor-pointer rounded-md font-medium text-primary hover:text-primary-dark focus-within:outline-none"
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
                    <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-primary mx-auto"></div>
                    <p className="text-sm text-[var(--text-secondary)] mt-1">Uploading...</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {(error || uploadError) && (
          <p className="mt-1 text-sm text-red-500">{error || uploadError}</p>
        )}
      </div>
    );
  }
);

ImageUpload.displayName = 'ImageUpload';

export default ImageUpload;
