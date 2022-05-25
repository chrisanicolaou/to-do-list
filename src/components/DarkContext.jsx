import { createContext, createSignal, useContext } from "solid-js";

export const DarkContext = createContext();

export function DarkProvider(props) {
  const [dark, setDark] = createSignal(props.dark || false),
    store = [dark, setDark];

  return (
    <DarkContext.Provider value={store}>{props.children}</DarkContext.Provider>
  );
}

export function useDark() {
  return useContext(DarkContext);
}
