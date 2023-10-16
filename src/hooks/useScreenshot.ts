import html2canvas from 'html2canvas';
import { useCallback, useState } from 'react';

import { ScreenshotImageType } from '../types';

type UseScreenshotInput = {
  cropPositionLeft?: number;
  cropPositionTop?: number;
  quality?: number;
  type?: ScreenshotImageType;
};

function useScreenshot({
  cropPositionLeft = 0,
  cropPositionTop = 0,
  quality = 1.0,
  type = 'image/png',
}: UseScreenshotInput) {
  const [image, setImage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function takeScreenshot(node: HTMLElement | null) {
    if (!node) {
      setErrorMessage('node is not defined');
      return;
    }

    if (!window) {
      setErrorMessage('window is not defined');
      return;
    }

    if (!window.document) {
      setErrorMessage('window.document is not defined');
      return;
    }

    return html2canvas(node)
      .then((canvas) => {
        const croppedCanvas = window.document.createElement('canvas');
        const croppedCanvasContext = croppedCanvas.getContext('2d');

        if (!croppedCanvasContext) {
          setErrorMessage('canvas context is not defined');
          return;
        }

        const cropWidth = canvas.width;
        const cropHeight = canvas.height;

        croppedCanvas.width = cropWidth;
        croppedCanvas.height = cropHeight;

        croppedCanvasContext.drawImage(
          canvas,
          cropPositionLeft,
          cropPositionTop
        );

        const base64Image = canvas.toDataURL(type, quality);
        setImage(base64Image);

        return base64Image;
      })
      .catch((error: any) => {
        setErrorMessage(error?.message ?? 'Unable to take screenshot');
      });
  }

  return {
    errorMessage,
    image,
    takeScreenshot: useCallback(takeScreenshot, []),
  };
}

export { useScreenshot };
