// app/components/Admin/ProductForm.tsx
"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import { uploadImage } from "@/utils/supabase/storage";
import { createProduct } from "@/utils/supabase/api";

const ProductForm = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [description, setDescription] = useState("");
  const [inStock, setInStock] = useState(true);
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Helper function to generate a slug from the product title.
  const generateSlug = (text: string): string => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[\s\W-]+/g, "-") // replace spaces and non-word characters with dash
      .replace(/^-+|-+$/g, ""); // remove leading or trailing dashes
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setUploading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      // Upload images if provided, and collect URLs.
      let uploadedUrls: string[] = [];
      if (files.length > 0) {
        uploadedUrls = await Promise.all(files.map((file) => uploadImage(file)));
      }

      // Generate the slug automatically from the product title.
      const slug = generateSlug(title);

      // Create the product record.
      const productData = {
        title,
        slug,
        price,
        description,
        in_stock: inStock,
        image_urls: uploadedUrls,
      };

      await createProduct(productData);
      setSuccessMessage("Product created successfully!");
      // Reset the form fields.
      setTitle("");
      setPrice(0);
      setDescription("");
      setFiles([]);
    } catch (error) {
      console.error("Error creating product:", error);
      setErrorMessage("Error creating product, please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Create New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block font-medium">
            Title:
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 rounded w-full bg-transparent"
            required
          />
        </div>
        <div>
          <label htmlFor="price" className="block font-medium">
            Price:
          </label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="border p-2 rounded w-full bg-transparent"
            required
          />
        </div>
        <div>
          <label htmlFor="description" className="block font-medium">
            Description:
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-2 rounded w-full bg-transparent"
            rows={4}
            required
          />
        </div>
        <div>
          <label htmlFor="inStock" className="inline-flex items-center">
            <input
              type="checkbox"
              id="inStock"
              checked={inStock}
              onChange={(e) => setInStock(e.target.checked)}
              className="mr-2"
            />
            In Stock
          </label>
        </div>
        <div>
          <label htmlFor="files" className="block font-medium">
            Product Images:
          </label>
          <input
            type="file"
            id="files"
            onChange={handleFileChange}
            className="border p-2 rounded w-full"
            accept="image/*"
            multiple
          />
        </div>
        {uploading && <p className="text-blue-600">Uploading...</p>}
        {errorMessage && <p className="text-red-600">{errorMessage}</p>}
        {successMessage && <p className="text-green-600">{successMessage}</p>}
        <button
          type="submit"
          disabled={uploading}
          className="bg-blue-600 text-white py-2 px-4 rounded"
        >
          Create Product
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
