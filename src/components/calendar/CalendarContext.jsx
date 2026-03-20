import React, { createContext } from 'react'

export const CalendarContext = createContext({
    month:"",
    isToday:false,
    date:''
  })