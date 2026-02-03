import InputAntd, { InputProps } from 'antd/es/input';
import {
  FieldValues,
  UseControllerProps,
  useController,
} from 'react-hook-form';

type Props<T extends FieldValues> = {
  controller: UseControllerProps<T>;
  asNumber?: boolean;
} & InputProps;

export function Input<T extends FieldValues>({
  controller,
  asNumber = false,
  ...props
}: Props<T>) {
  const { field } = useController(controller);

  return (
    <InputAntd
      {...field}
      {...props}
      onChange={(e) => {
        field.onChange(asNumber ? +e.target.value : e.target.value);
      }}
    />
  );
}

export function TextArea<T extends FieldValues>(props: UseControllerProps<T>) {
  const { field } = useController(props);

  return <InputAntd.TextArea {...field} />;
}
