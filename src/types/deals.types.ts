interface IDeal {
    id: number;
    Name: string;
    Description: string;
    Amount: number;
    Currency: string;
    Status: string;
}

type IDealCreate = Pick<IDeal, 'Name' | 'Description' | 'Amount' | 'Currency'>

type IDealUpdate = Partial<IDealCreate> & Pick<IDeal, 'id'>

export type { IDeal, IDealCreate, IDealUpdate}