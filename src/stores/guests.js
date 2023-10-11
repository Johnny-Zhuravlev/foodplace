import { defineStore } from 'pinia';

export const useGuests = defineStore('guests', {
  state: () => ({
    guest_list: null,
    connection: new WebSocket('ws://178.250.156.182:8080/fortest'),
  }),
  actions: {
    async setConnection() {
      this.connection.onopen = async (event) => {
        await this.getGuests();
      }
    },
    async getGuests() {
      await this.connection.send(JSON.stringify({
        "operation": "guests_list",
        "key": "kwrD82SCxh6gAqHBqIV7",
        "desc_value": "получение списка гостей"
      }));
    },
    async regNewGuest(guest) {
      await this.connection.send(JSON.stringify({
        "operation": "guest_regestration",
        "key": "eQlZ73tfulu2A2dioqqI",
        "surname": guest.lastname,
        "forename": guest.name,
        "middlename": guest.patronymic,
        "phone": guest.phone,
        "birthday": guest.birthday,
        "email": guest.email,
        "address": guest.address
      }));

      await this.getGuests();
    },
    async addPhone(id, phone) {
      await this.connection.send(JSON.stringify({
        "operation": "add_guestphone",
        "key": "Q5biy24xFWb4LyelfHyk",
        "id": id,
        "phone": phone
      }));
    },
    async addEmail(id, email) {
      await this.connection.send(JSON.stringify({
        "operation": "add_guestemail",
        "key": "eVPOFyDORi5M0WedMYWF",
        "id": id,
        "email": email
      }));
    }
  },
});
