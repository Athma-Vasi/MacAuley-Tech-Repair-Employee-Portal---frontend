const GET_ALL_NOTES = '/notes';

const NOTE_HEADINGS = [
  'title',
  'text',
  'created',
  'updated',
  'completed',
  'edit',
];

const textWrap: React.CSSProperties = {
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
};

export { GET_ALL_NOTES, NOTE_HEADINGS, textWrap };
