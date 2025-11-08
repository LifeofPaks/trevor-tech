
import { Helmet } from "react-helmet-async";

const SEO = ({ title, description, url, image }) => (
  <Helmet>
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    {url && <meta property="og:url" content={url} />}
    {image && <meta property="og:image" content={image} />}
  </Helmet>
);

export default SEO;


