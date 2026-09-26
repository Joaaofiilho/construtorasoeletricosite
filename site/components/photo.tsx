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

export function GalleryPhoto({ photo }: { photo: (typeof photos)['hero'] }) {
  return (
    <a
      href={photo.src}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Ampliar: ${photo.alt} (abre em nova aba)`}
    >
      <figure>
        <img
          src={photo.src}
          srcSet={photo.srcSet}
          sizes="(max-width: 600px) 90vw, (max-width: 1000px) 45vw, 30vw"
          alt={photo.alt}
          width={photo.width}
          height={photo.height}
          loading="lazy"
        />
        <figcaption>{photo.caption}</figcaption>
      </figure>
    </a>
  );
}
