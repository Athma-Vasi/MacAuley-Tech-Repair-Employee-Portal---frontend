import {
  Card,
  DefaultProps,
  Group,
  Image,
  ImageStylesNames,
  ImageStylesParams,
  LoadingOverlay,
  MantineNumberSize,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { CSSProperties, useEffect, useState } from "react";
import { TbPhotoOff } from "react-icons/tb";

import { useGlobalState } from "../../hooks";

// from mantine
export interface ImageProps
  extends DefaultProps<ImageStylesNames, ImageStylesParams>,
    Omit<React.ComponentPropsWithoutRef<"div">, "placeholder"> {
  variant?: string;
  /** Image src */
  src?: string | null;
  /** Image alt text, used as title for placeholder if image was not loaded */
  alt?: string;
  /** Image object-fit property */
  fit?: React.CSSProperties["objectFit"];
  /** Image width, defaults to 100%, cannot exceed 100% */
  width?: number | string;
  /** Image height, defaults to original image height adjusted to given width */
  height?: number | string;
  /** Key of theme.radius or any valid CSS value to set border-radius, 0 by default */
  radius?: MantineNumberSize;
  /** Enable placeholder when image is loading and when image fails to load */
  withPlaceholder?: boolean;
  /** Customize placeholder content */
  placeholder?: React.ReactNode;
  /** Props spread to img element */
  imageProps?: React.ComponentPropsWithoutRef<"img">;
  /** Get image element ref */
  imageRef?: React.ForwardedRef<HTMLImageElement>;
  /** Image figcaption, displayed below image */
  caption?: React.ReactNode;
}

interface AccessibleImageCreatorInfo extends ImageProps {
  customWidth?: MantineNumberSize;
  customHeight?: MantineNumberSize;
  customRadius?: MantineNumberSize;
  fallbackAlt?: string;
  fallbackSrc?: string;
  imageSrc?: string;
  imageAlt?: string;
  isCard?: boolean;
  isOverlay?: boolean;
  isLoader?: boolean;
  onClick?: () => void;
  onError?: () => void;
  overlayText?: string;
  style?: CSSProperties;
}

type ImageWrapperProps = {
  creatorInfoObject: AccessibleImageCreatorInfo;
};

function ImageWrapper({ creatorInfoObject }: ImageWrapperProps) {
  const {
    globalState: { padding },
  } = useGlobalState();
  const [loadingOverlayVisible, { toggle: toggleLoadingOverlay }] = useDisclosure(false);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [isImageLoadFailed, setIsImageLoadFailed] = useState(false);

  useEffect(() => {
    toggleLoadingOverlay();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isImageLoading, isImageLoadFailed]);

  const {
    customWidth,
    customHeight,
    customRadius,
    fallbackAlt = "Image failed to load. Here is a picture of a guinea pig having a thought!",
    fallbackSrc = "https://images.pexels.com/photos/19621200/pexels-photo-19621200/free-photo-of-close-up-of-two-guinea-pigs.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    fit = "fill",
    imageSrc = fallbackSrc,
    imageAlt = fallbackAlt,
    isCard = false,
    isLoader = false,
    isOverlay = false,
    onClick = () => {},
    onError = () => {
      setIsImageLoadFailed(true);
    },
    overlayText = "",
    style = {},
    withPlaceholder = true,
    placeholder = withPlaceholder ? <TbPhotoOff size={18} /> : <div />,
  } = creatorInfoObject;

  // const styles: CSSProperties = isOverlay
  //   ? {
  //       ...style,
  //       position: 'relative',
  //       // // opacity: 0.4,
  //       // width: '100%',
  //       // height: '100%',
  //     }
  //   : { ...style, position: 'relative' };
  const styles: CSSProperties = { ...style, position: "relative" };

  const textOverlay = (
    <Text
      size="md"
      color="#f5f5f5"
      p={padding}
      weight={700}
      style={{
        position: "absolute",
        width: "100%",
        bottom: "0%",
        left: "0%",
        zIndex: 1,
        backgroundColor: "rgba(0,0,0,0.7)",
      }}
    >
      {overlayText}
    </Text>
  );

  const loadingOverlay = (
    <LoadingOverlay
      visible={loadingOverlayVisible}
      overlayBlur={4}
      overlayOpacity={isLoader ? 0.99 : 1}
      radius="md"
      loader={isLoader ? undefined : <div />}
    />
  );

  const createdImage = (
    <Image
      alt={isImageLoadFailed ? fallbackAlt : imageAlt}
      fit={fit}
      height={customHeight ? customHeight : "100%"}
      onClick={onClick}
      onError={onError}
      onLoad={() => {
        setIsImageLoading(false);
      }}
      placeholder={placeholder}
      radius={customRadius ? customRadius : 0}
      src={isImageLoadFailed ? fallbackSrc : imageSrc}
      style={styles}
      width={customWidth ? customWidth : "100%"}
      withPlaceholder={withPlaceholder}
    />
  );

  const displayImage = isCard ? (
    <Card
      shadow="sm"
      radius="md"
      withBorder
      w="100%"
      h="100%"
      style={{ position: "relative" }}
    >
      <Card.Section>
        {createdImage} {loadingOverlay}
      </Card.Section>

      {isOverlay && textOverlay ? textOverlay : null}
    </Card>
  ) : (
    <Group style={{ position: "relative" }}>
      {createdImage} {loadingOverlay}
      {isOverlay && textOverlay ? textOverlay : null}
    </Group>
  );

  return displayImage;
}

export { ImageWrapper };
export type { AccessibleImageCreatorInfo };
