'use client';

interface DescriptionCardProps {
  title?: string;
  paragraphs?: string[];
  bullets?: string[];
}

export default function DescriptionCard({
  title = 'Description',
  paragraphs = [
    `Experience unmatched performance and craftsmanship with the Bugatti Chiron Super Sport 2022 — a masterpiece of engineering that pushes the limits of automotive excellence.`,
    `Powered by an 8.0-liter quad-turbocharged W16 engine producing 1,577 horsepower, this machine delivers breathtaking acceleration and effortless control.`,
  ],
  bullets = [
    `Unmatched performance: Powered by an 8.0L quad-turbocharged W16 engine delivering 1,577 horsepower.`,
    `Record-breaking speed: Accelerates from 0–100 km/h in just 2.4 seconds — pure engineering art.`,
  ],
}: DescriptionCardProps) {
  return (
    <div className='bg-white rounded-[16px] shadow-sm w-full p-6 flex flex-col gap-4'>
      <h2 className='text-lg font-semibold text-gray-900'>{title}</h2>

      {paragraphs.map((para, idx) => (
        <p key={idx} className='text-sm text-gray-700 leading-relaxed'>
          {para}
        </p>
      ))}

      {/* {bullets && bullets.length > 0 && (
        <ul className='list-disc ml-6 text-sm text-gray-700 leading-relaxed space-y-2'>
          {bullets.map((bullet, idx) => (
            <li key={idx}>{bullet}</li>
          ))}
        </ul>
      )} */}
    </div>
  );
}
