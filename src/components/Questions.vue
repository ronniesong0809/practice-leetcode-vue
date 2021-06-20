<template>
  <v-container>
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
      :page.sync="page"
      :items-per-page="50"
      @page-count="pageCount = $event"
      hide-default-footer
      :search="search"
      multi-sort
      :single-expand="true"
      :expanded.sync="expanded"
      item-key="id"
      show-expand
      class="elevation-1"
      :loading="!questions.length"
      loading-text="Loading... Please wait"
    >
      <template v-slot:[`item.title`]="{ item }">
        <a :href="item.url">
          {{ item.title }}
        </a>
      </template>
      <template v-slot:[`item.level`]="{ item }">
        <v-chip x-small :color="getChipColor(item.level)" dark>
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
      <template v-slot:[`item.tags`]="{ item }">
        <v-chip-group exact column>
          <v-chip
            class="ma-1"
            x-small
            v-for="tag in item.tags"
            :key="tag"
            @click="searchKey(tag)"
          >
            {{ tag }}
          </v-chip>
        </v-chip-group>
      </template>
      <template v-slot:[`item.companies`]="{ item }">
        <v-chip-group exact column>
          <v-chip
            class="ma-1"
            x-small
            v-for="company in item.companies"
            :key="company"
            @click="searchKey(company)"
          >
            <v-icon left> mdi-{{ company.toLowerCase() }} </v-icon>
            {{ company }}
          </v-chip>
        </v-chip-group>
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
    <div class="text-center">
      <v-pagination
        class="py-4"
        v-model="page"
        :length="pageCount"
        :total-visible="10"
      ></v-pagination>
    </div>
  </v-container>
</template>

<script>
import { getAllQuestions } from "@/apis/getQuestions";

const headers = [
  { text: "", value: "data-table-expand" },
  { text: "#", align: "start", value: "id", width: "80px" },
  { text: "title", value: "title", width: "200px" },
  { text: "diffic.", value: "level", width: "110px" },
  { text: "freq.", value: "frequency", width: "100px", filterable: false },
  { text: "tags", value: "tags", width: "200px", sortable: false },
  { text: "companies", value: "companies", width: "300px", sortable: false }
];

export default {
  name: "Questions",
  data() {
    return {
      page: 1,
      pageCount: 0,
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
    searchKey(key) {
      this.search = this.search === key ? "" : key;
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
