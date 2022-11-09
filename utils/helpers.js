module.exports = {
    formatDate: (date) => {
        return `${new Date(date).getMonth()}/${new Date(date).getDate()}/
        ${new Date(date).getFullYear()}`;
    }
}