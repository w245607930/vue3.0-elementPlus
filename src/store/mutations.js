/**
 * Created by admin on 2021/12/10.
 */
export default {
    setCount(state, payload){
        state.count = payload
        sessionStorage.setItem('$count', JSON.stringify(state.count))
    }
}