interface UserCredentials {
    email: string;
    password: string;
    name?: string;
}

interface LoggedUser {
    name: string;
    token: string;
}

interface AuthResponse {
    message: string;
    token: string;
    refreshToken: string;
    userId: string;
    name: string;
}

export { UserCredentials, LoggedUser, AuthResponse };
