export interface User {
    id: string;
    name: string;
    role: 'staff' | 'admin';
    token: string;
}

export interface AuthState {
    user: User | null;
    login: (user: User) => void;
    logout: () => void;
}