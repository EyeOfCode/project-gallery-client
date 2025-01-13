import { ImageData } from '@/app/interfaces/image.interface';
import Image from 'next/image';

interface GalleryComponentProps {
  images: ImageData[];
  setTag: (tag: string) => void;
}

export const GalleryComponent: React.FC<GalleryComponentProps> = ({
  images,
  setTag,
}) => {
  return (
    <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4">
      {images.map((img, index) => (
        <div key={`${img.id}-${index}`} className="mb-4 break-inside-avoid">
          <div className="relative group">
            <Image
              src={`${process.env.NEXT_PUBLIC_GALLERY_URL || 'https://placehold.co'}/${img.width}x${img.height}`}
              alt={`Image ${img.id}`}
              width={img.width}
              height={img.height}
              loading="lazy"
              placeholder="blur"
              blurDataURL="/assets/loading.jpeg"
              className="w-full rounded-lg shadow-md transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 rounded-b-lg">
              <div className="flex flex-wrap gap-2">
                {img.tags.map((tag, index) => (
                  <span
                    key={`${tag}-${index}`}
                    onClick={() => setTag(tag)}
                    className="text-sm text-white bg-black/30 px-2 py-1 rounded-full cursor-pointer hover:bg-black/50"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
