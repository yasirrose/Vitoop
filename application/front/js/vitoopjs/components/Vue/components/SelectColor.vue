<template>
  <div class="colorDropdown">
    <vue-select :options="colorOptions"
              v-model="selectedColor"
              :clearable="false">
      <template #option="{ label, classname }">
        <div :class="classname" class="color_option">
          {{ label }}
        </div>
      </template>
    </vue-select>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  name: "SelectColor",
  data: function () {
    return {
      colorOptions: [
        {
          label: '',
          value: '',
          classname: ''
        },
        {
          label: 'blau',
          value: 'vtp-blue',
          classname: 'vtp_option_blue vtp_option'
        },
        {
          label: 'rot',
          value: 'vtp-red',
          classname: 'vtp_option_red vtp_option'
        },
        {
          label: 'grün',
          value: 'vtp-lime',
          classname: 'vtp_option_lime vtp_option'
        },
        {
          label: 'cyan',
          value: 'vtp-cyan',
          classname: 'vtp_option_cyan vtp_option'
        },
        {
          label: 'gelb',
          value: 'vtp-yellow',
          classname: 'vtp_option_yellow vtp_option'
        },
        {
          label: 'orange',
          value: 'vtp-orange',
          classname: 'vtp_option_orange vtp_option'
        },
        {
          label: 'Kein Lesezeichen',
          value: 'vtp-nobookmark',
          classname: 'vtp_option'
        }
      ]
    }
  },
  components: {

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
          return (value == 'vtp-nobookmark') ? ' ' : this.colorOptions[i].label;
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

.vtp_option{
  border-radius: 6px;
  padding-left: 10px;
  height: 24px !important;
}
.vtp_option_blue{
  background: #8fc9f6;
  color: #8fc9f6 !important;
}
.vtp_option_red{
  background: #f39090;
  color: #f39090 !important;
}
.vtp_option_lime{
  background: #87ee87;
  color: #87ee87 !important;
}
.vtp_option_cyan{
  background: #8feeee;
  color: #8feeee !important;
}
.vtp_option_yellow{
  background: #f5f568;
  color: #f5f568 !important;
}
.vtp_option_orange{
  background: #ffa500;
  color: #ffa500 !important;
}
.colorDropdown .dropdown-menu li{
  padding: 0px 3px;
  border-radius: 6px !important;
}
.colorDropdown .dropdown-menu li a{
  padding: 0px !important;
  border-radius: 6px !important;
}
.colorDropdown .dropdown-menu li .vtp_option:hover{
  background: #e4f1fb !important;
  color: #0070a3;
}

.colorDropdown .v-select {
  width: 120px !important;
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
  background-size: 285px;
}

.vtp-cyan {
  background: #8feeee; /* For browsers that do not support gradients */
  background: -webkit-linear-gradient(left, #8feeee , $vitoop-body-background-color); /* For Safari 5.1 to 6.0 */
  background: -o-linear-gradient(right, #8feeee , $vitoop-body-background-color); /* For Opera 11.1 to 12.0 */
  background: -moz-linear-gradient(right, #8feeee , $vitoop-body-background-color); /* For Firefox 3.6 to 15 */
  background: linear-gradient(to right, #8feeee , $vitoop-body-background-color); /* Standard syntax */
  background-repeat: no-repeat;
  background-size: 285px;
}

.vtp-lime {
  background: #87ee87; /* For browsers that do not support gradients */
  background: -webkit-linear-gradient(left, #87ee87 , $vitoop-body-background-color); /* For Safari 5.1 to 6.0 */
  background: -o-linear-gradient(right, #87ee87 , $vitoop-body-background-color); /* For Opera 11.1 to 12.0 */
  background: -moz-linear-gradient(right, #87ee87 , $vitoop-body-background-color); /* For Firefox 3.6 to 15 */
  background: linear-gradient(to right, #87ee87 , $vitoop-body-background-color); /* Standard syntax */
  background-repeat: no-repeat;
  background-size: 285px;
}

.vtp-yellow {
  background: #f5f568; /* For browsers that do not support gradients */
  background: -webkit-linear-gradient(left, #f5f568 , $vitoop-body-background-color); /* For Safari 5.1 to 6.0 */
  background: -o-linear-gradient(right, #f5f568 , $vitoop-body-background-color); /* For Opera 11.1 to 12.0 */
  background: -moz-linear-gradient(right, #f5f568 , $vitoop-body-background-color); /* For Firefox 3.6 to 15 */
  background: linear-gradient(to right, #f5f568 , $vitoop-body-background-color); /* Standard syntax */
  background-repeat: no-repeat;
  background-size: 285px;
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


.vs__selected {
  margin-top: 0px !important;
}

.vs__dropdown-toggle {
  padding-bottom: 0px !important;
}

</style>
