module.exports.example = () => {
    return true;
}

module.exports.parseTime = (s) => {
    var c = s.split(':');
    return parseInt(c[0]) * 60 + parseInt(c[1]);
}

module.exports.convertHours = (mins) => {
    var hour = Math.floor(mins/60);
    var mins = mins%60;
    var converted = this.pad(hour, 2)+':'+this.pad(mins, 2);
    return converted;
}

module.exports.pad = (str, max)  => {
    str = str.toString();
    return str.length < max ? this.pad("0" + str, max) : str;
}

module.exports.calculateTimeSlot = (startTime, endTime, interval) => {
    var i, formatted_time;
    var timeSlots = new Array();
    for(var i=startTime; i<=endTime; i = i+interval){
        formatted_time = this.convertHours(i);
        timeSlots.push(formatted_time);
    }
    return timeSlots;
}

module.exports.convertInterval = (num) => {
    let interval = num * 60;
    return interval;
}

module.exports.calFreeSlot = (appointmentDateDoctor, periodSlotDoctor, doctorId) => {
    let freeSlot = []
    for (let i = 0; i < appointmentDateDoctor.length; i++) {
        const data = appointmentDateDoctor[i];
        const day = data.day;
        const dateArr = this.getDateByDay(day)
        let startTime = this.parseTime(data.start_time);
        let endTime = this.parseTime(data.end_time);
        let interval = this.convertInterval(periodSlotDoctor);

        let timeSlot = this.calculateTimeSlot( startTime, endTime, interval );
        console.log("timeSlot: ", timeSlot)
     
        for (let j = 0; j < dateArr.length; j++) {
            for (let k = 0; k < timeSlot.length - 1; k++) {
                let slot = {
                    "doctor_id": doctorId,
                    "date": dateArr[j],
                    "day": day,
                    "start_time": timeSlot[k],
                    "end_time": k < timeSlot.length - 1 ? timeSlot[k+1] : data.end_time
                }
                freeSlot.push(slot)
            }
        }
        
    }
    return freeSlot
}

module.exports.getDateByDay = (dayName) => {
    var d = new Date(),
        month = d.getMonth(),
        days = [];

    d.setDate(1);

    // If dayName is Monday, Get the first Monday in the month
    let day = this.mapDay(dayName);
    while (d.getDay() !== day) {
        d.setDate(d.getDate() + 1);
    }

    // Get all the other Mondays in the month
    while (d.getMonth() === month) {
        days.push(new Date(d.getTime()));
        d.setDate(d.getDate() + 7);
    }

    return days;
}

module.exports.mapDay = (day) => {
    if ( day === 'Sunday' ){
        return 0;
    } else if ( day === 'Monday' ){
        return 1;
    } else if ( day === 'Tuesday' ){
        return 2;
    } else if ( day === 'Wednesday' ){
        return 3;
    } else if ( day === 'Thursday' ){
        return 4;
    } else if ( day === 'Friday' ){
        return 5;
    } else if ( day === 'Saturday' ){
        return 6;
    }
    return -1;
}

