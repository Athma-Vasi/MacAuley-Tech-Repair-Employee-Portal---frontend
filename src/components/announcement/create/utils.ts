import { FormReviewObject } from '../../formReviewPage/FormReviewPage';

type CreateAnnouncementFormReviewObjectInput = {
  initialAnnouncementFormReviewObject: FormReviewObject;
  article: string[];
  areValidArticleParagraphs: boolean[];
};
/**
 * Pure function. Creates an object (that is added on to an initial first page static input object) that is used to render the form review page. Required as the input creation is dynamic.
 */
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
