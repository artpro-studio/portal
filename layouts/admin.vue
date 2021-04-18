<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
      v-if="$store.getters['user/isAdmin']"
    >
      <v-treeview :items="menu">

        <template v-slot:prepend="{ item, open }">
          <v-icon v-if="!item.icon">
            {{ open ? 'mdi-folder-open' : 'mdi-folder' }}
          </v-icon>
          <v-icon v-else>
            mdi-folder
          </v-icon>
        </template>

        <template v-slot:label="{item, open}">
          <div v-if="!open">{{item.name}}</div>
          <nuxt-link :to="item.to" v-else>{{item.name}}</nuxt-link>
        </template>

      </v-treeview>

    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn
        icon
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="clipped = !clipped"
      >
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <v-btn
        icon
        @click.stop="fixed = !fixed"
      >
        <v-icon>mdi-minus</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-btn
        icon
        @click.stop="rightDrawer = !rightDrawer"
      >
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-navigation-drawer
      v-model="rightDrawer"
      :right="right"
      temporary
      fixed
    >
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light>
              mdi-repeat
            </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-footer
      :absolute="!fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        clipped: false,
        drawer: false,
        fixed: false,
        menu: [
          {
            name: 'Пользователи',
            to:"/admin/",
            children:[
              {
                icon: 'mdi-apps',
                name: 'Пользователи',
                to: '/admin/users'
              },
              {
                icon: 'mdi-apps',
                name: 'Роли',
                to: '/admin/role'
              },
              {
                icon: 'mdi-apps',
                name: 'Организации',
                to: '/admin/organizations'
              },
              {
                icon: 'mdi-apps',
                name: 'Ресурсы',
                to: '/admin/resources'
              },
            ]
          }
        ],
        miniVariant: false,
        right: true,
        rightDrawer: false,
        title: 'Управление сервисом'
      }
    }
  }
</script>
<style lang="scss">
  .v-treeview-node__label{
    a{
      color: #333;
      text-decoration: none;
    }
  }
</style>
