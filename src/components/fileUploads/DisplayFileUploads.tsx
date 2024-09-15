import { Flex } from "@mantine/core";

import type { CSSProperties } from "react";
import type { FileUploadDocument } from "../../types";
import DisplayResourceHeader from "../displayResourceHeader/DisplayResourceHeader";

type DisplayFileUploadsProps = {
  // componentQueryData: ComponentQueryData[];
  createResourcePath: string;
  fileUploadsData: Array<{ [key: string]: FileUploadDocument[] }>;

  parentComponentName: string;
  parentDeleteResourceDispatch: React.Dispatch<{
    type: "setDeleteResource";
    payload: {
      formId: string;
      fileUploadId?: string;
      kind: "form" | "fileUpload" | "";
      value: boolean;
    };
  }>;
  style?: CSSProperties;
  totalDocuments: number;
};

function DisplayFileUploads() {
  // ╭─────────────────────────────────────────────────────────────────╮
  //     RESOURCE HEADER
  // ╰─────────────────────────────────────────────────────────────────╯
  const imageSrc =
    "https://images.pexels.com/photos/1370294/pexels-photo-1370294.jpeg?auto=compress";
  const imageAlt = "Gray Steel File Cabinet";
  const resourceDescription = "Manage Your Files";
  const resourceTitle = "File Uploads";

  const displayResourceHeader = (
    <DisplayResourceHeader
      imageAlt={imageAlt}
      imageSrc={imageSrc}
      resourceDescription={resourceDescription}
      resourceTitle={resourceTitle}
    />
  );

  // ╭─────────────────────────────────────────────────────────────────╮
  //     DISPLAY RESOURCE
  // ╰─────────────────────────────────────────────────────────────────╯
  // const displayResource = (
  //   <DisplayResource
  //     componentQueryData={FILE_UPLOADS_QUERY_DATA}
  //     createResourcePath="/home/file-upload"
  //     requestBodyHeading="File Upload"
  //     resourceUrlPaths={FILE_UPLOADS_RESOURCE_ROUTE_PATHS}
  //   />
  // );

  const displayFileUploadsComponent = (
    <Flex direction="column" w="100%">
      {displayResourceHeader}
      {/* {displayResource} */}
    </Flex>
  );

  return displayFileUploadsComponent;
}

export default DisplayFileUploads;
