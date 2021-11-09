export interface EventDto {
  id?: number;
  userId?: number;
  title: string;
  description: string;
  beginEvent: Date;
  endEvent: Date;
  address: Object;
  createdAt?: Date;
  updatedAt?: Date;
};
