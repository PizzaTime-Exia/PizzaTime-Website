<template>
  <div class="countdown">
    <span v-if="!isEllasped">
      <span>Les commandes seront fermées</span>
      <span class="time-remaining">
        <strong>{{ timeToOrderClose }}</strong>
      </span>
      <span>.</span>
    </span>
    <span v-if="isEllasped">Les commandes sont fermées.</span>
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
      return moment(this.maxOrderDate).isBefore(moment());
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