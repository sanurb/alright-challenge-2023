import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DocumentsController } from './documents.controller';
import { DocumentsService } from './documents.service';
import { DocumentModel, DocumentSchema } from './model/documents.scheme';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: DocumentModel.name,
        schema: DocumentSchema,
      },
    ]),
  ],
  controllers: [DocumentsController],
  providers: [DocumentsService],
})
export class DocumentsModule {}
