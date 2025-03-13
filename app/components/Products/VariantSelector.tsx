// app/components/Products/VariantSelector.tsx
'use client';

import { useState } from 'react';

interface VariantSelectorProps {
  name: string;
  values: string[];
}

export default function VariantSelector({ name, values }: VariantSelectorProps) {
  const [selectedValue, setSelectedValue] = useState('');

  return (
    <div className="space-y-2">
      <h4 className="text-sm font-medium capitalize">{name}</h4>
      <div className="flex flex-wrap gap-2">
        {values.map((value) => (
          <button
            key={value}
            onClick={() => setSelectedValue(value)}
            className={`px-4 py-2 rounded-full border ${
              selectedValue === value
                ? 'border-accent bg-accent/10'
                : 'border-foreground-faded hover:border-foreground'
            } transition-colors`}
          >
            {value}
          </button>
        ))}
      </div>
    </div>
  );
}