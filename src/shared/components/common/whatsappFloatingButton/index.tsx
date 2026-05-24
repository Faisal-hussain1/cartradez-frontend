'use client';

import Image from 'next/image';
import {MessageCircle} from 'lucide-react';
import {useState} from 'react';

const FALLBACK_WHATSAPP_NUMBER = '+260574928425';
const FALLBACK_WECHAT_URL = 'weixin://dl/chat';
const FALLBACK_WECHAT_QR_IMAGE = '/images/chat/wechat-qr.jpeg';

export default function WhatsAppFloatingButton() {
  const [isWeChatQrOpen, setIsWeChatQrOpen] = useState(false);
  const whatsappNumber =
    (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || FALLBACK_WHATSAPP_NUMBER).replace(
      /[^0-9]/g,
      ''
    );
  const weChatUrl = process.env.NEXT_PUBLIC_WECHAT_URL || FALLBACK_WECHAT_URL;
  const weChatQrImage =
    process.env.NEXT_PUBLIC_WECHAT_QR_IMAGE || FALLBACK_WECHAT_QR_IMAGE;
  const hasQrImage = Boolean(weChatQrImage);

  if (!whatsappNumber && !weChatUrl && !hasQrImage) return null;

  return (
    <>
      <div className='fixed bottom-20 md:bottom-5 right-4 md:right-5 z-30 group'>
        <div className='mb-3 flex flex-col items-end gap-2 opacity-0 translate-y-2 pointer-events-none transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto group-focus-within:opacity-100 group-focus-within:translate-y-0 group-focus-within:pointer-events-auto'>
          {whatsappNumber ? (
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target='_blank'
              rel='noopener noreferrer'
              aria-label='Chat on WhatsApp'
              className='rounded-full bg-[#25D366] px-4 py-2 text-sm font-medium text-white shadow-lg transition-transform hover:scale-105'
            >
              WhatsApp
            </a>
          ) : null}
          {hasQrImage ? (
            <button
              type='button'
              onClick={() => setIsWeChatQrOpen(true)}
              aria-label='Show WeChat QR code'
              className='rounded-full bg-[#07C160] px-4 py-2 text-sm font-medium text-white shadow-lg transition-transform hover:scale-105'
            >
              We Chat
            </button>
          ) : weChatUrl ? (
            <a
              href={weChatUrl}
              target='_blank'
              rel='noopener noreferrer'
              aria-label='Chat on WeChat'
              className='rounded-full bg-[#07C160] px-4 py-2 text-sm font-medium text-white shadow-lg transition-transform hover:scale-105'
            >
              We Chat
            </a>
          ) : null}
        </div>

        <button
          type='button'
          aria-label='Open chat options'
          className='h-14 w-14 rounded-full bg-[#25D366] text-white shadow-lg hover:scale-105 transition-transform flex items-center justify-center'
        >
          <MessageCircle size={26} />
        </button>
      </div>

      {isWeChatQrOpen ? (
        <div
          className='fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4'
          onClick={() => setIsWeChatQrOpen(false)}
        >
          <div
            className='w-full max-w-sm rounded-xl bg-white p-4'
            onClick={(e) => e.stopPropagation()}
          >
            <p className='mb-3 text-center text-sm font-semibold text-gray-800'>
              Scan this WeChat QR to chat
            </p>
            <Image
              src={weChatQrImage}
              alt='WeChat QR code'
              width={640}
              height={640}
              className='h-auto w-full rounded-md'
              priority
            />
            <button
              type='button'
              onClick={() => setIsWeChatQrOpen(false)}
              className='mt-3 w-full rounded-md bg-[#07C160] py-2 text-sm font-medium text-white'
            >
              Close
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
