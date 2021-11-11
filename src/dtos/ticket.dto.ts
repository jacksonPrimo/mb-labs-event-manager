export interface TicketDto {
  id?: number;
  eventId?: number;
  title: string;
  value: number;
  description: string;
  quantity: number;
  createdAt?: Date;
  updatedAt?: Date;
};
