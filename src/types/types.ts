export type Student = {
  id: string;
  firstName: string;
  lastName: string;
  fatherName: string;
  class: SimpleClass | null;
};

export type Teacher = {
  id: string;
  firstName: string;
  lastName: string;
};

export type SimpleClass = {
  id: string;
  name: string;
  teacher?: Teacher;
};
export type ClassWithRelations = {
  id: string;
  name: string;
  teacher: Teacher;
  students: Student[];
};
export type StudentLite = {
  id: string;
  firstName: string;
  lastName: string;
  fatherName: string;
};

export type ClassWithLiteStudents = {
  id: string;
  name: string;
  teacher: Teacher;
  students: StudentLite[];
};