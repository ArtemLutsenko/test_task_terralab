import axios from '@/api/axios'

export const getAllUsers = (params: any) => {
  const queryString = new URLSearchParams(params).toString()
  return axios.get(`/users?${queryString}`).then((response) => response.data)
}

export const searchUsers = (params: any) => {
  const queryString = new URLSearchParams(params).toString()
  return axios.get(`/users/search?${queryString}`).then((response) => response.data)
}

export const getUserById = (id: string) => {
  return axios.get(`/users/${id}`).then((response) => response.data)
}
