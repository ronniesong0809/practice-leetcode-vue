<template>
  <v-card>
    <v-card-title>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="questions"
      :items-per-page="20"
      multi-sort
      class="elevation-1"
    >
      <template v-slot:[`item.title`]="{ item }">
        <a :href="item.url">
          {{ item.title }}
        </a>
      </template>
      <template v-slot:[`item.level`]="{ item }">
        {{ item.level === 1 ? "Easy" : item.level == 2 ? "Medium" : "Hard" }}
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
  { text: "Tags", value: "tags", sortable: false }
];
/* eslint-disable */
export default {
  name: "Questions",
  data() {
    return {
      search: "",
      headers,
      questions: []
    };
  },
  created() {
    this.fetchQuestions();
  },
  methods: {
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
