import request from '@/utils/request-book'

// Best Sellers Lists
export const getBooks = () =>
  request({
    url: '/lists/names.json?api-key=TCA6F3ERSCl405KagmGI7MIe8rn2bu2U',
    method: 'get'
  })

export const getBooksByDate = (date:any) =>
  request({
    url: `/lists/${date}/hardcover-fiction.json?api-key=TCA6F3ERSCl405KagmGI7MIe8rn2bu2U`,
    method: 'get'
  })

export const getLatestBooks = ():any =>
  request({
    url: '/lists/current/hardcover-fiction.json?api-key=TCA6F3ERSCl405KagmGI7MIe8rn2bu2U',
    method: 'get'
  })

// Best Sellers Lists
export const reviewByFilterType = (type:String, payload:String) =>
  request({
    url: `/reviews.json?${type}=${payload}&api-key=TCA6F3ERSCl405KagmGI7MIe8rn2bu2U`,
    method: 'get'
  })
