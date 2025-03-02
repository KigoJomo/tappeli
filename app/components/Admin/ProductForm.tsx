// app/components/Admin/ProductForm.tsx
"use client";

import React, { useState, useEffect, ChangeEvent, FormEvent, useCallback } from "react";
import { uploadImage } from "@/utils/supabase/storage";
import {
  createProduct,
  getCategories,
  createCategory,
  assignCategoryToProduct,
} from "@/utils/supabase/api";
import type { Category, Product } from "@/utils/supabase/types";
import { Input } from "@/app/components/Input";
import Button from "@/app/components/Button";
import Image from "next/image";
import { ImageUp, X } from "lucide-react";
import { useToast } from "@/context/ToastContext";

const ImagePreview = ({ file, onRemove }: { file: File; onRemove: () => void }) => (
  <div className="relative group">
    <Image
      src={URL.createObjectURL(file)}
      alt="Preview"
      height={96}
      width={96}
      className="h-24 w-24 rounded-lg object-cover shadow-sm"
    />
    <button
      type="button"
      onClick={onRemove}
      className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full shadow-sm hover:bg-red-600 transition-colors"
    >
      <X size={16} />
    </button>
  </div>
);

const CustomSelect = ({
  options,
  value,
  onChange,
  placeholder = "Select...",
  className = "",
}: {
  options: { value: string; label: string }[];
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  placeholder?: string;
  className?: string;
}) => (
  <div className="relative">
    <select
      value={value}
      onChange={onChange}
      className={`w-full rounded-lg border border-foreground-light px-4 py-2 bg-background focus:border-accent appearance-none transition-all duration-300 ${className}`}
    >
      <option value="" className="text-foreground bg-background">{placeholder}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
      <svg
        className="w-5 h-5 text-foreground-light"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  </div>
);

