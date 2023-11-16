import { Group, Stack, Tooltip } from '@mantine/core';
import { Dispatch, useState } from 'react';
import { TbUpload } from 'react-icons/tb';

import {
  COLORS_SWATCHES,
  FIELDNAMES_WITH_DATE_VALUES,
} from '../../../constants/data';
import { useGlobalState } from '../../../hooks';
import {
  returnAccessibleButtonElements,
  returnAccessibleRadioGroupInputsElements,
  returnScrollableDocumentInfo,
} from '../../../jsxCreators';
import { RequestStatus } from '../../../types';
import { returnThemeColors } from '../../../utils';

type UpdateRequestStatusProps = {
  currentRequestStatus: RequestStatus;
  closeUpdateRequestStatusModal: () => void;
  document: Record<string, any>;
  groupBySelection: string;
  parentComponentDispatch: Dispatch<{
    type: 'setRequestStatus';
    payload: { id: string; status: RequestStatus };
  }>;
  queryValuesArray: string[];
};

function UpdateRequestStatus({
  closeUpdateRequestStatusModal,
  currentRequestStatus,
  document,
  groupBySelection,
  parentComponentDispatch,
  queryValuesArray,
}: UpdateRequestStatusProps): JSX.Element {
  const {
    globalState: { rowGap, themeObject },
  } = useGlobalState();
  const [requestStatus, setRequestStatus] = useState<RequestStatus>(
    currentRequestStatus ?? 'pending'
  );

  const {
    appThemeColors: { borderColor },
    scrollBarStyle,
    tablesThemeColors: { textHighlightColor },
  } = returnThemeColors({
    themeObject,
    colorsSwatches: COLORS_SWATCHES,
  });

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
        description: `Change request status for ${document._id} from ${currentRequestStatus}`,
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
          payload: { id: document._id, status: requestStatus },
        });
        closeUpdateRequestStatusModal();
      },
    },
  ]);

  const displayDropdownAccordion = returnScrollableDocumentInfo({
    borderColor,
    document: document ?? {},
    excludeKeys: [
      'fileUploads',
      'edit',
      'delete',
      'viewProfile',
      groupBySelection,
    ],
    fieldNamesWithDateValues: FIELDNAMES_WITH_DATE_VALUES,
    queryValuesArray,
    rowGap,
    scrollBarStyle,
    textHighlightColor,
  });

  const displaySubmitRequestStatusButton = (
    <Tooltip label={`Change to ${requestStatus} for ${document._id}`}>
      <Group w="100%" position="right">
        {createdSubmitRequestStatusButton}
      </Group>
    </Tooltip>
  );

  const displayUpdateRequestStatus = (
    <Stack w="100%">
      {displayDropdownAccordion}
      {createdUpdateRequestStatusRadioGroup}
      {displaySubmitRequestStatusButton}
    </Stack>
  );

  return displayUpdateRequestStatus;
}

export default UpdateRequestStatus;
