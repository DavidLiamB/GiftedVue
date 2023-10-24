<template>
  <div v-if="gift.opened" class="card">
    <div>
      <img :src="gift.url" alt="" class="rounded-top gift-img">
    </div>
    <div class="p-1">
      <p class="text-center">
        {{ gift.tag }}
      </p>
    </div>
  </div>

  <div v-else @click="openGift(gift)" class="card closed d-flex justify-content-center align-items-center p-2">
    <div class="glass-card">
      <p class="text-center">{{ gift.tag }}</p>
    </div>
  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { Gift } from "../models/Gift.js";
import { giftsService } from "../services/GiftsService.js";
import Pop from "../utils/Pop.js";
export default {
  props: {
    gift: { type: Gift, required: true }
  },
  setup() {
    return {
      async getGifts() {
        try {
          giftsService.getGifts()
        } catch (error) {
          Pop.error(error)
        }
      },
      async openGift(gift) {
        try {
          await giftsService.openGift(gift)
        } catch (error) {
          Pop.error(error)
        }
      }
    }
  }
};
</script>


<style lang="scss" scoped>
.gift-img {
  width: 100%;
  height: 35vh;
  object-fit: cover;
  object-position: center;
}

.card {
  height: 50vh;
  background-color: white;
  box-shadow: -1px 1px 6px rgba(0, 0, 0, 0.179);

}

.card.closed {
  background-image: url('https://images.unsplash.com/photo-1622977265115-cce36eb43f18?auto=format&fit=crop&q=60&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YnNja2dyb3VuZCUyMGltZ3xlbnwwfHwwfHx8MA%3D%3D');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}

.glass-card {
  background-color: rgba(200, 200, 200, 0.448);
  backdrop-filter: blur(6px);
  border-radius: 8px;
  padding: .5em;
  box-shadow: -1px 1px 6px rgba(0, 0, 0, 0.179);

}
</style>