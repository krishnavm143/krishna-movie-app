import { LazyLoadImage } from "react-lazy-load-image-component";
type LazyImageProps = { src: string; className: string };
const LazyImage: React.FC<LazyImageProps> = ({ src, className }) => {
  return (
    <>
      <LazyLoadImage src={src} className={className || ""} effect="blur" />
    </>
  );
};

export { LazyImage };
