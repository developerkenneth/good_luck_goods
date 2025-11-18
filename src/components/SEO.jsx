import {
  Title,
  Meta,
  Link as HeadLink,
  HeadProvider,
} from "react-head";

export default function SEO({
  title,
  description,
  keywords,
  url,
  type = "website",
}) {
  return (
    <>
    <HeadProvider>
      {/* Basic SEO */}
      <Title>{`GOODLUCKS - ${title}`}</Title>
      <Meta name="description" content={description} />
      <Meta name="keywords" content={`quality, affordable, cheap, phones, electronics, shopping Ghana, goodlucks, sofa, goods ${keywords}`} />

      {/* Canonical URL */}
      <HeadLink rel="canonical" href={`https://shop.goodlucks.co`} />

      {/* Open Graph / Facebook / WhatsApp */}
      <Meta property="og:type" content={type} />
      <Meta property="og:title" content={`GOODLUCKS - ${title}`} />
      <Meta property="og:description" content={description} />
      <Meta property="og:image" content={`https://images.unsplash.com/photo-1483985988355-763728e1935b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvcHBpbmd8ZW58MHx8MHx8fDA%3D`} />
      <Meta property="og:url" content={url} />

      {/* Twitter */}
      <Meta name="twitter:card" content="summary_large_image" />
      <Meta name="twitter:title" content={`GOODLUCKS - ${title}`} />
      <Meta name="twitter:description" content={description} />
      <Meta name="twitter:image" content={`https://images.unsplash.com/photo-1483985988355-763728e1935b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvcHBpbmd8ZW58MHx8MHx8fDA%3D`} />

      {/* Favicon */}
      <HeadLink rel="icon" href="/favicon.ico" />
      </HeadProvider>
    </>
  );
}
