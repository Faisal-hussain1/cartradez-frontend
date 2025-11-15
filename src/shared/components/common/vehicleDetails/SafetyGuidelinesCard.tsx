// components/SafetyGuidelinesCard.tsx
'use client';

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/shared/components/ui/card';

import {useRouter} from 'next/navigation';

export default function SafetyGuidelinesCard() {
  const router = useRouter();

  return (
    <Card className='w-full rounded-2xl shadow-md'>
      <CardHeader className='pb-3 px-6 flex items-start gap-2'>
        <CardTitle className='text-lg font-semibold text-black'>
          Buy & Sell Safety
        </CardTitle>
      </CardHeader>

      <CardContent className='flex flex-col gap-3 px-6 pb-4'>
        <p className='text-sm text-gray80'>
          Stay alert and protect yourself when making deals.
        </p>
        <div className='text-sm text-gray80 space-y-1 pl-4'>
          <p>• Meet in safe, public places during daylight hours.</p>
          <p>• Never share personal or financial details online.</p>
          <p>• Inspect the car carefully before making any payment.</p>
          <p>• Verify all vehicle documents and ownership proof.</p>
          <p>• Avoid advance payments or deposits before inspection.</p>
          <p>• Report suspicious listings or sellers immediately.</p>
        </div>
      </CardContent>

      <CardFooter className='pt-0 px-6 pb-4'>
        <button
          onClick={() => router.push('/guidelines')}
          className='border cursor-pointer border-primary text-primary hover:bg-primary/10 font-medium text-sm transition-colors px-5 py-4 rounded-md'
        >
          Read Full Safety Guidelines
        </button>
      </CardFooter>
    </Card>
  );
}
