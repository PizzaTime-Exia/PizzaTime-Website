<template>
  <div>
    <div v-if="!isEllasped" style="display: flex;">
      <span>Il vous reste&nbsp;</span>
      <div class="time-remaining">
        {{ days | two_digits }}:{{ hours | two_digits }}:{{ minutes | two_digits }}:{{ seconds | two_digits }}
      </div>
      <span>&nbsp;pour commander.</span>
    </div>
    <div v-if="isEllasped">Vous ne pouvez plus commander pour cette semaine.</div>
    <div>Livraison prévue le <span class="delivery-date">{{ deliveryDateText }}</span>.</div>
  </div>
</template>

<script>
import Vue from 'vue';

Vue.filter('two_digits', function (value) {
    if(value.toString().length <= 1)
    {
        return "0" + value.toString();
    }
    return value.toString();
});

export default {
  ready() {
    setInterval(() => {
      this.now = Math.trunc((new Date()).getTime() / 1000);
    }, 1000);
  },
  props : {
    maxOrderDate: {
      type: Object
    },
    deliveryDate: {
      type: Object
    }
  },
  data() {
    return {
      now: Math.trunc((new Date()).getTime() / 1000)
    }
  },
  computed: {
    isEllasped() {
      return (this.days + this.hours + this.minutes + this.seconds) <= 0;
    },
    seconds() {
      return (this.maxOrderDateInSeconds - this.now) % 60;
    },
    minutes() {
      return Math.trunc((this.maxOrderDateInSeconds - this.now) / 60) % 60;
    },
    hours() {
      return Math.trunc((this.maxOrderDateInSeconds - this.now) / 60 / 60) % 24;
    },
    days() {
      return Math.trunc((this.maxOrderDateInSeconds - this.now) / 60 / 60 / 24);
    },
    deliveryDateText() {
      return this.deliveryDate.toLocaleDateString();
    },
    maxOrderDateInSeconds() {
      return Math.trunc(this.maxOrderDate.getTime() / 1000);
    }
  }
}
</script>