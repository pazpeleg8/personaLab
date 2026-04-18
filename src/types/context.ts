export interface ProjectContext {
  id: string;
  product: string;
  problem: string;
  solution: string;
  hypothesis: string;
  segment?: string;
  expectedResponse?: string;
  createdAt: string;
}
