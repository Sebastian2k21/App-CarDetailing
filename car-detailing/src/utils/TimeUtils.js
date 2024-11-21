export const getCurrentDate = () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today =yyyy + '-' + mm + '-' + dd;
    return today
}

export const getCurrentDateMonday = () => { 
    var today = new Date();
    var day = today.getDay();
    var diff = today.getDate() - day + (day === 0 ? -6:1); // adjust when day is sunday
    today = new Date(today.setDate(diff));
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today =yyyy + '-' + mm + '-' + dd;
    return today
}

export const getOffsetDate = (date, offset) => {
    var today = new Date(date);
    today.setDate(today.getDate() + offset);
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today =yyyy + '-' + mm + '-' + dd;
    return today
}

export const dateToIsoString = (date) => {
    return date.toISOString().split('T')[0];
}

export const getFirstDayOfCurrentMonth = () => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1)
}

export const getLastDayOfCurrentMonth = () => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth() + 1, 0)
}
