/**
 * Created by admin on 2021/12/13.
 */
import fetch from '@/fetch.js'
import urls from '../urls'

export const getToken = async () =>
    fetch({
        url: urls.getToken,
        method: 'GET',
        params: {}
    })