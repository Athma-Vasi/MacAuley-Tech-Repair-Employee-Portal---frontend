function createStateForStepper(
  state: Record<string, unknown>,
): Record<string, unknown> {
  return Object.entries(state).reduce((acc, [key, value]) => {
    if (key === "article") {
      if (Array.isArray(value)) {
        value.forEach((paragraph, index) => {
          acc[`paragraph ${index + 1}`] = paragraph;
        });
      }
    }

    acc[key] = value;

    return acc;
  }, Object.create(null));
}

// type AnnouncementFormReviewObjectInput = {
//   initialAnnouncementFormReviewObject: FormReviewObjectArray;
//   article: string[];
//   areValidArticleParagraphs: boolean[];
// };
/**
 * Pure function. Creates an object (that is added on to an initial first page static input object) that is used to render the form review page. Required as the input creation is dynamic.
 */
// function announcementFormReviewObject({
//   initialAnnouncementFormReviewObject,
//   article,
//   areValidArticleParagraphs,
// }: AnnouncementFormReviewObjectInput) {
//   const formReviewObject = article.reduce(
//     (
//       formReviewObjectAcc: FormReviewObjectArray,
//       articleParagraph: string,
//       paragraphIdx,
//     ) => {
//       const inputName = `Paragraph ${paragraphIdx + 1}`;
//       const inputValue = articleParagraph;
//       const isInputValueValid = areValidArticleParagraphs[paragraphIdx];

//       const newObject = {
//         inputName,
//         inputValue,
//         isInputValueValid,
//       };

//       const pageTitle = "Announcement Article";
//       formReviewObjectAcc[pageTitle] = [
//         ...(formReviewObjectAcc[pageTitle] || []),
//         newObject,
//       ];

//       return formReviewObjectAcc;
//     },
//     structuredClone(initialAnnouncementFormReviewObject),
//   );

//   return formReviewObject;
// }

export { createStateForStepper };
