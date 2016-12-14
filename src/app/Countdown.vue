  <div class="countdown">
    <span v-if="!isEllasped">
      <span>Les commandes seront fermées&nbsp;</span>
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

const momentFr = moment();
momentFr.locale('fr');

export default {
  props : {
    maxOrderDate: {
      type: Object
    },
    deliveryDate: {
      type: Object
    }
  },
  computed: {
    isEllasped() {
      return (this.days + this.hours + this.minutes + this.seconds) <= 0;
    },
    timeToOrderClose() {
      return momentFr(this.maxOrderDate.getTime()).toNow();
    },
    deliveryDateText() {
      return this.deliveryDate.toLocaleDateString();
    }
  }
}
</script>