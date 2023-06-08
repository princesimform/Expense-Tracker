import { useState } from "react";

type TogglesState = Record<string, boolean>;

type ToggleFunction = (toggleId: string) => void;

const useToggle = (
  initialState: TogglesState = {}
): [TogglesState, ToggleFunction] => {
  const [toggles, setToggles] = useState<TogglesState>(initialState);

  const toggle: ToggleFunction = (toggleId) => {
    setToggles((prevToggles) => ({
      ...prevToggles,
      [toggleId]: !prevToggles[toggleId],
    }));
  };

  return [toggles, toggle];
};

export default useToggle;
