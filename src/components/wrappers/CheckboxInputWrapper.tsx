import { Checkbox } from '@mantine/core';

type AccessibleCheckboxInputCreatorInfo = {
  semanticName: string;
  accessibleDescription?:
    | {
        selected: string;
        deselected: string;
      }
    | undefined;
  ariarequired?: boolean | undefined;
  checkboxKind: 'single' | 'multiple';
  dataObjArray?:
    | Array<{
        value: string;
        label: string;
      }>
    | undefined;
  defaultValue?: [string] | undefined;
  description: {
    selected: string;
    deselected: string;
  };
  label?: string | undefined;
  checked?: boolean | undefined;
  disabled?: boolean | undefined;
  onChangeMultiple?: (value: string[]) => void | undefined;
  onChangeSingle?: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void | undefined;
  onClick?: () => void | undefined;
  ref?: React.RefObject<HTMLInputElement> | undefined;
  required?: boolean | undefined;
  value?: string[] | undefined;
};

type CheckboxInputWrapperProps = {
  creatorInfoObject: AccessibleCheckboxInputCreatorInfo;
};

function CheckboxInputWrapper({
  creatorInfoObject,
}: CheckboxInputWrapperProps) {
  const {
    semanticName,
    accessibleDescription = {
      selected: '',
      deselected: '',
    },
    ariarequired = false,
    checkboxKind,
    dataObjArray = null,
    defaultValue = [''],
    description,
    label = '',
    checked = false,
    disabled = false,
    onClick = () => {},
    onChangeSingle = () => {},
    onChangeMultiple = () => {},
    ref = null,
    required = false,
    value = [''],
  } = creatorInfoObject;

  switch (checkboxKind) {
    case 'single': {
      return (
        <Checkbox
          size="sm"
          label={label}
          aria-label={
            checked
              ? accessibleDescription.selected
              : accessibleDescription.deselected
          }
          aria-required={ariarequired}
          checked={checked}
          description={checked ? description.selected : description.deselected}
          disabled={disabled}
          onClick={onClick}
          onChange={onChangeSingle}
          required={required}
          ref={ref}
        />
      );
    }
    case 'multiple': {
      return (
        // <Checkbox.Group
        //   size="sm"
        //   label={label}
        //   aria-required={ariarequired}
        //   value={value}
        //   onChange={onChangeMultiple}
        //   required={required}
        //   ref={ref}
        //   withAsterisk={withAsterisk}
        // >
        //   {dataObjArray?.map(({ value, label }) => {
        //     return <Checkbox key={value} value={value} label={label} />;
        //   })}
        // </Checkbox.Group>
        <Checkbox.Group
          label={label}
          defaultValue={defaultValue}
          description={
            value.length > 0 ? description.selected : description.deselected
          }
          value={value}
          withAsterisk={required}
          onChange={onChangeMultiple}
        >
          {/* <Flex
            pt="lg"
            direction="column"
            align="flex-start"
            justify="center"
            rowGap="md"
            w="100%"
          > */}
          {dataObjArray?.map(({ value: value_, label }, index) => (
            <Checkbox
              key={label}
              value={value_}
              label={label}
              // color="dark"
              size="sm"
              checked={value.includes(value_)}
            />
          ))}
          {/* </Flex> */}
        </Checkbox.Group>
      );
    }
    default:
      return null;
  }
}

export { CheckboxInputWrapper };

export type { AccessibleCheckboxInputCreatorInfo };
