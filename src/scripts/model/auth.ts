interface UserCredentials {
    email: string;
    password: string;
    name?: string;
}

interface LoggedUser {
    name: string;
    token: string;
}

interface SignInResponse {
    message: string;
    token: string;
    refreshToken: string;
    userId: string;
    name: string;
}

interface SignUpResponse {
    id: string;
    email: string;
    name: string;
}

export { UserCredentials, LoggedUser, SignInResponse, SignUpResponse };
