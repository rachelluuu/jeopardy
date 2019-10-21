// Pretty-prints the date as MM/DD/YYYY
export const getFormattedDate = date => {
    const year = date.getFullYear();
    const month = (1 + date.getMonth()).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return month + '/' + day + '/' + year;
};