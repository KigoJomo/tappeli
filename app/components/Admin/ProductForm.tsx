// app/components/Admin/ProductForm.tsx
'use client';

import React, {
  useState,
  useEffect,
  ChangeEvent,
  FormEvent,
  useCallback,
} from 'react';
import { uploadImage } from '@/utils/supabase/storage';
import {
  createProduct,
  getCategories,
  createCategory,
  assignCategoryToProduct,
  getGelatoTemplates,
  createProductVariant,
} from '@/utils/supabase/api';
import type {
  Category,
  GelatoTemplate,
  GelatoVariant,
} from '@/utils/supabase/types';
import { Input } from '@/app/components/Input';
import Button from '@/app/components/Button';
import Image from 'next/image';
import { ImageUp, X } from 'lucide-react';
import { useToast } from '@/context/ToastContext';

const ImagePreview = ({
  file,
  onRemove,
}: {
  file: File;
  onRemove: () => void;
}) => (
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
      className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full shadow-sm hover:bg-red-600 transition-colors">
      <X size={16} />
    </button>
  </div>
);

const CustomSelect = ({
  options,
  value,
  onChange,
  placeholder = 'Select...',
  className = '',
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
      className={`w-full rounded-lg border border-foreground-light px-4 py-2 bg-background focus:border-accent appearance-none transition-all duration-300 ${className}`}>
      <option value="" className="text-foreground bg-background">
        {placeholder}
      </option>
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
        viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </div>
  </div>
);

const ProductForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('');
  const [creatingNewCategory, setCreatingNewCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryParent, setNewCategoryParent] = useState('');
  const [templates, setTemplates] = useState<GelatoTemplate[]>([]);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('');
  const [variants, setVariants] = useState<GelatoVariant[]>([]);
  const [variantPrices, setVariantPrices] = useState<Record<string, number>>(
    {}
  );
  const [basePrice, setBasePrice] = useState<number>(0);
  const { showToast } = useToast();

  useEffect(() => {
    async function fetchData() {
      try {
        const [cats, temps] = await Promise.all([
          getCategories(),
          getGelatoTemplates(),
        ]);
        setCategories(cats);
        setTemplates(temps);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

  const generateSlug = (text: string): string => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[\s\W-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleFileChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles((prev) => [
        ...prev,
        ...newFiles.filter(
          (f) => !prev.some((existing) => existing.name === f.name)
        ),
      ]);
    }
  }, []);

  const removeFile = useCallback((index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const loadTemplateVariants = async (templateId: string) => {
    try {
      const template = templates.find((t) => t.id === templateId);
      setVariants(template?.variants as unknown as GelatoVariant[]);
    } catch (error) {
      console.error('Error loading variants:', error);
    }
  };

  const validateForm = () => {
    let isValid = true;

    if (!title.trim()) {
      showToast('Title is required', 'error');
      isValid = false;
    }

    if (!description.trim()) {
      showToast('Description is required', 'error');
      isValid = false;
    }

    if (!selectedTemplateId) {
      showToast('Please select a product template', 'error');
      isValid = false;
    }

    if (basePrice <= 0) {
      showToast('Base price must be greater than 0', 'error');
      isValid = false;
    }

    if (Object.values(variantPrices).some((price) => price <= 0)) {
      showToast('All variant prices must be greater than 0', 'error');
      isValid = false;
    }

    if (!creatingNewCategory && !selectedCategoryId) {
      showToast('Please select a category or create a new one', 'error');
      isValid = false;
    }

    if (creatingNewCategory && !newCategoryName.trim()) {
      showToast('Category name is required', 'error');
      isValid = false;
    }

    return isValid;
  };

  const handlePriceChange = (variantId: string, price: number) => {
    setVariantPrices((prev) => ({
      ...prev,
      [variantId]: price,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setUploading(true);
    showToast('Creating product...', 'info');

    try {
      const uploadedUrls = await Promise.all(
        files.map((file) => uploadImage(file))
      );

      const productData = {
        title,
        slug: generateSlug(title),
        description,
        image_urls: uploadedUrls,
        gelato_template_id: selectedTemplateId,
        base_price: basePrice,
      };

      const product = await createProduct(productData);

      await Promise.all(
        variants.map((variant) =>
          createProductVariant({
            product_id: product.id,
            gelato_variant_id: variant.id,
            product_uid: variant.productUid,
            variant_options: variant.variantOptions,
            price: variantPrices[variant.id] || basePrice,
          })
        )
      );

      let categoryId = selectedCategoryId;
      if (creatingNewCategory) {
        const newCat = await createCategory({
          name: newCategoryName,
          slug: generateSlug(newCategoryName),
          description: '',
          parent_id: newCategoryParent || null,
        });
        categoryId = newCat.id;
      }

      if (categoryId) {
        await assignCategoryToProduct(product.id, categoryId);
      }

      showToast('Product created successfully!', 'success');
      setTitle('');
      setDescription('');
      setFiles([]);
      setSelectedCategoryId('');
      setCreatingNewCategory(false);
      setNewCategoryName('');
      setNewCategoryParent('');
      setSelectedTemplateId('');
      setVariants([]);
      setVariantPrices({});
      setBasePrice(0);
    } catch (error) {
      console.error('Error creating product:', error);
      showToast('Error creating product', 'error');
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
              required
            />

            <div className="space-y-2">
              <label className="block text-sm font-medium">
                Product Template
              </label>
              <CustomSelect
                options={templates.map((t) => ({
                  value: t.id,
                  label: t.name,
                }))}
                value={selectedTemplateId}
                onChange={(e) => {
                  setSelectedTemplateId(e.target.value);
                  loadTemplateVariants(e.target.value);
                }}
                placeholder="Select a template"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="description"
                className="block text-sm font-medium">
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full rounded-lg border border-foreground-light px-4 py-2 bg-transparent outline-none focus:outline-none focus:border-accent transition-all duration-300"
                rows={4}
                required
              />
            </div>

            {variants.length > 0 && (
              <div className="space-y-4">
                <h3 className="font-medium">Variant Pricing</h3>
                <Input
                  label="Base Price"
                  type="number"
                  value={basePrice}
                  onChange={(e) => setBasePrice(Number(e.target.value))}
                  step="0.01"
                  required
                />

                {variants.map((variant) => (
                  <div
                    key={variant.id}
                    className="space-y-2 p-3 border rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{variant.title}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      {variant.variantOptions.map(
                        (option: { name: string; value: string }) => (
                          <div key={option.name} className="flex gap-1">
                            <span className="text-foreground-light">
                              {option.name}:
                            </span>
                            <span>{option.value}</span>
                          </div>
                        )
                      )}
                    </div>
                    <Input
                      label="Price Override"
                      type="number"
                      value={variantPrices[variant.id] || basePrice}
                      onChange={(e) =>
                        handlePriceChange(variant.id, Number(e.target.value))
                      }
                      step="0.01"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="col-span-1 flex flex-col gap-6 bg-foreground-faded p-4 md:p-6 rounded-3xl">
            <div className="space-y-2">
              <label className="block text-sm font-medium">
                Product Images
              </label>
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
                      files.length
                        ? 'border-foreground-light'
                        : 'border-accent bg-accent/10'
                    }`}>
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
                  {files.length} image{files.length !== 1 && 's'} selected
                </p>
              </div>
            </div>

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
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Input
                      id="newCategoryName"
                      label="New Category Name"
                      value={newCategoryName}
                      onChange={(e) => setNewCategoryName(e.target.value)}
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

        <Button
          type="submit"
          label={uploading ? 'Creating Product...' : 'Create Product'}
          disabled={uploading}
          className="w-full"
          iconPosition="right"
        />
      </form>
    </div>
  );
};

export default ProductForm;
