export interface Ticket {
  id?: number; // Optional
  title: string;
  description: string;
  status?: string;
  priority?: string;
  category?: string;
  suggestedReply?: string | null;
  createdAt?: string;
  updatedAt?: string;
}