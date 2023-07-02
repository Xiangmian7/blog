let BASE_URL = ''
const TIME_OUT = 5000

if (import.meta.env.DEV) {
  BASE_URL = 'http://localhost:5173/api'
} else {
  BASE_URL = 'http://47.120.2.82:8022/api'
}

export { BASE_URL, TIME_OUT }
