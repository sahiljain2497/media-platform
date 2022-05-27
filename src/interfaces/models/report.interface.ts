export interface ReportI {
  _id: string;
  post: string;
  user: string;
  reason: string;
  proof: string[];
  createdAt: Date;
  updatedAt: Date;
}
