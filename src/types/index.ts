export type UserRole = 'student' | 'instructor';
export type Locale = 'ku' | 'en' | 'ar';
export type ExperimentStatus = 'completed' | 'in-progress' | 'not-started';

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  createdAt: string;
}

export interface Equipment {
  id: string;
  name: Record<Locale, string>;
  function: Record<Locale, string>;
  example: Record<Locale, string>;
  icon: string;
  category: 'pipette' | 'plate' | 'tube' | 'reagent' | 'instrument' | 'consumable';
}

export interface StepOption {
  id: string;
  label: Record<Locale, string>;
  correct: boolean;
  feedback: Record<Locale, string>;
  icon?: string;
}

export interface ExperimentStep {
  id: number;
  title: Record<Locale, string>;
  instruction: Record<Locale, string>;
  type: 'select-equipment' | 'set-volume' | 'select-tip' | 'transfer-sample' | 'add-reagent' | 'incubation' | 'washing' | 'add-substrate' | 'stop-reaction' | 'read-plate';
  options: StepOption[];
  hint?: Record<Locale, string>;
}

export interface OrderingStep {
  id: number;
  text: Record<Locale, string>;
  correctOrder: number;
}

export interface ExperimentData {
  id: string;
  name: Record<Locale, string>;
  description: Record<Locale, string>;
  introduction: Record<Locale, string>;
  principle: Record<Locale, string>;
  sampleType: Record<Locale, string>;
  purpose: Record<Locale, string>;
  equipment: Equipment[];
  steps: ExperimentStep[];
  orderingSteps: OrderingStep[];
}

export interface Mistake {
  stepId: number;
  selectedOptionId: string;
  correctOptionId: string;
  timestamp: string;
}

export interface ExperimentResult {
  id: string;
  userId: string;
  userName: string;
  experimentId: string;
  experimentName: string;
  score: number;
  correctSteps: number;
  incorrectSteps: number;
  totalSteps: number;
  attempts: number;
  timeSpent: number;
  mistakes: Mistake[];
  status: ExperimentStatus;
  completedAt: string;
}

export interface Feedback {
  id: string;
  instructorId: string;
  instructorName: string;
  studentId: string;
  resultId?: string;
  message: string;
  createdAt: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => { success: boolean; error?: string; role?: string };
  logout: () => void;
  register: (name: string, email: string, password: string, role: UserRole) => { success: boolean; error?: string; role?: string };
  updateProfile: (data: Partial<User>) => void;
  isLoading: boolean;
}

export interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
  dir: 'rtl' | 'ltr';
}

