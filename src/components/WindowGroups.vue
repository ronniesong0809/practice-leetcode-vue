<template>
  <v-row class="windows py-5" align="center" justify="center">
    <v-item-group v-model="window" class="shrink mr-6" mandatory>
      <v-item v-for="n in length" :key="n" v-slot="{ active, toggle }">
        <div>
          <v-btn :input-value="active" icon @click="toggle">
            <v-icon>mdi-record</v-icon>
          </v-btn>
        </div>
      </v-item>
    </v-item-group>
    <v-col md="12" lg="8" xl="6">
      <v-window v-model="window" class="elevation-1" vertical>
        <v-window-item
          v-for="(Stats, index) in companyStats.slice(1, 4)"
          :key="index"
        >
          <v-card>
            <v-card-title>
              <span class="text-h6  font-weight-ligh">
                {{
                  index == 1
                    ? "0 Month ~ 6 Months"
                    : index == 2
                    ? "6 Months ~ 1 Year"
                    : "1 Year ~ 2 Years"
                }}
              </span>
            </v-card-title>
            <v-card-text>
              <v-chip
                class="ma-1"
                small
                v-for="company in Stats"
                :key="company.name"
                @click="searchCompany(company.name)"
              >
                <v-icon left> mdi-{{ company.name.toLowerCase() }} </v-icon>
                {{ company.name }}
              </v-chip>
            </v-card-text>
          </v-card>
        </v-window-item>
      </v-window>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "WindowGroups",
  props: {
    companyStats: Array
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
