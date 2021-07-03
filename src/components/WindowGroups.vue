<template>
  <v-row class="windows" justify="center">
    <v-col md="12" lg="8" xl="6">
      <v-window v-model="window" class="elevation-5">
        <v-window-item
          v-for="(Stats, index) in companyStats.slice(1, 4)"
          :key="index"
        >
          <v-card>
            <v-card-title>
              <span class="text-h6 font-weight-ligh">
                {{
                  index == 0
                    ? "0 Month ~ 6 Months"
                    : index == 1
                    ? "6 Months ~ 1 Year"
                    : "1 Year ~ 2 Years"
                }}
              </span>
            </v-card-title>
            <v-divider class="ma-2" />
            <v-card-text>
              <v-chip
                class="ma-1"
                small
                v-for="company in Stats"
                :key="company.name"
                @click="searchCompany(company.name)"
                :color="company.name == search ? 'yellow darken-3' : ''"
                :dark="company.name == search ? true : false"
                :outlined="company.name == search ? true : false"
              >
                <v-icon left> mdi-{{ company.name.toLowerCase() }} </v-icon>
                {{ company.name }}
              </v-chip>
            </v-card-text>
          </v-card>
        </v-window-item>
      </v-window>
      <v-item-group v-model="window" class="text-center shrink mt-2" mandatory>
        <v-item v-for="n in length" :key="n" v-slot="{ active, toggle }">
          <v-btn :input-value="active" icon @click="toggle">
            <v-icon>mdi-record</v-icon>
          </v-btn>
        </v-item>
      </v-item-group>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "WindowGroups",
  props: {
    companyStats: Array,
    search: String
  },
  data: () => ({
    length: 3,
    window: 0
  }),
  methods: {
    searchCompany(key) {
      this.search === key
        ? this.$router.push({ name: "Company", params: { company: key } })
        : this.$emit("getSearch", key);
    }
  }
};
</script>
