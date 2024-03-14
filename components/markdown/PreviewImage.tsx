import React from 'react';
import Image from 'next/image';

interface PreviewImageProps {
  src: string;
  alt: string;
}

const PreviewImage: React.FC<PreviewImageProps> = ({ src,alt }) => {
  return (
    <div className="preview-image" data-alt={alt}>
      <Image
        width={ 1920 }
        height={ 1080 }
        style={ { width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' } }
        className="r-lg"
        alt={alt}
        src={src}
      />
    </div>
  );
};

export default PreviewImage;