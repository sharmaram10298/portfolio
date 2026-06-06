import { Helmet } from 'react-helmet-async';
import type { SEOProps } from '@/types/index';

export function SEOHead({ title, description, ogImage, ogUrl }: SEOProps) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={ogUrl} />
      <meta property="og:type" content="website" />
    </Helmet>
  );
}
