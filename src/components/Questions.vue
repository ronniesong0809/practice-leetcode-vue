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
      :items-per-page="20"
      :search="search"
      multi-sort
      :single-expand="true"
      :expanded.sync="expanded"
      item-key="id"
      show-expand
      class="elevation-1"
    >
      <template v-slot:[`item.title`]="{ item }">
        <a :href="item.url">
          {{ item.title }}
        </a>
      </template>
      <template v-slot:[`item.level`]="{ item }">
        <!-- <v-chip :color="getColor(item.level)" dark> -->
        {{ item.level === 1 ? "Easy" : item.level == 2 ? "Medium" : "Hard" }}
        <!-- </v-chip> -->
      </template>
      <template v-slot:expanded-item="{ headers, item }">
        <td :colspan="headers.length">
          Search <a :href="'https://www.youtube.com/results?search_query=' + item.title">{{ item.title }}</a> on YouTube
        </td>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import { getAllQuestions } from "@/apis/getQuestions";

const headers = [
  { text: "Id", align: "start", value: "id" },
  { text: "Title", value: "title" },
  { text: "Level", value: "level" },
  { text: "Frequency", value: "frequency" },
  { text: "Tags", value: "tags", sortable: false },
  { text: "", value: "data-table-expand" }
];
/* eslint-disable */
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
    getColor(level) {
      if (level == 1) return "green";
      else if (level == 2) return "orange";
      else return "red";
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
/* eslint-enable */
