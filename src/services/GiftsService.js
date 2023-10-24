import { AppState } from "../AppState.js"
import { Gift } from "../models/Gift.js"
import { api } from "./AxiosService.js"
import { logger } from "../utils/Logger.js"
class GiftsService {
  async getGifts() {
    const res = await api.get('api/gifts')
    // logger.log(res.data)
    AppState.gifts = res.data.map(pojo => new Gift(pojo))
  }
  async openGift(gift) {
    gift.opened = true
    const res = await api.put('api/gifts/' + gift.id, gift)
    const giftIndex = AppState.gifts.findIndex(g => g == gift)
    AppState.gifts[giftIndex] = new Gift(res.data)
  }
  async createGift(tag, url) {
    const res = await api.post('api/gifts', { tag, url })
    // logger.log(res.data)
    AppState.gifts.unshift(new Gift(res.data))
  }
}

export const giftsService = new GiftsService()