export interface File {
  id: string;
  title: string;
  filename: string;
  created_at: Date;
}

export interface FileState {
  files: File[];
}
