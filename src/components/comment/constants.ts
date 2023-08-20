import { DEPARTMENT_DATA, JOB_POSITION_DATA } from '../../constants/data';
import { SelectInputData } from '../../types';
import { ComponentQueryData } from '../queryBuilder';

const COMMENT_QUERY_DATA: ComponentQueryData[] = [
  {
    label: 'Job Position',
    value: 'jobPosition',
    inputKind: 'selectInput',
    selectData: JOB_POSITION_DATA,
  },
  {
    label: 'Department',
    value: 'department',
    inputKind: 'selectInput',
    selectData: DEPARTMENT_DATA,
  },
  {
    label: 'Likes',
    value: 'likesCount',
    inputKind: 'numberInput',
  },
  {
    label: 'Dislikes',
    value: 'dislikesCount',
    inputKind: 'numberInput',
  },
  {
    label: 'Reports',
    value: 'reportsCount',
    inputKind: 'numberInput',
  },
  {
    label: 'Featured',
    value: 'isFeatured',
    inputKind: 'booleanInput',
  },
  {
    label: 'Deleted',
    value: 'isDeleted',
    inputKind: 'booleanInput',
  },
  {
    label: 'Created date',
    value: 'createdAt',
    inputKind: 'dateInput',
  },
  {
    label: 'Updated date',
    value: 'updatedAt',
    inputKind: 'dateInput',
  },
];

const COMMENT_LIMIT_PER_PAGE_SELECT_DATA = ['5', '10', '15', '20', '25'];

export { COMMENT_LIMIT_PER_PAGE_SELECT_DATA, COMMENT_QUERY_DATA };
