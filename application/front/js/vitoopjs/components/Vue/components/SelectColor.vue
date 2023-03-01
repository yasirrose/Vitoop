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
          label: 'blau',
          value: 'vtp-blue'
        },
        {
          label: 'rot',
          value: 'vtp-red'
        },
        {
          label: 'grün',
          value: 'vtp-lime'
        },
        {
          label: 'cyan',
          value: 'vtp-cyan'
        },
        {
          label: 'gelb',
          value: 'vtp-yellow'
        },
        {
          label: 'orange',
          value: 'vtp-orange'
        },
        {
          label: 'Kein Lesezeichen',
          value: 'vtp-nobookmark'
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
        this.$store.commit('updateSelectedColor', colorOption.value);
        vitoopApp.vtpDatatable && vitoopApp.vtpDatatable.refreshTable();

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

<style lang="scss">
$vitoop-body-background-color: #cfe7f7;

.colorDropdown .v-select {
  max-width: 140px !important;
  margin: 0 !important;
  cursor: pointer;
}
#vtp-second-search .vtp-blue {
  background-size: 210px !important;
}

.vtp-red {
  background: #f39090; /* For browsers that do not support gradients */
  background: -webkit-linear-gradient(left, #f39090, $vitoop-body-background-color); /* For Safari 5.1 to 6.0 */
  background: -o-linear-gradient(right, #f39090 , $vitoop-body-background-color); /* For Opera 11.1 to 12.0 */
  background: -moz-linear-gradient(right, #f39090 , $vitoop-body-background-color); /* For Firefox 3.6 to 15 */
  background: linear-gradient(to right, #f39090 , $vitoop-body-background-color); /* Standard syntax */
  background-repeat: no-repeat;
  background-size: 210px;
}

.vtp-cyan {
  background: #8feeee; /* For browsers that do not support gradients */
  background: -webkit-linear-gradient(left, #8feeee , $vitoop-body-background-color); /* For Safari 5.1 to 6.0 */
  background: -o-linear-gradient(right, #8feeee , $vitoop-body-background-color); /* For Opera 11.1 to 12.0 */
  background: -moz-linear-gradient(right, #8feeee , $vitoop-body-background-color); /* For Firefox 3.6 to 15 */
  background: linear-gradient(to right, #8feeee , $vitoop-body-background-color); /* Standard syntax */
  background-repeat: no-repeat;
  background-size: 210px;
}

.vtp-lime {
  background: #87ee87; /* For browsers that do not support gradients */
  background: -webkit-linear-gradient(left, #87ee87 , $vitoop-body-background-color); /* For Safari 5.1 to 6.0 */
  background: -o-linear-gradient(right, #87ee87 , $vitoop-body-background-color); /* For Opera 11.1 to 12.0 */
  background: -moz-linear-gradient(right, #87ee87 , $vitoop-body-background-color); /* For Firefox 3.6 to 15 */
  background: linear-gradient(to right, #87ee87 , $vitoop-body-background-color); /* Standard syntax */
  background-repeat: no-repeat;
  background-size: 210px;
}

.vtp-yellow {
  background: #f5f568; /* For browsers that do not support gradients */
  background: -webkit-linear-gradient(left, #f5f568 , $vitoop-body-background-color); /* For Safari 5.1 to 6.0 */
  background: -o-linear-gradient(right, #f5f568 , $vitoop-body-background-color); /* For Opera 11.1 to 12.0 */
  background: -moz-linear-gradient(right, #f5f568 , $vitoop-body-background-color); /* For Firefox 3.6 to 15 */
  background: linear-gradient(to right, #f5f568 , $vitoop-body-background-color); /* Standard syntax */
  background-repeat: no-repeat;
  background-size: 210px;
}
.vtp-orange {
  background: #edbc62; /* For browsers that do not support gradients */
  background: -webkit-linear-gradient(left, #edbc62 , $vitoop-body-background-color); /* For Safari 5.1 to 6.0 */
  background: -o-linear-gradient(right, #edbc62 , $vitoop-body-background-color); /* For Opera 11.1 to 12.0 */
  background: -moz-linear-gradient(right, #edbc62 , $vitoop-body-background-color); /* For Firefox 3.6 to 15 */
  background: linear-gradient(to right, #edbc62 , $vitoop-body-background-color); /* Standard syntax */
  background-repeat: no-repeat;
  background-size: 210px;
}
</style>