//
// **THIS IS A HACK** until we have real data to deal with for conference events.
//
const TIME_REGEX = /(\d{1,2}:\d{2} (?:AM|PM)) - (\d{1,2}:\d{2} (?:AM|PM))/,
    parseDate = (day, time) => {
        const extTime = Ext.Date.parse(time, 'g:i A');
        return new Date(2017, 3, day+3, extTime.getHours(), extTime.getMinutes());
    },
    startDateFor = (day, time) => parseDate(day, time.match(TIME_REGEX)[1]),
    endDateFor = (day, time) => parseDate(day, time.match(TIME_REGEX)[2]);

export default Ext.define(null, {
    extend: 'Ext.calendar.model.Event',

    getTitle: function() {
        return this.data.name;
    },

    getDescription: function() {
        return this.data.location;
    },

    getStartDate: function() {
        return startDateFor(this.data.day, this.data.time);
    },

    getEndDate: function() {
        return endDateFor(this.data.day, this.data.time);
    }
});