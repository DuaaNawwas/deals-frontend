interface IDeal {
    id: number;
    Name: string;
    Description: string;
    Amount: number;
    Currency: string;
    Status: string;
}

type IDealCreate = Pick<IDeal, 'Name' | 'Description' | 'Amount' | 'Currency'>

type IDealUpdate = Pick<IDeal, 'id' | 'Status'>

export type { IDeal, IDealCreate, IDealUpdate}