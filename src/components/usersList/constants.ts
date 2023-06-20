const GET_ALL_USERS = '/users';

const USERS_HEADINGS = [
  'username',
  'email',
  'roles',
  'active',
  'created',
  'updated',
  'edit',
];

const textWrap: React.CSSProperties = {
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
};

export { GET_ALL_USERS, USERS_HEADINGS, textWrap };
