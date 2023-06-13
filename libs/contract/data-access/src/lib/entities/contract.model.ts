export enum DocumentStatus {
  UNREVIEWED = 'UNREVIEWED',
  IN_REVIEW = 'IN_REVIEW',
  REJECTED = 'REJECTED',
  ACCEPTED = 'ACCEPTED',
}

export interface Contract {
  id: string;
  title: string;
  status: DocumentStatus;
  url: string;
  userId: string;
  reviews: string[];
  createdOn: Date;
  updatedOn: Date;
}
