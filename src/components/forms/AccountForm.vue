<script lang="ts" setup>
import AccountItem from "../UI/AccountItem.vue";
import { useAccountsStore } from "../../stores/counter";
import { onMounted } from "vue";
import { storeToRefs } from "pinia";

const store = useAccountsStore();

const { load, addAccount, removeAccount, saveAccount, changeType } = store;
const { accounts } = storeToRefs(store);

onMounted(() => {
  load();
});
</script>

<template>
  <div class="w-9/10 mx-auto p-4">
    <div class="flex justify-start items-center mb-4">
      <h1 class="text-xl font-bold">Учетные записи</h1>
      <button
        @click="addAccount"
        class="bg-blue-600 text-white px-3 pt-1 pb-[0.35rem] ml-2 rounded hover:bg-blue-700 transition"
      >
        +
      </button>
    </div>
    <p
      class="mb-4 mx-4 p-2 text-gray-600 text-sm flex items-center gap-2 bg-gray-200"
    >
      <span
        class="flex items-center justify-center w-5 h-5 text-gray-700 border border-gray-700 rounded-full text-xs font-semibold select-none"
        aria-label="Подсказка"
      >
        ?
      </span>
      Для указания нескольких меток для одной пары логин/пароль использовать
      разделительной ;
    </p>

    <AccountItem
      v-for="account in accounts"
      :key="account.id"
      :account="account"
      @save="saveAccount"
      @remove="removeAccount"
      @type-change="changeType"
    />
  </div>
</template>
