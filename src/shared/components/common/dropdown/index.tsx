'use client';

import * as React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';
import {Button} from '@/shared/components/ui/button';

export interface HoverDropdownProps {
  label: React.ReactNode;
  items: {label: string; onClick?: () => void}[];
}

export function HoverDropdown({label, items}: HoverDropdownProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      {/* ✅ The trigger must always render something visible */}
      <DropdownMenuTrigger asChild>
        <div
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
        >
          {label}
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        {items.map((item, i) => (
          <DropdownMenuItem key={i} onClick={item.onClick}>
            {item.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
