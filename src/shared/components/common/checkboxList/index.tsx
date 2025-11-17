'use client';

import React from 'react';
import {Checkbox} from '@/shared/components/ui/checkbox';

interface FeatureItem {
  label: string;
  value: string;
}

interface FeatureGroup {
  title: string;
  items: FeatureItem[];
}

interface CheckboxListProps {
  groups: FeatureGroup[];
  selected?: string[];
  onChange?: (selected: string[]) => void;
  className?: string;
}

export const CheckboxList: React.FC<CheckboxListProps> = ({
  groups,
  selected = [],
  onChange,
  className = '',
}) => {
  const handleToggle = (value: string) => {
    const newSelected = selected.includes(value)
      ? selected.filter((v) => v !== value)
      : [...selected, value];
    onChange?.(newSelected);
  };

  return (
    <div
      className={`grid sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full ${className}`}
    >
      {groups.map((group, idx) => (
        <div key={idx} className='space-y-2'>
          <h3 className='text-sm font-semibold text-gray90'>{group.title}</h3>
          <div className='flex flex-col space-y-2'>
            {group.items.map((item) => (
              <label
                key={item.value}
                className='flex items-center space-x-2 text-sm text-gray90 cursor-pointer'
              >
                <Checkbox
                  checked={selected.includes(item.value)}
                  onCheckedChange={() => handleToggle(item.value)}
                />
                <span>{item.label}</span>
              </label>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
