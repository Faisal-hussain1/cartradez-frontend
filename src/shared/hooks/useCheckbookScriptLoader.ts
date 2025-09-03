import {useEffect, useState} from 'react';
import {UseCheckbookScriptLoaderProps} from '@/shared//interfaces/checkbook';

export const useCheckbookScriptLoader = ({
  token,
}: UseCheckbookScriptLoaderProps) => {
  const [scriptError, setScriptError] = useState(false);

  useEffect(() => {
    if (!token) return;

    const script = document.createElement('script');
    script.src = process.env.NEXT_PUBLIC_CHECKBOOK_EMBED_URL || '';
    script.async = true;

    script.onload = () => {
      if (typeof window !== 'undefined' && window.checkbook?.deposit) {
        setScriptError(false);
      } else {
        setScriptError(true);
      }
    };

    script.onerror = () => {
      setScriptError(true);
    };

    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, [token]);

  return {scriptError};
};
