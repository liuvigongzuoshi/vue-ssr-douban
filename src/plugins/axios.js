export default function({ $axios, redirect }) {
  $axios.onRequest((config) => {
    // const baseURL = process.env.baseUrl
    // return { ...config, baseURL }
  })

  $axios.onError((error) => {
    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      redirect('/400')
    }
  })
}
