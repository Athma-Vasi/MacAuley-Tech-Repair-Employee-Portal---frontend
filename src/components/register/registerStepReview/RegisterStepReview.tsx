import { RegisterStepReviewProps } from './types';

function RegisterStepReview(registerReviewObj: RegisterStepReviewProps) {
  const displayRegisterState = Object.entries(registerReviewObj).map(
    ([key, value]) => (
      <div key={key}>
        <span>{key}</span>
        <span>{JSON.stringify(value)}</span>
      </div>
    )
  );
  return <>{displayRegisterState}</>;
}

export { RegisterStepReview };
