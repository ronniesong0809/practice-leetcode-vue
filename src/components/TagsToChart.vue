<template>
  <v-row class="text-center">
    <v-col v-if="show" md="10" offset-md="1" lg="4" offset-lg="4">
      <v-btn class="mb-2" @click="init">Show Tags</v-btn>
      <Chart :chart-data="datacollection" />
    </v-col>
    <v-col v-else md="10" offset-md="1" lg="8" offset-lg="2">
      <v-btn class="mb-2" @click="init">Show Chart</v-btn><br />
      <v-chip
        class="ma-1"
        v-for="item in data"
        :key="item.name"
        @click="redirect(item.name)"
      >
        {{ item.name }}
        <v-chip class="ma-1" x-small color="primary" dark>
          {{ item.count }}
        </v-chip>
      </v-chip>
    </v-col>
  </v-row>
</template>

<script>
import Chart from "@/components/Chart";

export default {
  components: { Chart },
  name: "TagsToChart",
  props: {
    data: Array
  },
  data() {
    return {
      show: false,
      label: [],
      dataset: [],
      other: 0,
      datacollection: {}
    };
  },
  methods: {
    redirect(name) {
      this.$router.push(`${this.$router.history.current.path}/${name}`);
    },
    getColor(alpha) {
      return this.$vuetify.theme.dark
        ? `rgba(33, 150, 243, ${alpha})`
        : `rgba(156, 39, 176, ${alpha})`;
    },
    init() {
      this.show = !this.show;
      this.label = [];
      this.dataset = [];
      this.other = 0;
      this.data.forEach((item, index) => {
        if (index < 20) {
          this.label.push(item.name);
          this.dataset.push(item.count);
        } else {
          this.other += item.count;
        }
      });
      this.label.push("Other");
      this.dataset.push(this.other);

      this.datacollection = {
        labels: this.label,
        datasets: [
          {
            label: "Questions",
            data: this.dataset,
            backgroundColor: this.getColor(0.5),
            borderColor: this.getColor(1),
            borderWidth: 1,
            hoverBackgroundColor: this.getColor(0.8),
            hoverBorderColor: this.getColor(1)
          }
        ]
      };
    }
  }
};
</script>
