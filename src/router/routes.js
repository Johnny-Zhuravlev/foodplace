const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    redirect: '/dishes',
    children: [
      { path: '/dishes', component: () => import('pages/DishesPage.vue') },
      {
        path: '/guests',
        component: () => import('pages/GuestsPage.vue'),
        redirect: '/guest-registration',
        children: [
          { path: '/guest-registration', component: () => import('components/GuestsComponents/GuestRegistration.vue') },
          { path: '/guests-table', component: () => import('components/GuestsComponents/GuestsTable.vue') },
        ]
      },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
