import { createContext, createSignal, useContext } from "solid-js";

export const UserContext = createContext();

export function UserProvider(props) {
  const [user, setUser] = createSignal(props.user || ""),
    store = [user, setUser];

  return (
    <UserContext.Provider value={store}>{props.children}</UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
