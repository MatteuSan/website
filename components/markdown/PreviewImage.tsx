import React from 'react';
import Image from 'next/image';
import { m } from 'framer-motion';

interface PreviewImageProps {
  src: string;
  alt: string;
}

const PreviewImage: React.FC<PreviewImageProps> = ({ src,alt }) => {
  const enterAnimation = {
    initial: { opacity: 0, y: 30 },
    enter: { opacity: 1, y: 0, transition: { duration: 0.7 } },
  }

  return (
    <m.div
      className="preview-image"
      data-alt={alt}
      variants={enterAnimation}
      initial="initial"
      whileInView="enter"
      viewport={{ once: true, margin: '-20%' }}
    >
      <Image
        width={ 1920 }
        height={ 1080 }
        style={ { width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' } }
        className="r-lg"
        alt={alt}
        src={src}
      />
    </m.div>
  );
};

export default PreviewImage;