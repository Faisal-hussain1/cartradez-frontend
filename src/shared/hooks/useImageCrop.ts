import {useRef, useState, useEffect} from 'react';
import {Crop} from 'react-image-crop';
import {getCroppedImg} from '@/shared/utils/imageUtils';

export const useImageCrop = ({initialImage}: {initialImage: string}) => {
  const imageRef = useRef(null);
  const [isCropModalOpen, setIsCropModalOpen] = useState(false);
  const [croppedImageBlob, setCroppedImageBlob] = useState<Blob | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isLogoRemoved, setIsLogoRemoved] = useState(false);

  const [imagePreview, setImagePreview] = useState<string>(initialImage);

  const [tempImagePreview, setTempImagePreview] = useState<string | null>(null);

  const [crop, setCrop] = useState<Crop>({
    unit: 'px',
    x: 0,
    y: 0,
    width: 50,
    height: 50,
  });

  useEffect(() => {
    if (croppedImageBlob) {
      const croppedImgUrl = URL.createObjectURL(croppedImageBlob);
      setImagePreview(croppedImgUrl);
      setTempImagePreview(null);
    }
  }, [croppedImageBlob, setImagePreview, setTempImagePreview]);

  const handleCrop = (c: Crop) => {
    setCrop(c);
  };

  const handleCropComplete = async () => {
    if (imageRef.current && crop.width && crop.height) {
      const croppedImgBlob = await getCroppedImg(imageRef.current, crop);
      setCroppedImageBlob(croppedImgBlob);
    }
  };

  return {
    handleCrop,
    handleCropComplete,
    imagePreview,
    setImagePreview,
    tempImagePreview,
    setTempImagePreview,
    isCropModalOpen,
    setIsCropModalOpen,
    croppedImageBlob,
    file,
    setFile,
    isLogoRemoved,
    setIsLogoRemoved,
    crop,
    setCrop,
    imageRef,
  };
};
