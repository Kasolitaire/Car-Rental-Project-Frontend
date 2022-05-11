export interface OrderDetail {
  orderId?: number;
  pickUpDate: string;
  dropOffDate: string;
  dateOfficiallyReturned?: string | null;
  userId: number;
  serialNumber: string;
}