const ProductForm = () => {
  // Product fields
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [description, setDescription] = useState("");
  const [inStock, setInStock] = useState(true);
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  // const [errorMessage, setErrorMessage] = useState<string | null>(null);
  // const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Validation errors
  const [titleError, setTitleError] = useState<string | null>(null);
  const [priceError, setPriceError] = useState<string | null>(null);
  const [descriptionError, setDescriptionError] = useState<string | null>(null);
  const [categoryError, setCategoryError] = useState<string | null>(null);
  const [newCategoryNameError, setNewCategoryNameError] = useState<string | null>(null);

  // Category-related state
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");
  const [creatingNewCategory, setCreatingNewCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryParent, setNewCategoryParent] = useState("");

  // toast
  const { showToast } = useToast()

  useEffect(() => {
    async function fetchCategories() {
      try {
        const cats = await getCategories();
        setCategories(cats);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }
    fetchCategories();
  }, []);

  const generateSlug = (text: string): string => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[\s\W-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const handleFileChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles((prev) => [
        ...prev,
        ...newFiles.filter((f) => !prev.some((existing) => existing.name === f.name)),
      ]);
    }
  }, []);

  const removeFile = useCallback((index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const validateForm = () => {
    let isValid = true;

    if (!title.trim()) {
      setTitleError("Title is required");
      isValid = false;
    } else {
      setTitleError(null);
    }

    if (price <= 0) {
      setPriceError("Price must be greater than 0");
      isValid = false;
    } else {
      setPriceError(null);
    }

    if (!description.trim()) {
      setDescriptionError("Description is required");
      isValid = false;
    } else {
      setDescriptionError(null);
    }

    if (!creatingNewCategory && !selectedCategoryId) {
      setCategoryError("Please select a category or create a new one");
      isValid = false;
    } else {
      setCategoryError(null);
    }

    if (creatingNewCategory && !newCategoryName.trim()) {
      setNewCategoryNameError("Category name is required");
      isValid = false;
    } else {
      setNewCategoryNameError(null);
    }

    return isValid;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setUploading(true);
    showToast("Uploading images...", "info");
    // setErrorMessage(null);
    // setSuccessMessage(null);

    try {
      let uploadedUrls: string[] = [];
      if (files.length > 0) {
        uploadedUrls = await Promise.all(files.map((file) => uploadImage(file)));
      }

      const slug = generateSlug(title);
      const productData = {
        title,
        slug,
        price,
        description,
        in_stock: inStock,
        image_urls: uploadedUrls,
      };

      const product: Product = await createProduct(productData);
      let categoryId = selectedCategoryId;

      if (creatingNewCategory) {
        const newCat = await createCategory({
          name: newCategoryName,
          slug: generateSlug(newCategoryName),
          description: "",
          parent_id: newCategoryParent || null,
        });
        categoryId = newCat.id;
      }

      if (categoryId) {
        await assignCategoryToProduct(product.id, categoryId);
      }

      // setSuccessMessage("Product created successfully!");
      showToast("Product created successfully!", "success");
      // Reset form
      setTitle("");
      setPrice(0);
      setDescription("");
      setFiles([]);
      setSelectedCategoryId("");
      setCreatingNewCategory(false);
      setNewCategoryName("");
      setNewCategoryParent("");
    } catch (error) {
      console.error("Error creating product:", error);
      // setErrorMessage("Error creating product, please try again.");
      showToast("Error creating product, please try again.", "error");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="w-full md:px-24 pb-6">
      <div className="w-full flex items-center gap-4 mb-4 md:mb-10">
        <h2 className="text-nowrap">Create New Product</h2>
        <div className="w-full h-[1px] bg-foreground-faded"></div>
      </div>

      <form onSubmit={handleSubmit} className="w-full space-y-6">

        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-12">
          <div className="col-span-1 flex flex-col gap-6 bg-foreground-faded p-4 md:p-6 rounded-3xl">
              <Input
                id="title"
                label="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                error={titleError}
                required
              />

            {/* price & availability */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                id="price"
                type="number"
                label="Price"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                step="0.01"
                error={priceError}
                required
              />

              <div className="availability space-y-2">
                <label className="block text-sm font-medium">Availability</label>
                <div className="flex items-center gap-2 p-2">
                  <input
                    type="checkbox"
                    id="inStock"
                    checked={inStock}
                    onChange={(e) => setInStock(e.target.checked)}
                    className="h-4 w-4 text-accent focus:ring-accent rounded border-foreground-light accent-accent"
                  />
                  <label htmlFor="inStock" className="text-sm">
                    In Stock
                  </label>
                </div>
              </div>
            </div>

            {/* description */}
            <div className="space-y-2">
              <label htmlFor="description" className="block text-sm font-medium">
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className={`w-full rounded-lg border border-foreground-light px-4 py-2 bg-transparent outline-none focus:outline-none focus:border-accent transition-all duration-300 ${
                  descriptionError ? "border-red-500 focus:border-red-500" : ""
                }`}
                rows={4}
                required
              />
              {descriptionError && (
                <p className="text-sm text-red-600">{descriptionError}</p>
              )}
            </div>
          </div>
          
          <div className="col-span-1 flex flex-col gap-6 bg-foreground-faded p-4 md:p-6 rounded-3xl">
            {/*  images */}
            <div className="images space-y-2">
              <label className="block text-sm font-medium">Product Images</label>
              <div className="flex flex-col gap-4">
                <div className="flex flex-wrap gap-2">
                  {files.map((file, index) => (
                    <ImagePreview
                      key={file.name}
                      file={file}
                      onRemove={() => removeFile(index)}
                    />
                  ))}
                  <label
                    className={`h-24 w-24 rounded-lg border-2 border-dashed flex items-center justify-center cursor-pointer transition-colors group ${
                      files.length ? "border-foreground-light" : "border-accent bg-accent/10"
                    }`}
                  >
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleFileChange}
                      accept="image/*"
                      multiple
                    />
                    <ImageUp className="group-hover:stroke-accent transition-all duration-300" />
                  </label>
                </div>
                <p className="text-sm text-foreground-light">
                  {files.length} image{files.length !== 1 && "s"} selected
                </p>
              </div>
            </div>

            {/* category assignment */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Category Assignment</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="existingCategory"
                    checked={!creatingNewCategory}
                    onChange={(e) => setCreatingNewCategory(!e.target.checked)}
                    className="h-4 w-4 text-accent focus:ring-accent rounded border-foreground-light accent-accent"
                  />
                  <label htmlFor="existingCategory" className="text-sm">
                    Add to existing category
                  </label>
                </div>
                {!creatingNewCategory ? (
                  <div className="space-y-2">
                    <CustomSelect
                      options={categories.map((cat) => ({
                        value: cat.id,
                        label: cat.name,
                      }))}
                      value={selectedCategoryId}
                      onChange={(e) => setSelectedCategoryId(e.target.value)}
                      placeholder="Select a category"
                    />
                    {categoryError && (
                      <p className="text-sm text-red-600">{categoryError}</p>
                    )}
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Input
                      id="newCategoryName"
                      label="New Category Name"
                      value={newCategoryName}
                      onChange={(e) => setNewCategoryName(e.target.value)}
                      error={newCategoryNameError}
                      required
                    />
                    <div className="space-y-2">
                      <label className="block text-sm font-medium">
                        Parent Category (optional)
                      </label>
                      <CustomSelect
                        options={categories.map((cat) => ({
                          value: cat.id,
                          label: cat.name,
                        }))}
                        value={newCategoryParent}
                        onChange={(e) => setNewCategoryParent(e.target.value)}
                        placeholder="-- No parent --"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* error & success messages */}
        {/* {errorMessage && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {errorMessage}
          </div>
        )}

        {successMessage && (
          <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-green-700">
            {successMessage}
          </div>
        )} */}

        <Button
          type="submit"
          label={uploading ? "Creating Product..." : "Create Product"}
          disabled={uploading}
          className="w-full"
          iconPosition="right"
        />
      </form>
    </div>
  );
};

export default ProductForm;