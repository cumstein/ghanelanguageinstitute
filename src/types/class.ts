export type CreateClassInput = {
  name: string;
  schedule: string;
  startDate: string; 
  endDate: string; 
  teacherId: string;
};
export type ClassWithTeacher = {
  id: string;
  name: string;
  schedule: string;
  startDate: string;
  endDate: string;
  teacher: {
    id: string;
    firstName: string;
    lastName: string;
  };
};

export type ClassDetail = {
  id: string;
  name: string;
  schedule: string;
  startDate: string;
  endDate: string;
  teacher: {
    firstName: string;
    lastName: string;
  };
};