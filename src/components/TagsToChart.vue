<template>
  <v-container class="tagToChart text-center" fluid>
    <v-row justify="center">
      <v-col v-if="show" sm="12" md="10" lg="8">
        <v-btn class="mb-4" rounded color="primary" dark @click="setChartData">
          <v-icon left dark>
            mdi-tag-multiple
          </v-icon>
          Show Tags
        </v-btn>
        <Chart
          :height="height"
          :chart-data="datacollection"
          :options="chartOptions"
        />
      </v-col>
      <v-col v-else sm="12" md="10" lg="8">
        <v-btn class="mb-4" rounded color="primary" dark @click="setChartData">
          <v-icon left dark>
            mdi-chart-bar
          </v-icon>
          Show Chart
        </v-btn>
        <br />
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
  </v-container>
</template>

<script>
import Chart from "@/components/Chart";

export default {
  components: { Chart },
  name: "TagsToChart",
  props: {
    data: Array,
    height: Number
  },
  data() {
    return {
      show: false,
      label: [],
      dataset: [],
      backgroundColor: [],
      borderColor: [],
      hoverBackgroundColor: [],
      hoverBorderColor: [],
      other: 0,
      lastIndex: 0,
      datacollection: {},
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [{ position: "top" }]
        },
        plugins: {
          legend: false
        },
        onClick: (event, element) => {
          if (element.length > 0) {
            this.redirect(this.data[element[0]._index].name);
          }
        }
      }
    };
  },
  methods: {
    redirect(name) {
      this.$router.push(`${this.$router.history.current.path}/${name}`);
    },
    init() {
      this.label = [];
      this.dataset = [];
      this.backgroundColor = [];
      this.borderColor = [];
      this.hoverBackgroundColor = [];
      this.hoverBorderColor = [];
      this.other = 0;
    },
    getColor(offset, alpha) {
      offset = offset * 2;
      return !this.$vuetify.theme.dark
        ? `rgba(${20 + offset}, ${200 - offset}, ${255 - offset}, ${alpha})`
        : `rgba(${33 + offset}, ${150 + offset}, ${243 - offset}, ${alpha})`;
    },
    setColor(index) {
      this.backgroundColor.push(this.getColor(index, 0.8));
      this.borderColor.push(this.getColor(index, 1));
      this.hoverBackgroundColor.push(this.getColor(index, 0.4));
      this.hoverBorderColor.push(this.getColor(index, 1));
    },
    setChartData() {
      this.show = !this.show;
      this.init();
      this.data.forEach((item, index) => {
        if (item.count > 1) {
          this.label.push(item.name);
          this.dataset.push(item.count);
          this.setColor(index);
          this.lastIndex = index;
        } else {
          this.other += item.count;
        }
      });
      this.label.push("Other");
      this.dataset.push(this.other);
      this.setColor(this.lastIndex + 5);

      this.datacollection = {
        labels: this.label,
        datasets: [
          {
            label: "Questions",
            data: this.dataset,
            backgroundColor: this.backgroundColor,
            borderColor: this.borderColor,
            borderWidth: 1,
            hoverBackgroundColor: this.hoverBackgroundColor,
            hoverBorderColor: this.hoverBorderColor
          }
        ]
      };
    }
  }
};
</script>
