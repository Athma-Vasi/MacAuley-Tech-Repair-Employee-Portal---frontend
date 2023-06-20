const screenReaderPasswordSpecialCharacters = (
  <span>
    <span> Allowed special characters: </span>
    <span aria-label="exclamation mark"> ! </span>
    <span aria-label="at symbol"> @ </span>
    <span aria-label="number symbol"> # </span>
    <span aria-label="dollar symbol"> $ </span>
    <span aria-label="percent symbol"> % </span>
    <span aria-label="caret symbol"> ^ </span>
    <span aria-label="ampersand symbol"> & </span>
    <span aria-label="asterisk symbol"> * </span>
  </span>
);

const screenReaderTitleSpecialCharacters = (
  <span>
    <span>Allowed special characters: </span>
    <span aria-label="exclamation mark"> ! </span>
    <span aria-label="quotation mark"> " </span>
    <span aria-label="number sign"> # </span>
    <span aria-label="dollar sign"> $ </span>
    <span aria-label="percent sign"> % </span>
    <span aria-label="ampersand"> & </span>
    <span aria-label="apostrophe"> ' </span>
    <span aria-label="left parenthesis"> ( </span>
    <span aria-label="right parenthesis"> ) </span>
    <span aria-label="asterisk"> * </span>
    <span aria-label="plus sign"> + </span>
    <span aria-label="comma"> , </span>
    <span aria-label="hyphen"> - </span>
    <span aria-label="period"> . </span>
    <span aria-label="forward slash"> / </span>
    <span aria-label="colon"> : </span>
    <span aria-label="semicolon"> ; </span>
    <span aria-label="less than sign"> &lt; </span>
    <span aria-label="equals sign"> = </span>
    <span aria-label="greater than sign"> &gt; </span>
    <span aria-label="question mark"> ? </span>
    <span aria-label="at sign"> @ </span>
    <span aria-label="left square bracket"> [ </span>
    <span aria-label="right square bracket"> ] </span>
    <span aria-label="caret"> ^ </span>
    <span aria-label="underscore"> _ </span>
    <span aria-label="left curly brace"> &#123; </span>
    <span aria-label="vertical bar"> | </span>
    <span aria-label="right curly brace"> &#125; </span>
    <span aria-label="tilde"> ~ </span>
  </span>
);

const screenReaderTextSpecialCharacters = (
  <span>
    <span>Allowed special characters: </span>
    <span aria-label="period"> . </span>
    <span aria-label="comma"> , </span>
    <span aria-label="exclamation mark"> ! </span>
    <span aria-label="question mark"> ? </span>
    <span aria-label="colon"> : </span>
    <span aria-label="semicolon"> ; </span>
    <span aria-label="quotation mark"> " </span>
    <span aria-label="apostrophe"> ' </span>
    <span aria-label="left parenthesis"> ( </span>
    <span aria-label="right parenthesis"> ) </span>
    <span aria-label="hyphen"> - </span>
  </span>
);

export {
  screenReaderPasswordSpecialCharacters,
  screenReaderTitleSpecialCharacters,
  screenReaderTextSpecialCharacters,
};
