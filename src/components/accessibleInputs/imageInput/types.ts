type AccessibleImageInputState = {
  images: File[];
  imagePreviews: (File | Blob)[];

  areImageSizesValid: boolean[];
  areImageKindsValid: boolean[];
  areImageTypesValid: boolean[];

  qualities: number[];
  orientations: number[];

  isLoading: boolean;
  loadingMessage: string;
};
