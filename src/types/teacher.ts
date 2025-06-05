export type TeacherWithClasses = {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  classes: {
    id: string;
    name: string;
    schedule: string;
    startDate: string;
    endDate: string;
  }[];
};