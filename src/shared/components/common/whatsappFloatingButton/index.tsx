'use client';

import {MessageCircle} from 'lucide-react';

const FALLBACK_WHATSAPP_NUMBER = '+260574928425';

export default function WhatsAppFloatingButton() {
  const whatsappNumber =
    (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || FALLBACK_WHATSAPP_NUMBER).replace(
      /[^0-9]/g,
      ''
    );

  if (!whatsappNumber) return null;

  return (
    <a
      href={`https://wa.me/${whatsappNumber}`}
      target='_blank'
      rel='noopener noreferrer'
      aria-label='Chat on WhatsApp'
      className='fixed bottom-5 right-5 z-[60] h-14 w-14 rounded-full bg-[#25D366] text-white shadow-lg hover:scale-105 transition-transform flex items-center justify-center'
    >
      <MessageCircle size={26} />
    </a>
  );
}
