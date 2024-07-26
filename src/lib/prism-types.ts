interface TodoType {
  id?: string;
  title: string;
  description?: string;
  status?: string;
  dueDate?: string;
  employeeId?: number;
  todoBoardId?: number;
  createAt?: Date;
}

interface TodoBoardType {
  id?: string;
  name: string;
  projectId: number;
  creatorId: number;
  createdAt?: Date;
}

export type { TodoType, TodoBoardType };
