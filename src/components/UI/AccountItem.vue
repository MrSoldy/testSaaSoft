<script lang="ts" setup>
import { defineProps, defineEmits, ref, watch } from "vue";
import { IAccount } from "../../types/IAccountFormTypes";

const props = defineProps<{
  account: IAccount;
}>();

const label = ref<string>("");

watch(
  () => props.account.label,
  (newVal) => {
    if (Array.isArray(newVal)) {
      label.value = newVal.map((item) => item.text).join(";");
    } else if (typeof newVal === "string") {
      label.value = newVal;
    } else {
      label.value = "";
    }
  },
  { immediate: true }
);

const emits = defineEmits<{
  (e: "save", id: number, label: string): void;
  (e: "remove", id: number): void;
  (e: "type-change", id: number): void;
}>();

const onSave = () => emits("save", props.account.id, label.value);
const onRemove = () => emits("remove", props.account.id);
const onTypeChange = () => emits("type-change", props.account.id);
</script>

<template>
  <div class="w-full py-2 flex justify-around items-center">
    <div class="mb-3 w-1/4">
      <label class="block font-medium mb-1" for="label">Метка</label>
      <input
        id="label"
        type="text"
        v-model="label"
        @blur="onSave"
        maxlength="50"
        placeholder="пример: admin;test"
        class="w-full px-3 py-2 border rounded border-black"
      />
      <p class="mt-1 min-h-[1.25rem] invisible"></p>
    </div>

    <div class="mb-3 w-1/7">
      <label class="block font-medium mb-1" for="type">Тип записи</label>
      <select
        id="type"
        v-model="account.type"
        @change="onTypeChange"
        class="w-full px-3 py-2 border rounded border-black"
      >
        <option>LDAP</option>
        <option>Локальная</option>
      </select>
      <p class="mt-1 min-h-[1.25rem] invisible"></p>
    </div>

    <div
      class="mb-3"
      :class="account.type === 'Локальная' ? 'w-1/4' : 'w-[52%]'"
    >
      <label class="block font-medium mb-1" for="login">Логин *</label>
      <input
        id="login"
        type="text"
        v-model="account.login"
        :class="[
          'w-full px-3 py-2 border rounded',
          account.errors.login
            ? 'border-red-600'
            : 'border-black focus:border-blue-500',
        ]"
        @blur="onSave"
        maxlength="100"
      />
      <p
        class="text-sm mt-1 min-h-[1.25rem]"
        :class="account.errors.login ? 'text-red-600 visible' : 'invisible'"
      >
        {{ account.errors.login || " " }}
      </p>
    </div>

    <div class="mb-3 w-1/4" v-if="account.type === 'Локальная'">
      <label class="block font-medium mb-1" for="password">Пароль *</label>
      <input
        id="password"
        type="password"
        v-model="account.password"
        :class="[
          'w-full px-3 py-2 border rounded',
          account.errors.password
            ? 'border-red-600'
            : 'border-black focus:border-blue-500',
        ]"
        @blur="onSave"
        maxlength="100"
      />
      <p
        class="text-sm mt-1 min-h-[1.25rem]"
        :class="account.errors.password ? 'text-red-600 visible' : 'invisible'"
      >
        {{ account.errors.password || " " }}
      </p>
    </div>

    <button
      @click="onRemove"
      class="w-1/12 h-[42px] mb-[10px] bg-red-600 text-white px-2 rounded hover:bg-red-700 transition"
    >
      Удалить
    </button>
  </div>
</template>
