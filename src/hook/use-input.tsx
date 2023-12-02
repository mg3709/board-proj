import { ChangeEvent, useState } from "react";

const useInput = (init: (value: string) => boolean) => {
  const [value, setValue] = useState<string>("");
  const [blur, setBlur] = useState<boolean>(false);

  const valueCheck = init(value);
  const valueCheckValue = blur && !valueCheck;

  const onChangeValue = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValue(e.target.value);
  };

  const onBlurValue = () => {
    setBlur(true);
  };

  const reset = () => {
    setValue("");
    setBlur(false);
  };

  return { value, onChangeValue, valueCheckValue, onBlurValue, reset };
};

export default useInput;
