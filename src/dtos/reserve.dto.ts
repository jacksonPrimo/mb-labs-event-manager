export interface ReserveDto {
  id?: string;
  userId: number;
  ticketId: number;
  quantity: number;
  status: string;
  createdAt?: Date;
  updatedAt?: Date;
};
