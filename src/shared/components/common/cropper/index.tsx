import Image from 'next/image';
import React from 'react';
import ReactCrop from 'react-image-crop';
import {ImageCropperProps} from '@/shared/interfaces/common';
import 'react-image-crop/dist/ReactCrop.css';

const ImageCropper = ({
  crop,
  handleCrop,
  imageWidth,
  imageHeight,
  imagePreview,
  imageRef,
}: ImageCropperProps) => {
  return (
    <ReactCrop crop={crop} onChange={handleCrop} aspect={1}>
      <Image
        src={imagePreview}
        alt='image'
        width={imageWidth}
        height={imageHeight}
        ref={imageRef}
      />
    </ReactCrop>
  );
};

export default ImageCropper;
