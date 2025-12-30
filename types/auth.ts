export interface User {
    id: string;
    email: string;
    name: string;
}

export interface AuthResponse {
    token: string;
    userId: string;
    message: string;
}

export interface SignupResponse {
    message: string;
    userId: string;
}
