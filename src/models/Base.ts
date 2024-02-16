import type { RecordModel } from "pocketbase"

export class CRecordModel implements RecordModel {
  [key: string]: any;
  id: string;
  created: string;
  updated: string;
  collectionId: string;
  collectionName: string;

  constructor(from: RecordModel) {
    this.id = from.id;
    this.created = from.created;
    this.updated = from.updated;
    this.collectionId = from.collectionId;
    this.collectionName = from.collectionName;
  }
}
