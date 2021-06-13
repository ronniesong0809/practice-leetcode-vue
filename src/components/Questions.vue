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
      <a-tag
        :color="
          frequency === 0
            ? 'lime'
            : Math.round(frequency) === 0
            ? 'gold'
            : Math.round(frequency) === 1
            ? 'orange'
            : Math.round(frequency) === 2
            ? 'volcano'
            : Math.round(frequency) === 3
            ? 'red'
            : 'magenta'
        "
      >
        {{
          frequency === 0
            ? "UR"
            : Math.round(frequency) === 0
            ? "VL"
            : Math.round(frequency) === 1
            ? "L"
            : Math.round(frequency) === 2
            ? "M"
            : Math.round(frequency) === 3
            ? "H"
            : "VH"
        }}
      </a-tag>
    </span>
    <span slot="tags" slot-scope="tags">
      <a-tag v-for="tag in tags" :key="tag">
        {{ tag }}
      </a-tag>
    </span>
  </a-table>
</template>

<script>
import { getTopQuestions } from "@/apis/getQuestions";

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id"
  },
  {
    title: "Title",
    dataIndex: "title",
    key: "title"
  },
  {
    title: "Level",
    key: "level",
    dataIndex: "level",
    scopedSlots: { customRender: "level" }
  },
  {
    title: "Frequency",
    dataIndex: "frequency",
    key: "frequency",
    scopedSlots: { customRender: "frequency" }
  },
  {
    title: "Tags",
    key: "tags",
    dataIndex: "tags",
    scopedSlots: { customRender: "tags" }
  }
];

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
    toFixed(value) {
      return value.toFixed(2);
    },
    async fetchQuestions() {
      getTopQuestions().then(value => {
        const data = value.data;
        this.questions = data;
      });
    }
  }
};
</script>
