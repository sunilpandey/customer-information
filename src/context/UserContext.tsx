import { createContext, useState } from "react";
import type { ReactNode, Dispatch, SetStateAction } from "react";

export interface User {
    userName: string;
    email: string;
    designation: string;
    profilePic: string;
}

interface UserContextType {
    user: User | null;
    setUser: Dispatch<SetStateAction<User | null>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserContextProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>({
        userName: 'Sunil Pandey',
        email: 'sunil@example.com',
        designation: 'Software Engineer',
        profilePic: 'https://randomuser.me/api/portraits/men/32.jpg'
    });

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}

export { UserContext }