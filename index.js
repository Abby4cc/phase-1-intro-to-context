
function createEmployeeRecord(arr) {
    return {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    };
}

function createEmployeeRecords(arrays) {
    return arrays.map(createEmployeeRecord);
}

function createTimeInEvent(employee, dateStamp) {
    let [date, hour] = dateStamp.split(' ');
    employee.timeInEvents.push({ type: "TimeIn", hour: parseInt(hour, 10), date: date });
    return employee;
}

function createTimeOutEvent(employee, dateStamp) {
    let [date, hour] = dateStamp.split(' ');
    employee.timeOutEvents.push({ type: "TimeOut", hour: parseInt(hour, 10), date: date });
    return employee;
}

function hoursWorkedOnDate(employee, date) {
    let inEvent = employee.timeInEvents.find(e => e.date === date);
    let outEvent = employee.timeOutEvents.find(e => e.date === date);
    return (outEvent.hour - inEvent.hour) / 100;
}

function wagesEarnedOnDate(employee, date) {
    return hoursWorkedOnDate(employee, date) * employee.payPerHour;
}

function allWagesFor(employee) {
    return employee.timeInEvents.reduce((total, event) => total + wagesEarnedOnDate(employee, event.date), 0);
}

function calculatePayroll(employees) {
    return employees.reduce((total, employee) => total + allWagesFor(employee), 0);
}

module.exports = {
    createEmployeeRecord,
    createEmployeeRecords,
    createTimeInEvent,
    createTimeOutEvent,
    hoursWorkedOnDate,
    wagesEarnedOnDate,
    allWagesFor,
    calculatePayroll
};