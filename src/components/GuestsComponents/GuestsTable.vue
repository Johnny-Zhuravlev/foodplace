<template>
  <div class="guest-table">
    <table v-if="props.guests" class="table">
      <thead>
      <tr>
        <th v-for="title in cols" :key="title" class="title">
          {{ title }}
        </th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="guest of guests" :key="guest.id">
        <td class="cell">{{ guest.surname }} {{ guest.middlename }} {{ guest.forename }}</td>
        <td class="cell relative-position">
          <span v-for="phone of guest.phones" :key="phone" class="block q-pb-sm">{{ phone }}</span>
          <q-icon
            v-if="isAdditionalPhone !== guest.id && guest.phones.length < 2"
            name="add"
            size="18px"
            color="red"
            class="absolute-bottom-right cursor-pointer"
            @click="isAdditionalPhone = guest.id"
          />
          <q-input
            v-if="isAdditionalPhone === guest.id"
            class="q-pb-none"
            v-model="phone"
            placeholder="Введите номер"
            mask="+7-(###)-###-##-##"
            lazy-rules
            dense
            :rules="[
              val => val.length || 'Это обязательное поле',
              val => val && val.length > 17 || 'Введите корректный номер'
            ]"
            @blur="isAdditionalPhone = null"
          >
            <template v-slot:append>
              <q-icon v-show="phone.length <= 17" size="18px" name="close" @click="isAdditionalPhone = null" class="cursor-pointer" />
              <q-icon v-show="phone.length > 17" size="18px" name="send" @click="addPhone(guest.id)" class="cursor-pointer" />
            </template>
          </q-input>
        </td>
        <td class="cell relative-position">
          <span v-for="email of guest.emails" :key="email" class="block q-pb-sm">{{ email }}</span>
          <q-icon
            v-if="isAdditionalEmail !== guest.id && guest.emails.length < 2"
            name="add"
            size="18px"
            color="red"
            class="absolute-bottom-right cursor-pointer"
            @click="isAdditionalEmail = guest.id"
          />
          <q-input
            v-if="isAdditionalEmail === guest.id"
            class="q-pb-none"
            v-model="email"
            placeholder="Эл.почта"
            dense
            lazy-rules
            :rules="[
              val => val !== null && val !== '' || 'Это обязательное поле',
              val => reg.test(val) && val !== '' || 'Введите корректный email'
            ]"
            @blur="isAdditionalEmail = null"
          >
            <template v-slot:append>
              <q-icon v-show="!reg.test(email)" size="18px" name="close" @click="isAdditionalEmail = null" class="cursor-pointer" />
              <q-icon v-show="reg.test(email)" size="18px" name="send" @click="addEmail(guest.id)" class="cursor-pointer" />
            </template>
          </q-input>
        </td>
        <td class="cell">{{ guest.birthday }}</td>
        <td class="cell">{{ guest.address }}</td>
      </tr>
      </tbody>
    </table>

    <div v-else class="no-guests q-pa-lg text-center">
      Список гостей пуст. Зарегистрируйте гостей!
    </div>
  </div>
</template>

<script setup>
import {ref, defineProps, onBeforeUpdate} from "vue";
import {useGuests} from "stores/guests";

const props = defineProps({
  guests: Array,
});
const store = useGuests();
const cols = ref(['ФИО', 'Телефон', 'Эл.почта', 'Дата рождения', 'Адрес']);

const isAdditionalPhone = ref(null);
const isAdditionalEmail = ref(null);
const phone = ref('');
const email = ref('');
const reg = ref(/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/);

const addPhone = async (id) => {
  await store.addPhone(id, phone.value);

  store.connection.onmessage = function (event) {
    if (event.data.status) {
      isAdditionalPhone.value = null;
    }
  }
}

const addEmail = async (id) => {
  await store.addEmail(id, email.value);

  store.connection.onmessage = async (event) => {
    if (event.data.status) {
      isAdditionalPhone.value = null;
    }
  }
}
</script>

<style scoped lang="scss">
.table {
  width: 100%;
  border-collapse: collapse;

  .title,
  .cell {
    text-align: left;
    padding: 10px;
    border: 1px solid #000;
  }

  .cell {
    vertical-align: baseline;
  }
}

.no-guests {
  font-size: 24px;
  line-height: 32px;
  font-weight: 700;
}
</style>
