import { photos } from '@/lib/content';

export function Photo({
  name,
  className = '',
  priority = false,
  sizes,
}: {
  name: keyof typeof photos;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  const photo = photos[name];
  return (
    <figure className={`photo ${className}`}>
      <div className="photo-frame">
        <img
          src={photo.src}
          srcSet={photo.srcSet}
          sizes={
            sizes ??
            (name === 'detail'
              ? '(max-width: 800px) 100vw, 42vw'
              : '(max-width: 800px) 100vw, 80vw')
          }
          alt={photo.alt}
          width={photo.width}
          height={photo.height}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
        />
      </div>
      <figcaption>{photo.caption}</figcaption>
    </figure>
  );
}
