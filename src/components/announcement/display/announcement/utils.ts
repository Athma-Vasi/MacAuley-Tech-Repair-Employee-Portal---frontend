import type { AnnouncementDocument, RatingResponse } from "../../create/types";

function updateRatingResponse(
    announcementDocument: AnnouncementDocument,
    rating: number,
    userId: string,
): AnnouncementDocument {
    const prevRatingEmotion = announcementDocument.ratingResponse.ratingEmotion;

    if (rating === 1) {
        prevRatingEmotion.devastated += 1;
    } else if (rating === 2) {
        prevRatingEmotion.annoyed += 1;
    } else if (rating === 3) {
        prevRatingEmotion.neutral += 1;
    } else if (rating === 4) {
        prevRatingEmotion.happy += 1;
    } else if (rating === 5) {
        prevRatingEmotion.estatic += 1;
    }

    const ratingResponse: RatingResponse = {
        ratingEmotion: prevRatingEmotion,
        ratingCount: announcementDocument.ratingResponse.ratingCount + 1,
    };

    const updatedRatedUserIds = Array.from(
        new Set([...announcementDocument.ratedUserIds, userId]),
    );

    return {
        ...announcementDocument,
        ratingResponse,
        ratedUserIds: updatedRatedUserIds,
    };
}

export { updateRatingResponse };
