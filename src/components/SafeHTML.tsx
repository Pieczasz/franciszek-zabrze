'use client';

import { useEffect, useState } from 'react';
import { sanitizeHtmlClient } from '@/lib/sanitize';

interface SafeHTMLProps {
  content: string;
  className?: string;
  fallback?: string;
}

/**
 * SafeHTML component that renders sanitized HTML content
 * Protects against XSS attacks by sanitizing HTML on both server and client side
 */
export function SafeHTML({ content, className, fallback = '' }: SafeHTMLProps) {
  const [sanitizedContent, setSanitizedContent] = useState<string>('');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (content) {
      const cleaned = sanitizeHtmlClient(content);
      setSanitizedContent(cleaned);
    }
  }, [content]);

  // During SSR or before hydration, don't render potentially unsafe content
  if (!isClient) {
    return <div className={className}>{fallback}</div>;
  }

  if (!sanitizedContent) {
    return <div className={className}>{fallback}</div>;
  }

  return (
    <div
      className={className}
      // biome-ignore lint/security/noDangerouslySetInnerHtml: we need it here
      dangerouslySetInnerHTML={{
        __html: sanitizedContent,
      }}
    />
  );
}