import { Group, Stack, Title, Tooltip } from '@mantine/core';
import { Dispatch, useState } from 'react';
import { TbUpload } from 'react-icons/tb';

import {
  returnAccessibleButtonElements,
  returnAccessibleRadioGroupInputsElements,
} from '../../../jsxCreators';
import { RequestStatus } from '../../../types';

type UpdateRequestStatusProps = {
  parentComponentDispatch: Dispatch<{
    type: 'setRequestStatus';
    payload: { id: string; status: RequestStatus };
  }>;
  documentId: string;
  currentRequestStatus: RequestStatus;
  closeUpdateRequestStatusModal: () => void;
};

function UpdateRequestStatus({
  parentComponentDispatch,
  documentId,
  currentRequestStatus,
  closeUpdateRequestStatusModal,
}: UpdateRequestStatusProps): JSX.Element {
  const [requestStatus, setRequestStatus] = useState<RequestStatus>(
    currentRequestStatus ?? 'pending'
  );

  const createdUpdateRequestStatusRadioGroup =
    returnAccessibleRadioGroupInputsElements([
      {
        columns: 1,
        dataObjectArray: [
          {
            label: 'Approved',
            value: 'approved',
          },
          {
            label: 'Pending',
            value: 'pending',
          },
          {
            label: 'Rejected',
            value: 'rejected',
          },
        ],
        description: `Document: ${documentId}`,
        onChange: (value) => setRequestStatus(value as RequestStatus),
        name: 'requestStatus',
        label: '',
        semanticName: 'Update request status',
        value: requestStatus,
        widthRadioGroup: '100%',
      },
    ]);

  const [createdSubmitRequestStatusButton] = returnAccessibleButtonElements([
    {
      buttonLabel: 'Submit',
      leftIcon: <TbUpload />,
      buttonType: 'submit',
      semanticDescription: 'Submit request status changes',
      semanticName: 'Submit',
      buttonOnClick: () => {
        parentComponentDispatch({
          type: 'setRequestStatus',
          payload: { id: documentId, status: requestStatus },
        });
        closeUpdateRequestStatusModal();
      },
    },
  ]);

  const displaySubmitRequestStatusButton = (
    <Tooltip label={`Change to ${requestStatus} for ${documentId}`}>
      <Group w="100%" position="right">
        {createdSubmitRequestStatusButton}
      </Group>
    </Tooltip>
  );

  const displayUpdateRequestStatus = (
    <Stack w="100%">
      {createdUpdateRequestStatusRadioGroup}
      {displaySubmitRequestStatusButton}
    </Stack>
  );

  return displayUpdateRequestStatus;
}

export default UpdateRequestStatus;
