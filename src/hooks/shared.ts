import React, { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
export const useInputValue = (initailValue: string) => {
  const [value, setValue] = useState(initailValue);
  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value.trim());
  }, []);

  return { value, onChange, setValue };
};

export const useCheckBox = (initailValue: boolean) => {
  const [checked, setValue] = useState(initailValue);
  const onChange = () => {
    setValue(!checked);
  };
  return { checked, onChange };
};

export const useBack = () => {
  const history = useHistory();
  const back = () => {
    history.goBack();
  };
  return { back };
};
