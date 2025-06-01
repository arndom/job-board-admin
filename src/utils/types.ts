export type Nullable<T> = Partial<Record<keyof T, T[keyof T] | null>>;
