export interface TicketDto {
  id?: number;
  eventId?: number;
  title: string;
  description: string;
  quantity: number;
  createdAt?: Date;
  updatedAt?: Date;
};
