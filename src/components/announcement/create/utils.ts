import { FormReviewObject } from '../../formReviewPage/FormReviewPage';

type CreateAnnouncementFormReviewObjectInput = {
  initialAnnouncementFormReviewObject: FormReviewObject;
  article: string[];
  areValidArticleParagraphs: boolean[];
};

function createAnnouncementFormReviewObject({
  initialAnnouncementFormReviewObject,
  article,
  areValidArticleParagraphs,
}: CreateAnnouncementFormReviewObjectInput) {
  const formReviewObject = article.reduce(
    (
      formReviewObjectAcc: FormReviewObject,
      articleParagraph: string,
      paragraphIdx
    ) => {
      const inputName = `Paragraph ${paragraphIdx + 1}`;
      const inputValue = articleParagraph;
      const isInputValueValid = areValidArticleParagraphs[paragraphIdx];

      const newObject = {
        inputName,
        inputValue,
        isInputValueValid,
      };

      const pageTitle = 'Announcement Article';
      formReviewObjectAcc[pageTitle] = [
        ...(formReviewObjectAcc[pageTitle] || []),
        newObject,
      ];

      return formReviewObjectAcc;
    },
    structuredClone(initialAnnouncementFormReviewObject)
  );

  return formReviewObject;
}

export { createAnnouncementFormReviewObject };
