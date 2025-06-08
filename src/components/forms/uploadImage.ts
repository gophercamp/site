'use server';

import { getSupabaseClient } from '@/lib/supabase';

interface UploadImageResult {
  success: boolean;
  url?: string;
  error?: string;
}

/**
 * Server action to upload an image to Supabase storage
 * @param formData FormData containing the image file
 * @param bucketName The name of the storage bucket
 * @param folderPath The folder path within the bucket
 */
export async function uploadImage(
  formData: FormData,
  bucketName: string = 'images',
  folderPath: string = 'uploads'
): Promise<UploadImageResult> {
  try {
    const file = formData.get('file') as File;

    if (!file) {
      return { success: false, error: 'No file provided' };
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      return {
        success: false,
        error: 'File type not supported. Please upload a JPEG, PNG, WEBP or GIF image.',
      };
    }

    // Max size: 5MB
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      return {
        success: false,
        error: 'File is too large. Maximum size is 5MB.',
      };
    }

    // Get Supabase client (on server)
    const supabase = getSupabaseClient();

    // Generate a unique filename
    const timestamp = new Date().getTime();
    const fileExtension = file.name.split('.').pop();
    const fileName = `${timestamp}_${Math.random().toString(36).substring(2, 15)}.${fileExtension}`;
    const filePath = `${folderPath}/${fileName}`;

    // Convert File to Buffer for Supabase upload
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload file to Supabase Storage
    const { error: uploadError } = await supabase.storage.from(bucketName).upload(filePath, buffer);

    if (uploadError) {
      console.error('Supabase upload error:', uploadError);
      return { success: false, error: uploadError.message };
    }

    // Get the public URL
    const { data: publicUrlData } = supabase.storage.from(bucketName).getPublicUrl(filePath);
    const imageUrl = publicUrlData.publicUrl;

    return {
      success: true,
      url: imageUrl,
    };
  } catch (err) {
    console.error('Error uploading image:', err);
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Failed to upload image. Please try again.',
    };
  }
}
