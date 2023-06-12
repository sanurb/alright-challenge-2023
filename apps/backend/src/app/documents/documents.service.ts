import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { DocumentDocument, DocumentModel } from './model/documents.scheme';

@Injectable()
export class DocumentsService {
  constructor(
    @InjectModel(DocumentModel.name)
    private readonly documentModel: Model<DocumentDocument>
  ) {}

  async create(dto: CreateDocumentDto): Promise<DocumentDocument> {
    const document = new this.documentModel(dto);
    return document.save();
  }

  async findAll(): Promise<DocumentDocument[]> {
    return this.documentModel.find().exec();
  }

  async findOne(id: string): Promise<DocumentDocument> {
    return this.documentModel
      .findById(id)
      .orFail(new NotFoundException(`Document with id ${id} not found`));
  }

  async update(id: string, dto: UpdateDocumentDto): Promise<DocumentDocument> {
    return this.documentModel
      .findByIdAndUpdate(id, dto, { new: true })
      .orFail(new NotFoundException(`Document with id ${id} not found`));
  }

  async remove(id: string): Promise<DocumentDocument> {
    return this.documentModel
      .findByIdAndRemove(id)
      .orFail(new NotFoundException(`Document with id ${id} not found`));
  }
}
