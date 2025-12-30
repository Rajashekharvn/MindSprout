export interface User {
    id: string;
    email: string;
    name: string;
}

export interface AuthResponse {
    token: string;
    message: string;
}

export interface SignupResponse {
    message: string;
    userId: number;
}
