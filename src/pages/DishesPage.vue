<template>
  <q-page class="flex flex-center bg-grey-4">
    <div class="row q-pa-lg">
      <q-card
        v-for="dish of dishes"
        :key="dish.dish_id"
        class="my-card q-mx-xs q-my-sm relative-position"
        flat
        bordered
        style="width: 24.45%;"
      >
        <q-card-section class="q-pa-none">
          <div class="q-pa-md text-subtitle1 text-center ellipsis">
            <q-input
              v-if="cardId === dish.dish_id"
              v-model="title"
              label="Название"
              outlined
              @input="handleTitle($event)"
            />
            <span v-else>{{ dish.dish_name }}</span>
          </div>
        </q-card-section>
        <q-img :src="'src/assets/img/food.jpeg'" />
        <q-separator />
        <q-card-section class="q-pa-none q-mb-lg">
          <div class="q-pa-md text-subtitle1">
            <q-input
              v-if="cardId === dish.dish_id"
              v-model="price"
              label="Цена"
              outlined
              @input="handlePrice($event)"
            />
            <span v-else>{{ dish.dish_cost }}</span>
            <q-separator class="q-my-sm" />
            <q-input
              v-if="cardId === dish.dish_id"
              v-model="description"
              label="Описание"
              outlined
              @input="handleDescription($event)"
            />
            <span v-else>{{ dish.dish_description }}</span>
          </div>
        </q-card-section>

        <div
          v-if="cardId !== dish.dish_id"
          class="absolute-bottom-right q-mr-sm q-mb-sm text-black q-gutter-md cursor-pointer"
          style="font-size: 1.5em"
          @click="editCard(dish)"
        >
          <q-icon class="q-ma-none" name="edit" />
        </div>
        <div
          v-else
          class="absolute-bottom-right q-mr-sm q-mb-sm text-black q-gutter-md cursor-pointer"
          style="font-size: 1.5em"
          @click="confirmEditions(dish.dish_id)"
        >
          <q-icon class="q-ma-none" name="check" />
        </div>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import {onMounted, ref} from "vue";
import { useDishes } from "stores/dishes";

const store = useDishes();
const dishes = ref([]);
const cardId = ref(null);
const price = ref(null);
const title = ref('');
const description = ref('');
const editCard = (dish) => {
  cardId.value = dish.dish_id;

  title.value = dish.dish_name;
  price.value = dish.dish_cost;
  description.value = dish.dish_description;
}
const handleTitle = (event) => title.value = event.currentTarget.value;
const handlePrice = (event) => price.value = event.currentTarget.value;
const handleDescription = (event) => description.value = event.currentTarget.value;

const confirmEditions = (id) => {
  store.setPrice(id, price.value);

  setTimeout(() => {
    store.setDescription(id, description.value);
  }, 300);

  store.connection.onmessage = function (event) {
    let data = JSON.parse(event.data);

    if (data.status) {
      dishes.value.find(el => el.dish_id === id).dish_name = title.value;
      dishes.value.find(el => el.dish_id === id).dish_cost = price.value;
      dishes.value.find(el => el.dish_id === id).dish_description = description.value;
      cardId.value = '';
    }
  }
}

onMounted(async () => {
  await store.setConnection();
  store.connection.onmessage = function (event) {
    let data = JSON.parse(event.data);

    store.dishes = data.dishes_list;
    dishes.value = data.dishes_list;
  }
});
</script>

