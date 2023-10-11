import { defineStore } from 'pinia';

export const useDishes = defineStore('dishes', {
  state: () => ({
    dishes: [],
    connection: new WebSocket('ws://178.250.156.182:8080/fortest'),
  }),
  actions: {
    async setConnection() {
      this.connection.onopen = async (event) => {
        await this.getDishes();
      }
    },
    async getDishes() {
      await this.connection.send(JSON.stringify({
        "operation": "dishes_list",
        "key": "2ogCah9YzUool4fYAKV9",
        "desc_value": "получение списка блюд"
      }));
    },
    setTitle(id, title) {
      this.connection.send(JSON.stringify({
        "operation": "change_dish_name",
        "key": "wSEYY3tA9BpRNhkwfOmS",
        "id": id,
        "name_value": title
      }));
    },
    setPrice(id, price) {
      this.connection.send(JSON.stringify({
        "operation": "change_dish_cost",
        "key": "wSEYY3tA9BpRNhkwfOmS",
        "id": id,
        "cost_value": Number(price)
      }));
    },
    setDescription(id, description) {
      this.connection.send(JSON.stringify({
        "operation": "change_dish_desc",
        "key": "wSEYY3tA9BpRNhkwfOmS",
        "id": id,
        "desc_value": description
      }));
    }
  },
});
