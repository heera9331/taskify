interface RoleType {
  id?: number;
  name: string;
  description?: string;
  employees?: EmployeeType[];
  createdAt?: Date;
}

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

interface MessageType {
  id?: string;
  content: any;
  mediaUrl: string;
  senderId: string;
  receiverId: string;
  createdAt?: Date;
}

interface EmployeeType {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password?: string; // Optional due to security reasons
  lastActive?: Date;
  organizationId: number; 
  roleId: number;      
  createdAt: Date;  
}

export type { TodoType, TodoBoardType, MessageType, EmployeeType };
