/**
 * Created by admin on 2021/12/10.
 */
export default {
    async setCount(ctx, item) {
        ctx.commit('setCount', item)
    }
}
