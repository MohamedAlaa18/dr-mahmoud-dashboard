
export interface ICourseForm {
  id?: number
  title: string,
  description: string,
  code: string,
  price: number,
}

export interface ILecture {
  id: number;
  title: string;
  description: string;
  code: string;
  courseId: number;
  hasPreExam: boolean;
  isActive: boolean;
  attachments?: IAttachment[];
  // exams?: IExam[];
}

export interface IAttachment {
  id: number;
  fileName: string;
  extension: string;
  mimeType: string;
  size: number;
  lectureId: number;
  physicalName: string;
}

export interface IQuestion {
  id: number;
  isActive: boolean;
  header: string;
  type: number;
  grade: number;
  photoGuid: string;
  answers?: IAnswer[];
}

export interface IAnswer {
  id: number;
  questionId: number;
  content: string;
}

export interface ISubject {
  id?: number;
  subjectName: string;
}
