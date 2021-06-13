<template>
  <a-table :columns="columns" :data-source="questions" rowKey="id">
    <span slot="level" slot-scope="level">
      <a-tag
        :color="level === 1 ? 'green' : level == 2 ? 'geekblue' : 'volcano'"
      >
        {{ level === 1 ? "Easy" : level == 2 ? "Medium" : "Hard" }}
      </a-tag>
    </span>
    <span slot="frequency" slot-scope="frequency">
      <!-- <ProgressBar v-bind:data="frequency" />
      <Rate v-bind:data="frequency" /> -->
      <Tag v-bind:data="frequency" />
    </span>
    <span slot="tags" slot-scope="tags">
      <a-tag v-for="tag in tags" :key="tag">
        {{ tag }}
      </a-tag>
    </span>
  </a-table>
</template>

<script>
import { getAllQuestions } from "@/apis/getQuestions";
import ProgressBar from "@/components/ProgressBar";
import Rate from "@/components/Rate";
import Tag from "@/components/Tag";

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    sorter: (a, b) => a.id - b.id
  },
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
    sorter: (a, b) => a.title.localeCompare(b.title)
  },
  {
    title: "Level",
    key: "level",
    dataIndex: "level",
    scopedSlots: { customRender: "level" },
    sorter: (a, b) => a.level - b.level
  },
  {
    title: "Frequency",
    dataIndex: "frequency",
    key: "frequency",
    scopedSlots: { customRender: "frequency" },
    sorter: (a, b) => a.frequency - b.frequency
  },
  {
    title: "Tags",
    key: "tags",
    dataIndex: "tags",
    scopedSlots: { customRender: "tags" },
    sorter: (a, b) => a.tags.length - b.tags.length
  }
];
/* eslint-disable */
export default {
  name: "Questions",
  data() {
    return {
      columns,
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
  },
  components: {
    ProgressBar,
    Rate,
    Tag
  }
};
</script>
/* eslint-enable */
