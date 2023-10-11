<template>
<q-layout view="hHh lpr fFf">

  <q-header elevated class="flex items-center position-relative q-pa-lg bg-black text-white" height-hint="98">
    <q-btn size="20px" color="amber-4" round icon="img:src/assets/img/burger.png">
      <q-menu
        transition-show="jump-down"
        transition-hide="jump-up"
      >
        <q-list style="min-width: 100px">
          <q-item>
            <q-item-section>Меню</q-item-section>
          </q-item>
          <q-separator size="2px" />
          <q-item class="flex items-center q-pa-none">
            <router-link to="/dishes" class="q-pa-md" style="width: 100%; text-decoration: none; color: inherit">
              Меню блюд
            </router-link>
          </q-item>
          <q-item class="flex items-center q-pa-none">
            <router-link to="/guests" class="q-pa-md" style="width: 100%; text-decoration: none; color: inherit">
              Гости
            </router-link>
          </q-item>
        </q-list>
      </q-menu>
    </q-btn>

    <div class="q-mx-auto" style="width: 150px">
      <q-img src="src/assets/img/foodgrab.png"></q-img>
    </div>
  </q-header>

  <q-page-container>
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </q-page-container>

  <q-footer elevated class="bg-black text-white">
    <q-toolbar class="q-pa-lg">
      <div style="width: 126px">
        <q-img src="src/assets/img/foodgrab.png"></q-img>
      </div>
    </q-toolbar>
  </q-footer>

</q-layout>
</template>

