<template>
  <div class="countdown">
    <span v-if="!isEllasped">
      <span>Les commandes seront fermées</span>
      <span class="time-remaining">
        <strong>{{ timeToOrderClose }}</strong>
      </span>
      <span>.</span>
    </span>
    <span v-if="isEllasped">Vous ne pouvez plus commander pour cette semaine.</span>
    <br>
    <span>Livraison prévue le <span class="delivery-date"><strong>{{ deliveryDateText }}</strong></span>.</span>
  </div>
</template>

<script>
import moment from 'moment';

moment.locale('fr');

export default {
  name: 'Countdown',
  props : {
    maxOrderDate: {
      type: Date
    },
    deliveryDate: {
      type: Date
    }
  },
  computed: {
    isEllasped() {
      return (this.days + this.hours + this.minutes + this.seconds) <= 0;
    },
    timeToOrderClose() {
      return moment(this.maxOrderDate.getTime()).fromNow();
    },
    deliveryDateText() {
      return this.deliveryDate.toLocaleDateString();
    }
  }
}
</script>