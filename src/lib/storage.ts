import type { User, ExperimentResult, Feedback, UserRole } from '@/types';

const KEYS = {
  USERS: 'kvl_users',
  CURRENT_USER: 'kvl_current_user',
  RESULTS: 'kvl_results',
  FEEDBACK: 'kvl_feedback',
} as const;

const DEMO_USERS: User[] = [
  {
    id: 'student-1',
    name: 'هەژار ئەحمەد',
    email: 'student@demo.com',
    password: 'demo123',
    role: 'student',
    createdAt: '2024-01-15T10:00:00Z',
  },
  {
    id: 'student-2',
    name: 'شیلان محمد',
    email: 'shilan@demo.com',
    password: 'demo123',
    role: 'student',
    createdAt: '2024-01-16T10:00:00Z',
  },
  {
    id: 'instructor-1',
    name: 'د. کارزان عەلی',
    email: 'instructor@demo.com',
    password: 'demo123',
    role: 'instructor',
    createdAt: '2024-01-01T10:00:00Z',
  },
];

const DEMO_RESULTS: ExperimentResult[] = [
  {
    id: 'result-demo-1',
    userId: 'student-2',
    userName: 'شیلان محمد',
    experimentId: 'elisa-1',
    experimentName: 'ELISA',
    score: 75,
    correctSteps: 15,
    incorrectSteps: 5,
    totalSteps: 20,
    attempts: 2,
    timeSpent: 1080,
    mistakes: [
      { stepId: 3, selectedOptionId: 'opt-wrong', correctOptionId: 'opt-correct', timestamp: '2024-02-01T11:05:00Z' },
    ],
    status: 'completed',
    completedAt: '2024-02-01T11:20:00Z',
  },
];

function getItem<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function setItem<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(key, JSON.stringify(value));
}

// ---- Users ----

export function initStorage(): void {
  const existing = getItem<User[]>(KEYS.USERS, []);
  if (existing.length === 0) {
    setItem(KEYS.USERS, DEMO_USERS);
    setItem(KEYS.RESULTS, DEMO_RESULTS);
  }
}

export function getUsers(): User[] {
  return getItem<User[]>(KEYS.USERS, DEMO_USERS);
}

export function getUserById(id: string): User | undefined {
  return getUsers().find((u) => u.id === id);
}

export function getUserByEmail(email: string): User | undefined {
  return getUsers().find((u) => u.email.toLowerCase() === email.toLowerCase());
}

export function createUser(name: string, email: string, password: string, role: UserRole): User {
  const users = getUsers();
  const newUser: User = {
    id: `user-${Date.now()}`,
    name,
    email,
    password,
    role,
    createdAt: new Date().toISOString(),
  };
  users.push(newUser);
  setItem(KEYS.USERS, users);
  return newUser;
}

export function updateUser(id: string, data: Partial<User>): User | undefined {
  const users = getUsers();
  const idx = users.findIndex(u => u.id === id);
  if (idx === -1) return undefined;
  
  users[idx] = { ...users[idx], ...data };
  setItem(KEYS.USERS, users);
  
  // If the updated user is the current user, update session too
  const currentUser = getCurrentUser();
  if (currentUser?.id === id) {
    setCurrentUser(users[idx]);
  }
  
  return users[idx];
}

// ---- Current User (Session) ----

export function getCurrentUser(): User | null {
  return getItem<User | null>(KEYS.CURRENT_USER, null);
}

export function setCurrentUser(user: User | null): void {
  setItem(KEYS.CURRENT_USER, user);
}

// ---- Experiment Results ----

export function getResults(): ExperimentResult[] {
  return getItem<ExperimentResult[]>(KEYS.RESULTS, []);
}

export function getResultsByUser(userId: string): ExperimentResult[] {
  return getResults().filter((r) => r.userId === userId);
}

export function getResultsByExperiment(experimentId: string): ExperimentResult[] {
  return getResults().filter((r) => r.experimentId === experimentId);
}

export function saveResult(result: ExperimentResult): void {
  const results = getResults();
  const existingIdx = results.findIndex((r) => r.id === result.id);
  if (existingIdx >= 0) {
    results[existingIdx] = result;
  } else {
    results.push(result);
  }
  setItem(KEYS.RESULTS, results);
}

export function getStudentAttemptCount(userId: string, experimentId: string): number {
  return getResults().filter(
    (r) => r.userId === userId && r.experimentId === experimentId && r.status === 'completed'
  ).length;
}

// ---- Feedback ----

export function getFeedback(): Feedback[] {
  return getItem<Feedback[]>(KEYS.FEEDBACK, []);
}

export function getFeedbackForStudent(studentId: string): Feedback[] {
  return getFeedback().filter((f) => f.studentId === studentId);
}

export function saveFeedback(feedback: Feedback): void {
  const all = getFeedback();
  all.push(feedback);
  setItem(KEYS.FEEDBACK, all);
}

// ---- All Students (for Instructor) ----

export function getAllStudents(): User[] {
  return getUsers().filter((u) => u.role === 'student');
}

export function getAllStudentResults(): { user: User; results: ExperimentResult[] }[] {
  const students = getAllStudents();
  return students.map((user) => ({
    user,
    results: getResultsByUser(user.id),
  }));
}

