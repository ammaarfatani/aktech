export interface Note {
  id: string;
  message: string;
  createdBy: string;       // uid
  createdByName: string;   // denormalized
  createdAt: Date;
}

export interface AddNotePayload {
  message: string;
  createdBy: string;
  createdByName: string;
}
