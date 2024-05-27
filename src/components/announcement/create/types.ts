import { SetPageInErrorPayload } from "../../../types";
import { AnnouncementAction } from "./actions";

type RatingEmotion = {
  estatic: number;
  happy: number;
  neutral: number;
  annoyed: number;
  devastated: number;
};

type RatingResponse = {
  ratingEmotion: RatingEmotion;
  ratingCount: number;
};

type AnnouncementSchema = {
  article: string[];
  author: string;
  bannerImageAlt: string;
  bannerImageSrc: string;
  bannerImageSrcCompressed: string;
  ratedUserIds: string[];
  ratingResponse: RatingResponse;
  timeToRead: number;
  title: string;
  userId: string;
  username: string;
};

type AnnouncementDocument = AnnouncementSchema & {
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

type AnnouncementState = {
  article: string[];
  author: string;
  bannerImageAlt: string;
  bannerImageSrc: string;
  isSubmitting: boolean;
  isSuccessful: boolean;
  pagesInError: Set<number>;
  title: string;
  triggerFormSubmit: boolean;
};

type AnnouncementDispatch =
  | {
      action: AnnouncementAction["addParagraph"];
      payload: null;
    }
  | {
      action: AnnouncementAction["removeParagraph"];
      payload: number;
    }
  | {
      action: AnnouncementAction["insertParagraph"];
      payload: number;
    }
  | {
      action: AnnouncementAction["setParagraph"];
      payload: ParagraphPayload;
    }
  | {
      action: AnnouncementAction["slideParagraphUp"];
      payload: number;
    }
  | {
      action: AnnouncementAction["slideParagraphDown"];
      payload: number;
    }
  | {
      action: AnnouncementAction["setAuthor"];
      payload: string;
    }
  | {
      action: AnnouncementAction["setBannerImageAlt"];
      payload: string;
    }
  | {
      action: AnnouncementAction["setBannerImageSrc"];
      payload: string;
    }
  | {
      action: AnnouncementAction["setIsSubmitting"];
      payload: boolean;
    }
  | {
      action: AnnouncementAction["setIsSuccessful"];
      payload: boolean;
    }
  | {
      action: AnnouncementAction["setPageInError"];
      payload: SetPageInErrorPayload;
    }
  | {
      action: AnnouncementAction["setTitle"];
      payload: string;
    }
  | {
      action: AnnouncementAction["setTriggerFormSubmit"];
      payload: boolean;
    };

type ParagraphPayload = {
  dynamicIndexes: number[];
  value: string;
};

type AnnouncementResponse = {
  message: string;
};

export type {
  AnnouncementDispatch,
  AnnouncementDocument,
  AnnouncementResponse,
  AnnouncementSchema,
  AnnouncementState,
  ParagraphPayload,
  RatingEmotion,
  RatingResponse,
};
