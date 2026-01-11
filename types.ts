
export enum WritingFormat {
  ESSAY = 'ESSAY',
  PARAGRAPH = 'PARAGRAPH',
  REPORT = 'REPORT',
  NOTICE = 'NOTICE'
}

export enum GradeLevel {
  PRIMARY = 'Primary (Class 1-5)',
  MIDDLE = 'Middle (Class 6-8)',
  SECONDARY = 'Secondary (Class 9-10)',
  SENIOR_SECONDARY = 'Senior Secondary (Class 11-12)'
}

export interface WritingRequest {
  topic: string;
  format: WritingFormat;
  grade: GradeLevel;
}

export interface WritingResponse {
  content: string;
  teacherTips: string[];
}
