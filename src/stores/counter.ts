import { defineStore } from "pinia";
import { ref, watch } from "vue";
import { IAccount } from "../types/IAccountFormTypes";

export const useAccountsStore = defineStore("accounts", () => {
  const accounts = ref<IAccount[]>([]);

  const load = () => {
    const data = localStorage.getItem("accounts");
    if (data) {
      accounts.value = JSON.parse(data);
    }
  };

  watch(
    accounts,
    (newVal) => {
      localStorage.setItem("accounts", JSON.stringify(newVal));
    },
    { deep: true }
  );

  const addAccount = () => {
    accounts.value.push({
      id: Date.now() + Math.random(),
      label: "",
      type: "LDAP",
      login: "",
      password: null,
      errors: {},
    });
  };

  const removeAccount = (id: number) => {
    accounts.value = accounts.value.filter((a) => a.id !== id);
  };

  const validateAccount = (account: IAccount): boolean => {
    const errors: Partial<
      Record<keyof Omit<IAccount, "id" | "errors">, string>
    > = {};

    if (!account.login.trim()) {
      errors.login = "Обязательно к заполнению";
    } else if (account.login.length > 100) {
      errors.login = "Максимум 100 символов";
    }
    if (account.type === "Локальная") {
      if (!account.password || !account.password.trim()) {
        errors.password = "Обязательно к заполнению";
      } else if (account.password.length > 100) {
        errors.password = "Максимум 100 символов";
      }
    }
    account.errors = errors;
    return Object.keys(errors).length === 0;
  };

  const saveAccount = (id: number, label?: string): boolean => {
    const acc = accounts.value.find((a) => a.id === id);
    if (!acc) return false;

    if (label) {
      const parts = label
        .split(";")
        .map((s) => s.trim())
        .filter((s) => s.length > 0);
      acc.label = parts.map((text) => ({ text }));
    }

    return validateAccount(acc);
  };

  const changeType = (id: number) => {
    const acc = accounts.value.find((a) => a.id === id);
    if (!acc) return;
    if (acc.type === "LDAP") {
      acc.password = null;
      if (acc.errors) acc.errors.password = undefined;
    }
    saveAccount(id);
  };

  return {
    accounts,
    load,
    addAccount,
    removeAccount,
    validateAccount,
    saveAccount,
    changeType,
  };
});
