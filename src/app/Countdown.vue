<template>
  <div>
    <p v-if="!isEllasped">
      <span>Il vous reste </span>
      <div class="time-remaining">
        {{ days | two_digits }}:{{ hours | two_digits }}:{{ minutes | two_digits }}:{{ seconds | two_digits }}
      </div>
      <span> pour commander.</span>
    </p>
    <p v-if="isEllasped">Vous ne pouvez plus commander pour cette semaine.</p>
    <p>Livraison prévue le <span class="delivery-date">{{ deliveryDateText }}</span>.</p>
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
    window.setInterval(() => {
      this.now = Math.trunc((new Date()).getTime() / 1000);
    },1000);
  },
  props : {
    maxOrderDate: {
      type: Object,
      coerce: date => Math.trunc(date.getTime() / 1000)
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
      return (this.maxOrderDate - this.now) % 60;
    },
    minutes() {
      return Math.trunc((this.maxOrderDate - this.now) / 60) % 60;
    },
    hours() {
      return Math.trunc((this.maxOrderDate - this.now) / 60 / 60) % 24;
    },
    days() {
      return Math.trunc((this.maxOrderDate - this.now) / 60 / 60 / 24);
    },
    deliveryDateText() {
      return this.deliveryDate.toLocaleDateString();
    }
  }
}
</script>