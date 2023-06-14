interface IDeal {
  id: number;
  Name: string;
  Description: string;
  Amount: number;
  Currency: string;
  Status: string;
}

type IDealCreate = Pick<IDeal, "Name" | "Description" | "Amount" | "Currency">;

type IDealUpdate = Pick<IDeal, "id" | "Status">;

interface IClaimedDeal {
  id: number;
  Deal_ID: number;
  User_ID: number;
  Amount: string;
  Currency: string;
  DateTime_UTC: string;
  deal: IDeal;
}

export type { IDeal, IDealCreate, IDealUpdate, IClaimedDeal };
