export interface ILabelItem {
  text: string;
}

export interface IAccount {
  id: number;
  label: string | ILabelItem[];
  type: "LDAP" | "Локальная";
  login: string;
  password: string | null;
  errors: Partial<Record<keyof Omit<IAccount, "id" | "errors">, string>>;
}
