import axios from 'axios'

const repeatMsg = 'REPEATREQUEST'
// const { CancelToken } = axios
// let cancelRequest = new Map()

/**
 * prompt function
 * @param {String} msg
 */
const tip = msg => {
  alert(msg)
}

/**
 * Serialization parameter
 * @param  {Object}    params
 * @return {encode}    encodeURI
 */

function paramsSerializer(params) {
  let result = []
  for (let i in params) {
    let isObject = params.hasOwnProperty(i) && typeof params[i] !== 'string'
    isObject ? result.push(`${i}=${JSON.stringify(params[i])}`) : result.push(`${i}=${params[i]}`)
  }
  return encodeURI(result.join('&'))
}

// create an axios instance
const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 1000 * 1000,
  paramsSerializer: paramsSerializer
})

/**
 * request interceptor
 * @param  {Object} config
 * @return {Object}
 */
request.interceptors.request.use(
  config => {
    return config
  },
  error => {
    // Do something with request error
    // eslint-disable-next-line
    console.log(error)
    Promise.reject(error)
  }
)

/**
 * response interceptor
 * @param  {Object} response
 * @return {Object}
 */
request.interceptors.response.use(
  response => {
    const res = response.data
    return res
  },
  error => {
    const { res, message } = error
    if (res) {
      // The request has been issued, but not in the range of 2 xx
      tip(`Status:${res.status},Message: ${res.data.message}`)
      return Promise.reject(res)
    } else if (message === repeatMsg) {
      tip('repeat message')
    } else {
      // To deal with broken network
      tip('Broken Network')
    }
    // eslint-disable-next-line
    console.log(`err:${error}`)
  }
)

export default request
