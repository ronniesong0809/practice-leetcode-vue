<template>
  <v-container class="tagToChart">
    <v-row justify="center">
      <v-col sm="12" md="8" lg="6">
        <v-text-field
          class="pb-10"
          v-model="search"
          append-icon="mdi-magnify"
          hide-details
        >
          <template v-slot:label>
            Search from {{ questions.length }}
            {{ $route.params.tag || $route.params.company }}
            {{ questions.length === 0 ? "Question" : "Questions" }}
          </template>
        </v-text-field>
      </v-col>
    </v-row>
    <v-row align="center" justify="end">
      <v-col md="6" lg="2">
        <v-select
          v-model="level"
          :items="['easy', 'medium', 'hard']"
          label="Select Difficulty"
          small-chips
          deletable-chips
          multiple
          outlined
          return-object
        >
        </v-select>
      </v-col>
      <v-col md="6" lg="4">
        <v-select
          v-model="selectedHeaders"
          :items="headerList"
          label="Select Columns"
          small-chips
          deletable-chips
          multiple
          outlined
          return-object
        >
        </v-select>
      </v-col>
    </v-row>
    <v-data-table
      :headers="showHeaders"
      :items="showItems"
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
    <template v-slot:[`header.name`]="{ header }">
      {{ header.text.toUpperCase() }}
    </template>
      <template v-slot:[`item.notion`]="{ item }">
        <v-btn
          v-if="matched(200 + item.id)"
          x-small
          icon
          href="https://www.notion.so/practicealgorithms/"
        >
          <v-icon color="green">
            mdi-check
          </v-icon>
        </v-btn>
        <v-btn v-else x-small icon @click="addToNotion(item.id)">
          <v-icon color="primary">
            mdi-plus
          </v-icon>
        </v-btn>
      </template>
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
        <v-chip
          class="ma-1"
          small
          v-for="tag in item.tags"
          :key="tag"
          @click="searchTag(tag)"
          :color="onSelected(tag, 'yellow darken-3', '')"
          :dark="onSelected(tag, true, false)"
          :outlined="onSelected(tag, true, false)"
        >
          {{ tag }}
        </v-chip>
      </template>
      <template v-slot:[`item.companies`]="{ item }">
        <v-chip
          class="ma-1"
          small
          v-for="company in item.companies"
          :key="company"
          @click="searchCompany(company)"
          :color="onSelected(company, 'yellow darken-3', '')"
          :dark="onSelected(company, true, false)"
          :outlined="onSelected(company, true, false)"
        >
          <v-icon left> mdi-{{ company.toLowerCase() }} </v-icon>
          {{ company }}
        </v-chip>
      </template>
      <template v-slot:expanded-item="{ headers, item }">
        <td :colspan="headers.length">
          <v-container class="my-5">
            <v-row justify="center">
              <v-col md="12" lg="8" xl="6">
                <v-card elevation="5">
                  <v-card-title>
                    <span class="text-h6 font-weight-ligh">
                      Quick Links
                    </span>
                  </v-card-title>
                  <v-divider class="ma-2" />
                  <v-card-text>
                    <a
                      class="mx-5"
                      v-for="link in quickLinks"
                      :key="link.name"
                      :href="link.url + item.title"
                    >
                      <v-icon :color="link.color"> mdi-{{ link.name }} </v-icon>
                    </a>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
            <v-row justify="center">
              <v-col md="12" lg="8" xl="6">
                <v-card elevation="5">
                  <v-card-title>
                    <span class="text-h6 font-weight-ligh">
                      Similar Questions
                    </span>
                  </v-card-title>
                  <v-divider class="ma-2" />
                  <v-card-text>
                    <v-chip
                      class="ma-1"
                      small
                      v-for="tag in item.similarQuestions"
                      :key="tag.title"
                      @click="searchQuestion(tag.title)"
                    >
                      {{ tag.title }}
                    </v-chip>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>

            <WindowGroups
              :companyStats="item.companyStats"
              :search="search"
              @getSearch="setSearch"
            />
          </v-container>
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
import { postQuestionsToNotion } from "@/apis/postQuestions";
import WindowGroups from "@/components/WindowGroups";

const headers = [
  { text: "save", value: "notion", width: "20px", sortable: false },
  { text: "#", value: "id", width: "80px", align: "start" },
  { text: "title", value: "title", width: "200px" },
  { text: "diffic.", value: "level", width: "110px" },
  { text: "freq.", value: "frequency", width: "100px", filterable: false },
  {
    text: "tags",
    value: "tags",
    width: "200px",
    align: " d-none d-lg-table-cell",
    sortable: false
  },
  {
    text: "companies",
    value: "companies",
    width: "300px",
    align: " d-none d-lg-table-cell",
    sortable: false
  },
  { text: "more", value: "data-table-expand" }
];

const level = ["easy", "medium", "hard"];

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
      level,
      expanded: [],
      headers,
      quickLinks,
      saved: [],
      headerList: [],
      selectedHeaders: []
    };
  },
  components: {
    WindowGroups
  },
  props: {
    questions: Array
  },
  created() {
    this.headerList = Object.values(this.headers);
    this.selectedHeaders = this.headerList;
  },
  computed: {
    showHeaders() {
      return this.headerList.filter(s => this.selectedHeaders.includes(s));
    },
    showItems() {
      return this.questions.filter(i => this.level.includes(i.level));
    }
  },
  methods: {
    getChipColor(level) {
      return level == "easy" ? "green" : level == "medium" ? "orange" : "red";
    },
    getBarColor(frequency) {
      return frequency === 0
        ? "grey lighten-1"
        : frequency > 0 && frequency < 25
        ? "red lighten-1"
        : frequency >= 25 && frequency < 50
        ? "orange lighten-1"
        : frequency >= 50 && frequency < 75
        ? "green lighten-1"
        : frequency >= 75 && frequency < 99
        ? "green darken-2"
        : "blue darken-1";
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
    },
    setSearch(val) {
      this.search = val;
    },
    onSelected(val, selected, unselected) {
      return this.search != "" &&
        val.toLowerCase().includes(this.search.toLowerCase())
        ? selected
        : unselected;
    },
    addToNotion(id) {
      postQuestionsToNotion(id).then(response => {
        this.saved.push(id + response.status);
      });
    },
    matched(id) {
      return this.saved.includes(id) ? true : false;
    }
  }
};
</script>
<style>
a {
  text-decoration: none;
}
</style>
