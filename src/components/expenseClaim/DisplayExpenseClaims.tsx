import { ImageUpload } from '../imageUpload';

function DisplayExpenseClaims() {
  return (
    <>
      <ImageUpload maxImages={3} maxImageSize={1_000_000} />
    </>
  );
}

export { DisplayExpenseClaims };
