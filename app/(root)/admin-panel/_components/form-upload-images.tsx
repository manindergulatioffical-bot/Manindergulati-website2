"use client";

import type React from "react";

import { useState, useRef, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, X, ImageIcon } from "lucide-react";
import Image from "next/image";

interface Props {
  images: ImageFile[];
  setImages: (images: ImageFile[]) => void;
}

export default function FormUploadImages({ images, setImages }: Props) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const createImageFile = useCallback((file: File): Promise<ImageFile> => {
    return new Promise((resolve, reject) => {
      try {
        // Create an object URL for the file instead of base64
        const preview = URL.createObjectURL(file);
        resolve({
          id: Math.random().toString(36).substr(2, 9),
          file,          // This is the original File object
          preview,       // This is a blob URL for preview purposes
          name: file.name,
        });
      } catch (error) {
        reject(error);
      }
    });
  }, []);

  const handleFiles = useCallback(
    async (files: FileList | File[]) => {
      const fileArray = Array.from(files);
      const imageFiles = fileArray.filter((file) =>
        file.type.startsWith("image/")
      );

      if (imageFiles.length === 0) return;

      try {
        const newImages = await Promise.all(imageFiles.map(createImageFile));
        setImages([...images, ...newImages]);
      } catch (error) {
        console.error("Error converting images to base64:", error);
      }
    },
    [createImageFile, setImages, images]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);

      const files = e.dataTransfer.files;
      if (files.length > 0) {
        handleFiles(files);
      }
    },
    [handleFiles]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files) {
        handleFiles(files);
      }
      // Reset input value to allow selecting the same file again
      e.target.value = "";
    },
    [handleFiles]
  );

  const removeImage = useCallback(
    (id: string) => {
      const updated = images.filter((img) => img.id !== id);
      // Clean up object URL to prevent memory leaks
      const imageToRemove = images.find((img) => img.id === id);
      if (imageToRemove) {
        URL.revokeObjectURL(imageToRemove.preview);
      }
      setImages(updated);
    },
    [setImages, images]
  );

  const clearAllImages = useCallback(() => {
    // Clean up all object URLs
    images.forEach((img) => URL.revokeObjectURL(img.preview));
    setImages([]);
  }, [images, setImages]);

  // Drag and drop handlers for reordering
  const handleImageDragStart = useCallback(
    (e: React.DragEvent, index: number) => {
      setDraggedIndex(index);
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setData("text/html", "");
    },
    []
  );

  const handleImageDragOver = useCallback(
    (e: React.DragEvent, index: number) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = "move";
      setDragOverIndex(index);
    },
    []
  );

  const handleImageDragLeave = useCallback(() => {
    setDragOverIndex(null);
  }, []);

  const handleImageDrop = useCallback(
    (e: React.DragEvent, dropIndex: number) => {
      e.preventDefault();

      if (draggedIndex === null || draggedIndex === dropIndex) {
        setDraggedIndex(null);
        setDragOverIndex(null);
        return;
      }

      const newImages = [...images];
      const draggedImage = newImages[draggedIndex];

      // Remove the dragged image from its original position
      newImages.splice(draggedIndex, 1);

      // Insert it at the new position
      newImages.splice(dropIndex, 0, draggedImage);

      setImages(newImages);

      // Add a brief highlight animation to the dropped item
      setTimeout(() => {
        const droppedElement = document.querySelector(
          `[data-image-id="${images[dropIndex]?.id}"]`
        );
        if (droppedElement) {
          droppedElement.classList.add("animate-pulse");
          setTimeout(() => {
            droppedElement.classList.remove("animate-pulse");
          }, 500);
        }
      }, 100);

      setDraggedIndex(null);
      setDragOverIndex(null);
    },
    [draggedIndex, images, setImages]
  );

  const handleImageDragEnd = useCallback(() => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <h1 className="text-sm font-medium text-gray-700 uppercase tracking-wide">
        Product Images*
      </h1>

      {/* Upload Zone */}
      <Card>
        <CardContent className="p-6">
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              isDragOver
                ? "border-primary bg-primary/5"
                : "border-muted-foreground/25 hover:border-muted-foreground/50"
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <div className="flex flex-col items-center space-y-4">
              <div className="p-4 bg-muted rounded-full">
                <Upload className="w-8 h-8 text-muted-foreground" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Drop images here</h3>
                <p className="text-sm text-muted-foreground">
                  or click to select files from your computer
                </p>
              </div>
              <Button
                onClick={() => fileInputRef.current?.click()}
                variant="outline"
                className="mt-4"
                type="button"
              >
                <ImageIcon className="w-4 h-4 mr-2" />
                Select Images
              </Button>
            </div>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
        </CardContent>
      </Card>

      {/* Draggable Preview Grid */}
      {images.length > 0 && (
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Images ({images.length})</h3>
              <Button onClick={clearAllImages} variant="outline" size="sm">
                Clear All
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Drag images to reorder them
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {images.map((image, index) => (
                <div
                  key={image.id}
                  data-image-id={image.id}
                  draggable
                  onDragStart={(e) => handleImageDragStart(e, index)}
                  onDragOver={(e) => handleImageDragOver(e, index)}
                  onDragLeave={handleImageDragLeave}
                  onDrop={(e) => handleImageDrop(e, index)}
                  onDragEnd={handleImageDragEnd}
                  className={`relative group cursor-move transition-all duration-300 ease-out transform ${
                    draggedIndex === index
                      ? "opacity-50 scale-95 rotate-2 z-10"
                      : ""
                  } ${
                    dragOverIndex === index && draggedIndex !== index
                      ? "scale-105 ring-2 ring-primary ring-offset-2 shadow-lg"
                      : ""
                  } hover:scale-102 hover:shadow-md`}
                >
                  <Image
                    src={image.preview}
                    alt={image.name}
                    className="w-full h-32 object-cover rounded-lg border transition-all duration-200 ease-out pointer-events-none"
                    draggable={false}
                    width={100}
                    height={100}
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out rounded-lg flex items-center justify-center pointer-events-none backdrop-blur-sm">
                    <span className="text-white text-sm font-medium">
                      #{index + 1}
                    </span>
                  </div>
                  <Button
                    onClick={() => removeImage(image.id)}
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out bg-black/50 text-white hover:bg-red-500/80 hover:text-white hover:scale-110 transform"
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
