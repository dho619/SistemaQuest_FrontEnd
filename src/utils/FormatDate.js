export const DateToInput = (date) => {
    let dia     = ("0" + date.getDate()).slice(-2)   // 1-31 -- o slice e o 0 e pra quando ter apenas um numero 
    let mes     = ("0" + (date.getMonth() + 1)).slice(-2) // 0-11 (zero=janeiro)
    let ano4    = date.getFullYear();               // 4 dígitos
    
    return ano4 + '-' + mes + '-' + dia
}

export const InputToDate = (date) => {
    let dateArray = date.split('-').map(item => item.trim())
    let dateString = dateArray[1] + '/' + dateArray[2] + '/' + dateArray[0] //formato aceito pelo new date
    return new Date(dateString)
}

