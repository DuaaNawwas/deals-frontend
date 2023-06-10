interface IUser {
    id: number;
    Name: string;
    Password: string;
    Email: string;
    Role: string;
    Phone: string;
}

type IUserLogin = Pick<IUser, 'Name' | 'Password'>

export type { IUser, IUserLogin}