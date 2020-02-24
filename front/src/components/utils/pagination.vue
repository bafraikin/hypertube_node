<template>
  <div id="toPaginate">
    <img src="img/loader.gif"/>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        notOngoingTimeout: true,
        timeoutToWait: 1500
      }
    },
    methods: {
      isVisibleOnScreen(el) {
        let top = el.offsetTop;
        let left = el.offsetLeft;
        const width = el.offsetWidth;
        const height = el.offsetHeight;

        while(el.offsetParent) {
          el = el.offsetParent;
          top += el.offsetTop;
          left += el.offsetLeft;
        }

        return (
          top >= window.pageYOffset &&
          left >= window.pageXOffset &&
          (top + height) <= (window.pageYOffset + window.innerHeight) &&
          (left + width) <= (window.pageXOffset + window.innerWidth)
        );
      }
    },
    mounted() {
      window.onscroll= () => {
        if (this.isVisibleOnScreen(this.$el) && this.notOngoingTimeout)
        {
          this.notOngoingTimeout = false
          setTimeout(() => { 
            this.$emit("displayNewResults");
            setTimeout(() => {
              this.notOngoingTimeout = true;
            }, this.timeoutToWait);
          }, this.timeoutToWait);
         
        }
      };
    }
  }

</script>

<style type="scss">

  #toPaginate {
    width: 100%;
    height: 10vh;
  }

</style>
