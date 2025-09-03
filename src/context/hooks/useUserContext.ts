import { useContext } from "react";
import { UserContext } from "../UserContext";
export function useUserContext() {
    const context = useContext(UserContext);
    if (!context || !context.user || !context.setUser) {
        throw new Error("useUserContext must be used within a UserProvider");
    }
    return { user: context.user, setUser: context.setUser };
}