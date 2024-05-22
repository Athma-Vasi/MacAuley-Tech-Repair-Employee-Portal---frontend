function validateImages({
  allowedFileExtensionsRegex,
  imageFileBlobs,
  maxImageSize,
  maxImages,
}: {
  allowedFileExtensionsRegex: RegExp;
  imageFileBlobs: (File | Blob | null)[];
  maxImageSize: number;
  maxImages: number;
}) {
  const areImagesInvalid =
    imageFileBlobs.length > maxImages ||
    imageFileBlobs.reduce((invalidAcc, fileBlob) => {
      if (fileBlob === null) {
        return true;
      }

      const { size, type } = fileBlob;
      if (size > maxImageSize) {
        return true;
      }

      if (!type.length) {
        return true;
      }

      const extension = type.split("/")[1];
      if (!allowedFileExtensionsRegex.test(extension)) {
        return true;
      }

      return invalidAcc;
    }, false);

  return { areImagesInvalid };
}

export { validateImages };
