const MAX_IMAGE_SIZE = 5_000_000; // 5 MB
const MAX_IMAGES = 5;

// ".jpg" | ".jpeg" | ".png" | ".webp"

/** /(jpg|jpeg|png|webp)$/i */
const ALLOWED_FILE_EXTENSIONS_REGEX = /(jpg|jpeg|png|webp)$/i;

export { ALLOWED_FILE_EXTENSIONS_REGEX, MAX_IMAGE_SIZE, MAX_IMAGES };
