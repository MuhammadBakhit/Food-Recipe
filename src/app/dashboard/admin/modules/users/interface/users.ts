export interface IUserData {
    id: number;
    userName: string;
    email: string;
    phoneNumber: string;
    country: string;
    imagePath: string | null;
    creationDate: string;
    modificationDate: string;
    group: {
      id: number;
      name: string;
      creationDate: string;
      modificationDate: string;
    };
}