<template>
  <div class="container-fluid">
    <section class="row">
      <div class="col-4 bg-success form-col">
        <h1>Gifted</h1>
        <div>
          <form @submit.prevent="createGift()">
            <div class="form-floating mb-3">
              <input v-model="tag" type="text" class="form-control" id="floatingTag" placeholder="type tag here">
              <label for="floatingTag">Tag</label>
            </div>
            <div class="form-floating mb-2">
              <input v-model="url" type="url" class="form-control" id="floatingUrl" placeholder="put image url here">
              <label for="floatingUrl">Url</label>
            </div>
            <div class="text-end">
              <button type="submit" class="btn btn-primary">Submit</button>
            </div>
          </form>
        </div>
      </div>
      <div class="col-8">
        <section class="row">
          <div class="col-12 p-0">
            <Navbar />
          </div>
          <div class="col-12 gift-container">
            <section class="row">
              <div v-for="gift in gifts" :key="gift.id" class="col-12 col-sm-6 col-md-4 col-lg-3 col-xxl-2 p-2">

                <GiftCard :gift="gift" />

              </div>
            </section>
          </div>
        </section>
      </div>
    </section>
  </div>
</template>

<script>
import { computed, onMounted, popScopeId, ref } from "vue";
import Navbar from "../components/Navbar.vue";
import Pop from "../utils/Pop.js";
import { giftsService } from "../services/GiftsService.js"
import { AppState } from "../AppState.js"
import GiftCard from "../components/GiftCard.vue";

export default {
  setup() {
    const tag = ref('')
    const url = ref('')
    async function getGifts() {
      try {
        giftsService.getGifts()
      } catch (error) {
        Pop.error(error)
      }
    }
    onMounted(() => {
      getGifts()
    })
    async function createGift() {
      await giftsService.createGift(tag.value, url.value)
      tag.value = ''
      url.value = ''
    }
    return {
      tag,
      url,
      gifts: computed(() => AppState.gifts),
      createGift,
      async openGift(gift) {
        try {
          await giftsService.openGift(gift)
        } catch (error) {
          Pop.error(error)
        }
      }
    };
  },
  components: { Navbar, GiftCard }
}
</script>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;

  .home-card {
    width: 50vw;

    >img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}

p {
  margin-bottom: 0;
}

.form-col {
  height: 100vh;
}

.gift-container {
  height: 89.7vh;
  overflow-y: scroll;
  overflow-x: hidden;
}

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

/* SECTION scrollbar */
.gift-container::-webkit-scrollbar {
  border-radius: 0 5px 5px 0;
}

.gift-container::-webkit-scrollbar-button {
  display: none;
}

.gift-container::-webkit-scrollbar-track {
  background: #fff;
  border-radius: 0 5px 5px 0;
}


.gift-container::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 5px;
}


.gift-container::-webkit-scrollbar-thumb:hover {
  background: #555;
}

/* !SECTION */
</style>
