import DOMPurify from 'dompurify';

// Server-side DOMPurify setup - only initialize on server
let purify: ReturnType<typeof DOMPurify>;

if (typeof window === 'undefined') {
  // Server-side initialization
  const { JSDOM } = require('jsdom');
  const window = new JSDOM('').window;
  purify = DOMPurify(window as any);
} else {
  // Client-side initialization
  purify = DOMPurify;
}

// Configure DOMPurify with safe options
purify.setConfig({
  ALLOWED_TAGS: [
    'p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    'ul', 'ol', 'li', 'blockquote', 'a', 'img', 'table', 'thead', 'tbody',
    'tr', 'th', 'td', 'div', 'span'
  ],
  ALLOWED_ATTR: [
    'href', 'title', 'alt', 'src', 'width', 'height', 'class', 'id'
  ],
  ALLOWED_URI_REGEXP: /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i,
});

/**
 * Sanitizes HTML content to prevent XSS attacks
 * @param dirty - The raw HTML content that needs to be sanitized
 * @returns Sanitized HTML content safe for rendering
 */
export const sanitizeHtml = (dirty: string): string => {
  if (!dirty) return '';
  
  try {
    return purify.sanitize(dirty, { RETURN_DOM_FRAGMENT: false }) as string;
  } catch (error) {
    console.error('HTML sanitization failed:', error);
    // Fallback: strip all HTML tags if sanitization fails
    return dirty.replace(/<[^>]*>/g, '');
  }
};

/**
 * Client-side HTML sanitization for React components
 * @param dirty - The raw HTML content that needs to be sanitized
 * @returns Sanitized HTML content safe for rendering
 */
export const sanitizeHtmlClient = (dirty: string): string => {
  if (!dirty) return '';
  
  // Check if running in browser
  if (typeof window === 'undefined') {
    return sanitizeHtml(dirty);
  }
  
  try {
    return DOMPurify.sanitize(dirty);
  } catch (error) {
    console.error('Client-side HTML sanitization failed:', error);
    return dirty.replace(/<[^>]*>/g, '');
  }
};