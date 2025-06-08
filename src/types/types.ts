export type Student = {
  id: string;
  firstName: string;
  lastName: string;
  fatherName: string;
};

export type Teacher = {
  id: string;
  firstName: string;
  lastName: string;
};

export type ClassWithRelations = {
  id: string;
  name: string;
  teacher: Teacher;
  students: Student[];
};