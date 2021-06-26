<template>
  <v-container>
    <v-card-title class="pa-10">
      <v-row class="justify-center">
        <v-col cols="12" sm="6">
          <v-text-field v-model="search" append-icon="mdi-magnify" hide-details>
            <template v-slot:label>
              Search from {{ questions.length }}
              {{ $route.params.tag || $route.params.company }}
              {{ questions.length === 0 ? "Question" : "Questions" }}
            </template>
          </v-text-field>
        </v-col>
      </v-row>
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
      class="elevation-5"
      :loading="!questions.length"
      loading-text="Loading... Please wait"
      mobile-breakpoint="0"
    >
      <template v-slot:[`item.title`]="{ item }">
        <a :href="item.url">
          {{ item.title }}
        </a>
      </template>
      <template v-slot:[`item.level`]="{ item }">
        <v-chip small :color="getChipColor(item.level)" dark>
          {{
            item.level === "easy"
              ? "Easy 🍀"
              : item.level === "medium"
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
            small
            v-for="tag in item.tags"
            :key="tag"
            @click="searchTag(tag)"
          >
            {{ tag }}
          </v-chip>
        </v-chip-group>
      </template>
      <template v-slot:[`item.companies`]="{ item }">
        <v-chip-group exact column>
          <v-chip
            class="ma-1"
            small
            v-for="company in item.companies"
            :key="company"
            @click="searchCompany(company)"
          >
            <v-icon left> mdi-{{ company.toLowerCase() }} </v-icon>
            {{ company }}
          </v-chip>
        </v-chip-group>
      </template>
      <template v-slot:expanded-item="{ headers, item }">
        <td></td>
        <td :style="'max-width:' + headers[0].width">
          <v-layout class="ma-4" column>
            <a
              class="my-2"
              v-for="link in quickLinks"
              :key="link.name"
              :href="link.url + item.title"
            >
              <v-icon :color="link.color"> mdi-{{ link.name }} </v-icon>
            </a>
          </v-layout>
        </td>
        <td :style="'max-width:' + headers[3].width">
          <div class="text-center">
            <span>Similar Questions</span>
            <v-divider class="ma-2" />
            <v-chip
              class="ma-1"
              small
              v-for="tag in item.similarQuestions"
              :key="tag.title"
              @click="searchQuestion(tag.title)"
            >
              {{ tag.title }}
            </v-chip>
          </div>
        </td>
        <td></td>
        <td></td>
        <td></td>
        <td class="py-5 text-center">
          <div class="ma-1">
            <span>0 ~ 6 months</span>
            <v-divider class="ma-2" />
            <v-chip
              class="ma-1"
              small
              v-for="company in item.companyStats[1]"
              :key="company.name"
              @click="searchCompany(company.name)"
            >
              <v-icon left> mdi-{{ company.name.toLowerCase() }} </v-icon>
              {{ company.name }}
            </v-chip>
          </div>
          <div class="ma-1">
            <span>6 months ~ 1 year</span>
            <v-divider class="ma-2" />
            <v-chip
              class="ma-1"
              small
              v-for="company in item.companyStats[2]"
              :key="company.name"
              @click="searchCompany(company.name)"
            >
              <v-icon left> mdi-{{ company.name.toLowerCase() }} </v-icon>
              {{ company.name }}
            </v-chip>
          </div>
          <div class="ma-1">
            <span>1 year ~ 2 years</span>
            <v-divider class="ma-2" />
            <v-chip
              class="ma-1"
              small
              v-for="company in item.companyStats[3]"
              :key="company.name"
              @click="searchCompany(company.name)"
            >
              <v-icon left> mdi-{{ company.name.toLowerCase() }} </v-icon>
              {{ company.name }}
            </v-chip>
          </div>
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
const headers = [
  { text: "", value: "data-table-expand" },
  { text: "#", align: "start", value: "id", width: "80px" },
  { text: "title", value: "title", width: "200px" },
  { text: "diffic.", value: "level", width: "110px" },
  { text: "freq.", value: "frequency", width: "100px", filterable: false },
  { text: "tags", value: "tags", width: "200px", sortable: false },
  { text: "companies", value: "companies", width: "300px", sortable: false }
];

const quickLinks = [
  { name: "google", color: "blue", url: "https://www.google.com/search?q=" },
  {
    name: "youtube",
    color: "red",
    url: "https://www.youtube.com/results?search_query="
  },
  { name: "github", color: "primary", url: "https://github.com/search?q=" },
  { name: "search-web", color: "blue", url: "https://www.baidu.com/s?wd=" }
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
      quickLinks
    };
  },
  props: {
    questions: Array
  },
  methods: {
    getChipColor(level) {
      if (level == "easy") return "green";
      else if (level == "medium") return "orange";
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
    searchQuestion(key) {
      this.search === key ? "" : (this.search = key);
    },
    searchTag(key) {
      this.search === key
        ? this.$router.push({ name: "Tag", params: { tag: key } })
        : (this.search = key);
    },
    searchCompany(key) {
      this.search === key
        ? this.$router.push({ name: "Company", params: { company: key } })
        : (this.search = key);
    }
  }
};
</script>
<style>
a {
  text-decoration: none;
}
</style>
