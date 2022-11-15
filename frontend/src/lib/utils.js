export const getBadgeColor = (numberOfDays) => {
    if (numberOfDays > 0) {
        return 'success'
    } else if (numberOfDays === 0) {
        return 'warning'
    } else {
        return 'error'
    }
}

export const getNumberOfDays = (deadline) => {
    const deadlineDate = new Date(deadline)
    const todayDate = new Date()
    const dateDifference = deadlineDate.getTime() - todayDate.getTime()
    return Math.floor(dateDifference / (1000 * 3600 * 24)) + 1;
}