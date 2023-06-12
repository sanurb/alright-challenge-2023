import { Exclude, Expose, Type } from 'class-transformer';
import { DocumentModel } from '../../documents/model/documents.scheme';
import { ReviewModel } from '../../reviews/model/reviews.scheme';

@Exclude()
export class UserOutputDto {
  @Expose()
  id: string;

  @Expose()
  email: string;

  @Expose()
  roles: string[];

  @Expose()
  name: string;

  @Expose()
  avatar: string;

  @Expose()
  description: string;

  @Expose()
  @Type(() => DocumentModel)
  documents: DocumentModel[];

  @Expose()
  @Type(() => ReviewModel)
  reviews: ReviewModel[];

  constructor(partial: Partial<UserOutputDto>) {
    Object.assign(this, partial);
  }
}
