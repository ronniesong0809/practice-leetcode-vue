<template>
  <v-container class="dashboard" fill-height fluid>
    <v-row justify="center">
      <v-col md="12" lg="6" xl="4">
        <v-card class="justify-center">
          <v-list-item-content>
            <div class="text-center">
              <v-avatar color="brown">
                <img :src="$auth.user.picture" :alt="$auth.user.name" />
              </v-avatar>
              <div class="text-h5 mt-1">{{ $auth.user.name }}</div>
              <div class="text-caption">@{{ $auth.user.nickname }}</div>
              <div class="text-body-2 my-2">
                <v-icon x-small>
                  mdi-email
                </v-icon>
                {{ $auth.user.email }}
              </div>
            </div>
          </v-list-item-content>
          <v-footer padless>
            <v-col class="text-caption grey--text text-center">
              Last Updated:
              <strong>
                {{ getMinutes($auth.user.updated_at) }}
              </strong>
              {{
                getMinutes($auth.user.updated_at) !== 0
                  ? "minutes ago"
                  : "minute ago"
              }}
            </v-col>
          </v-footer>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  methods: {
    getMinutes(date) {
      return new Date(new Date() - new Date(date)).getMinutes();
    }
  }
};
</script>
