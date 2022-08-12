<template>
  <div class="colorDropdown">
    <v-select :options="colorOptions"
              v-model="selectedColor"
              :clearable="false">
    </v-select>
  </div>
</template>

<script>
import vSelect from 'vue-select/src/components/Select.vue';
import {mapGetters} from 'vuex';

export default {
  name: "SelectColor",
  data: function () {
    return {
      colorOptions: [
        {
          label: 'gray',
          value: 'vtp-gray'
        },
        {
          label: 'lime',
          value: 'vtp-lime',
        },
        {
          label: 'cyan',
          value: 'vtp-cyan'
        },
        {
          label: 'yellow',
          value: 'vtp-yellow'
        },
        {
          label: 'blue',
          value: 'vtp-blue'
        }
      ]
    }
  },
  components: {
    vSelect
  },
  computed: {
    ...mapGetters(['get']),
    selectedColor: {
      get () {
          return this.changeColor(this.$store.state.secondSearch.selectedColor);
      },
      set (colorOption) {
        this.$store.commit('updateSelectedColor', colorOption.value)
      }
    }
  },
  methods: {
    getLabelForSelectedColorOption(value) {
      for (let i = 0; i < this.colorOptions.length; i++) {
        if (this.colorOptions[i].value == value) {
          return this.colorOptions[i].label;
        }
      }
      return '';
    },
    changeColor (value) {
      let filter = {
        label: '',
        value: ''
      };
      filter.value = value;
      filter.label = this.getLabelForSelectedColorOption(value);
      return filter;
    },
  }
}
</script>

<style lang="scss" scoped>
.colorDropdown .v-select {
  max-width: 80px !important;
  margin: 0 !important;
  cursor: pointer;
}
</style>