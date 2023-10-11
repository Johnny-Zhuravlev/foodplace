<template>
  <q-page class="bg-grey-4">
    <q-page-container class="q-px-lg flex justify-center">
      <div class="overflow-hidden" style="width: 60%; border-radius: 10px">
        <q-tabs
          v-model="tab"
          dense
          class="text-grey-8"
          active-color="primary"
          active-bg-color="white"
          indicator-color="transparent"
          align="justify"
        >
          <q-tab name="registration" label="Регистрация гостя" class="q-pa-sm text-capitalize" />
          <q-tab name="table" label="Таблица гостей" class="q-pa-sm text-capitalize" @click="getGuests" />
        </q-tabs>

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="registration" class="q-py-xl q-px-lg">
            <GuestRegistration />
          </q-tab-panel>

          <q-tab-panel name="table" class="q-py-xl q-px-lg">
            <GuestsTable :guests="guests" />
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </q-page-container>
  </q-page>
</template>

<script setup>
import {ref} from "vue";
import { useGuests } from "stores/guests";
import GuestRegistration from "../components/GuestsComponents/GuestRegistration.vue";
import GuestsTable from "../components/GuestsComponents/GuestsTable.vue";

const tab = ref('registration');
const store = useGuests();
const guests = ref([]);

const getGuests = async () => {
  await store.getGuests();

  store.connection.onmessage = function (event) {
    let data = JSON.parse(event.data);

    store.guest_list = data.guest_list;
    guests.value = data.guest_list;
  }
}
</script>

