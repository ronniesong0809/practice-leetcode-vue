<template>
  <v-container class="about text-center" fill-height fluid>
    <v-row justify="center">
      <v-col md="12" lg="8" xl="6">
        <span class="text-h4">Milestones</span>
        <v-divider class="ma-5"></v-divider>
        <p class="body-1">More features coming soon!</p>
        <v-timeline class="my-10">
          <v-timeline-item
            v-for="t in timeline"
            :key="t.name"
            :icon="t.icon"
            fill-dot
          >
            <v-card class="elevation-5">
              <v-card-title class="justify-center text-body-1">
                <span :class="t.finish ? 'line-through' : ''">
                  {{ t.name }}
                </span>
                <v-icon v-if="t.finish" class="ml-3" color="green">
                  mdi-check
                </v-icon>
                <v-icon v-if="t.wip" class="ml-3" color="red">
                  mdi-account-hard-hat
                </v-icon>
                <span v-if="t.wip" class="caption ml-3"> WIP </span>
              </v-card-title>
              <v-footer>
                <v-row justify="center">
                  <v-col class="caption text-center">
                    <span v-if="t.finish">
                      {{ new Date(t.time).toLocaleDateString() }}
                    </span>
                    <span v-else>
                      <span v-if="t.wip">
                        Estimated {{ addDays(new Date(), 7) }}
                      </span>
                      <span v-else>
                        Estimated {{ addDays(new Date(), 30) }}
                      </span>
                    </span>
                  </v-col>
                </v-row>
              </v-footer>
            </v-card>
          </v-timeline-item>
        </v-timeline>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      timeline: [
        {
          name: "MVP",
          icon: "mdi-calendar",
          finish: true,
          wip: false,
          time: "2020/06/12"
        },
        {
          name: "Filterable & Searchable Data Table",
          icon: "mdi-table",
          finish: true,
          wip: false,
          time: "2020/06/18"
        },
        {
          name: "Company Tags",
          icon: "mdi-tag",
          finish: true,
          wip: false,
          time: "2020/06/20"
        },
        {
          name: "Topic Tags",
          icon: "mdi-tag-multiple",
          finish: true,
          wip: false,
          time: "2020/06/20"
        },
        {
          name: "Statistics: Chars & Bars",
          icon: "mdi-chart-bar",
          finish: false,
          wip: true,
          time: "2020/06/27"
        },
        {
          name: "Scroll Back To Top Button",
          icon: "mdi-format-vertical-align-top",
          finish: true,
          wip: false,
          time: "2020/06/20"
        },
        {
          name: "Dark Mode",
          icon: "mdi-theme-light-dark",
          finish: true,
          wip: false,
          time: "2020/06/22"
        },
        {
          name: "Header Navbar",
          icon: "mdi-page-layout-header",
          finish: true,
          wip: false,
          time: "2020/06/25"
        },
        {
          name: "Footer",
          icon: "mdi-page-layout-footer",
          finish: false,
          wip: false
        },
        {
          name: "About Page",
          icon: "mdi-information",
          finish: false,
          wip: false
        },
        {
          name: "Live Chat",
          icon: "mdi-chat-question",
          finish: true,
          wip: false,
          time: "2020/06/21"
        },
        {
          name: "Similar Questions",
          icon: "mdi-file-document-multiple",
          finish: true,
          wip: false,
          time: "2020/06/25"
        },
        {
          name: "Company Tags (6m/1y/2y)",
          icon: "mdi-calendar-month",
          finish: true,
          wip: false,
          time: "2020/06/25"
        },
        {
          name: "Quick Links",
          icon: "mdi-web",
          finish: true,
          wip: false,
          time: "2020/06/25"
        },
        {
          name: "Save to Notion",
          icon: "mdi-note-plus",
          finish: true,
          wip: false,
          time: "2020/06/25"
        },
        {
          name: "Login and Access Control",
          icon: "mdi-login-variant",
          finish: false,
          wip: true,
          time: "2020/07/1"
        },
        {
          name: "Dashboard",
          icon: "mdi-account",
          finish: false,
          wip: true,
          time: "2020/07/2"
        },
        {
          name: "Better UI/UX Design",
          icon: "mdi-pencil-ruler",
          finish: false,
          wip: false
        },
        {
          name: "More...",
          icon: "mdi-dots-horizontal",
          finish: false,
          wip: false
        }
      ]
    };
  },
  methods: {
    addDays(date, days) {
      return new Date(
        date.getTime() + days * 24 * 60 * 60 * 1000
      ).toLocaleDateString();
    }
  }
};
</script>
