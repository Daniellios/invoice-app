export const transformDate = (date) => {
  const tempDate = new Date(date)
  // prettier-ignore
  const months = ['Jan' , 'Feb' , 'Mar' , 'Apr' , 'Jun' , 'Jul' , 'Aug' , 'Sep' , 'Oct' , "Nov" ,"Dec"]
  const finalDate = `Due ${
    tempDate.getDate() < 9 ? `0${tempDate.getDate()}` : tempDate.getDate()
  } ${months[tempDate.getMonth() - 1]} ${tempDate.getFullYear()}`
  return finalDate
}
