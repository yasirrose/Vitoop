<template>
  <transition name="fade">
    <div class="vtp-uiinfo-info ui-state-highlight ui-corner-all" v-if="show">
      <span class="vtp-icon ui-icon ui-icon-info"></span><span>{{ message }}</span>
    </div>
  </transition>
</template>

<script>
export default {
  name: "ElementNotification",
  props: ['id'],
  data: function () {
    return {
      show: false,
      message: '',
      componentId: this.id
    }
  },
  mounted() {
    let self = this;
    VueBus.$on('element-notification:show', function (message, id) {
      if (id !== self.componentId) {
        return;
      }

      self.show = true;
      self.message = message;
      setTimeout(() => {
        self.show = false;
        self.message = '';
      }, 3000);
    })
  }
}
</script>
