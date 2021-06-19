<template>
  <v-card>
    <v-card-title>
      Questions
      <v-spacer> </v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="questions"
      :items-per-page="50"
      :search="search"
      multi-sort
      :single-expand="true"
      :expanded.sync="expanded"
      item-key="id"
      show-expand
      class="elevation-1"
    >
      <template v-slot:[`item.title`]="{ item }">
        <a :href="item.url" class="green--text text--darken-4">
          {{ item.title }}
        </a>
      </template>
      <template v-slot:[`item.level`]="{ item }">
        <v-chip small :color="getChipColor(item.level)" dark>
          {{
            item.level === 1
              ? "Easy 🍀"
              : item.level === 2
              ? "Medium"
              : "Hard 🔥"
          }}
        </v-chip>
      </template>
      <template v-slot:[`item.frequency`]="{ item }">
        <template>
          <v-progress-linear
            :color="getBarColor(item.frequency * 25)"
            :value="item.frequency * 25"
            :buffer-value="item.frequency * 25"
            rounded
            stream
          >
          </v-progress-linear>
        </template>
      </template>
      <template v-slot:expanded-item="{ headers, item }">
        <td :colspan="headers.length">
          Search
          <a
            :href="'https://www.youtube.com/results?search_query=' + item.title"
          >
            {{ item.title }}
          </a>
          on YouTube
        </td>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import { getAllQuestions } from "@/apis/getQuestions";

const headers = [
  { text: "#", align: "start", value: "id" },
  { text: "Title", value: "title" },
  { text: "Difficulty", value: "level" },
  { text: "Frequency", value: "frequency", filterable: false },
  { text: "Tags", value: "tags", sortable: false },
  { text: "", value: "data-table-expand" }
];

export default {
  name: "Questions",
  data() {
    return {
      search: "",
      expanded: [],
      headers,
      questions: []
    };
  },
  created() {
    this.fetchQuestions();
  },
  methods: {
    getChipColor(level) {
      if (level == 1) return "green";
      else if (level == 2) return "orange";
      else return "red";
    },
    getBarColor(frequency) {
      if (frequency === 0) return "grey lighten-1";
      if (frequency > 0 && frequency < 25) return "red lighten-1";
      if (frequency >= 25 && frequency < 50) return "orange lighten-1";
      if (frequency >= 50 && frequency < 75) return "green lighten-1";
      else if (frequency >= 75 && frequency < 99) return "green darken-2";
      else return "blue darken-1";
    },
    async fetchQuestions() {
      getAllQuestions().then(value => {
        const data = value.data;
        this.questions = data;
      });
    }
  }
};
</script>
<style>
a {
  text-decoration: none;
}
</style>
