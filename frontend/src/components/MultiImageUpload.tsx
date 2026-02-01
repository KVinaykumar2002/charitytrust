"use client";

import { useState, useRef, DragEvent, ChangeEvent } from "react";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface MultiImageUploadProps {
  value?: string[];
  onChange: (base64Array: string[]) => void;
  maxImages?: number;
  className?: string;
}

export default function MultiImageUpload({
  value = [],
  onChange,
  maxImages = 5,
  className,
}: MultiImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const images = value || [];

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert("Image size should be less than 5MB");
      return;
    }
    if (images.length >= maxImages) {
      alert(`Maximum ${maxImages} images allowed`);
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      onChange([...images, reader.result as string]);
    };
    reader.readAsDataURL(file);
  };

  const handleRemove = (index: number) => {
    onChange(images.filter((_, i) => i !== index));
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    e.target.value = "";
  };

  return (
    <div className={cn("space-y-3", className)}>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {images.map((src, index) => (
          <div key={index} className="relative group aspect-square">
            <img
              src={src}
              alt={`Upload ${index + 1}`}
              className="w-full h-full object-cover rounded-lg border border-white/10"
            />
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => handleRemove(index)}
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        ))}
        {images.length < maxImages && (
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={cn(
              "aspect-square border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer transition-all",
              isDragging
                ? "border-[#FD7E14] bg-[#FD7E14]/10"
                : "border-white/20 hover:border-[#FD7E14]/50 hover:bg-white/5"
            )}
          >
            <Upload className="h-6 w-6 text-white/50 mb-1" />
            <span className="text-xs text-white/50">
              {images.length}/{maxImages}
            </span>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileInput}
              className="hidden"
            />
          </div>
        )}
      </div>
      <p className="text-xs text-white/50">
        Upload up to {maxImages} photos. Max 5MB each.
      </p>
    </div>
  );
}
