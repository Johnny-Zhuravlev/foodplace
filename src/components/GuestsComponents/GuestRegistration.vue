<template>
  <div class="guest-registration">
    <q-form
      @submit="regGuest"
      class="q-gutter-md"
    >
      <q-input
        filled
        v-model="lastname"
        label="Фамилия *"
        lazy-rules="ondemand"
        :rules="[ val => val && val.length > 2 || 'Это обязательное поле']"
      />
      <q-input
        filled
        v-model="name"
        label="Имя *"
        lazy-rules="ondemand"
        :rules="[ val => val && val.length > 2 || 'Это обязательное поле']"
      />
      <q-input
        filled
        v-model="patronymic"
        label="Отчество *"
        lazy-rules="ondemand"
        :rules="[ val => val && val.length > 2 || 'Это обязательное поле']"
      />
      <q-input
        filled
        v-model="dateOfBirth"
        label="Дата рождения *"
        mask="##.##.####"
        placeholder="дд.мм.гггг"
        lazy-rules="ondemand"
        :rules="[ val => val && val.length > 9 || 'Это обязательное поле']"
      />
      <div class="sex-wrapper q-mb-lg relative-position">
        <q-radio v-model="sex" val="male" label="Мужской" color="teal" />
        <q-radio v-model="sex" val="female" label="Женский" color="orange" />
      </div>
      <q-input
        filled
        v-model="address"
        label="Адрес *"
        lazy-rules="ondemand"
        :rules="[ val => val && val.length > 2 || 'Это обязательное поле']"
      />
      <q-input
        filled
        v-model="phone"
        label="Телефон *"
        lazy-rules="ondemand"
        mask="+7-(###)-###-##-##"
        :rules="[
          val => val.length || 'Это обязательное поле',
          val => val && val.length > 17 || 'Введите корректный номер'
        ]"
        style="-webkit-appearance: none"
      />
      <q-input
        filled
        v-model="email"
        label="Электронная почта *"
        lazy-rules="ondemand"
        :rules="[
          val => val !== null && val !== '' || 'Это обязательное поле',
          val => reg.test(val) && val !== '' || 'Введите корректный email'
        ]"
      />


      <div class="flex justify-end">
        <q-btn label="Сохранить" type="submit" color="primary"/>
      </div>
    </q-form>
  </div>
</template>

<script setup>
import { useQuasar } from 'quasar';
import { ref } from 'vue';
import { useGuests } from "stores/guests";

const store = useGuests();
const $q = useQuasar();
const lastname = ref(null);
const name = ref(null);
const patronymic = ref(null);
const dateOfBirth = ref(null);
const sex = ref('male');
const address = ref(null);
const phone = ref(null);
const email = ref(null);
const reg = ref(/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/);

const regGuest = async () => {
  if (
    !lastname.value &&
    !name.value &&
    !patronymic.value &&
    !dateOfBirth.value &&
    !sex.value &&
    !address.value &&
    !phone.value &&
    !email.value
  ) {
    $q.notify({
      color: 'red-5',
      textColor: 'white',
      icon: 'warning',
      message: 'You need to accept the license and terms first'
    })
  } else {
    $q.notify({
      color: 'green-4',
      textColor: 'white',
      icon: 'cloud_done',
      message: 'Submitted'
    });

    await store.regNewGuest({
      lastname: lastname.value,
      name: name.value,
      patronymic: patronymic.value,
      phone: phone.value,
      email: email.value,
      birthday: dateOfBirth.value,
      address: address.value
    });

    setTimeout(() => {
      reset();
    },500)
  }
};

const reset = () => {
  lastname.value = null;
  name.value = null;
  patronymic.value = null;
  dateOfBirth.value = null;
  sex.value = null;
  address.value = null;
  phone.value = null;
  email.value = null;
};
</script>

<style>
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
input[type='number'] {
  -moz-appearance: textfield;
}
</style>
