const { expect } = require('chai');
const {
    getTodayDate,
    getTomorrowDate,
    getTheDateAfterTomorrowDate,
} = require('./forecast'); // Adjust the import path as needed

describe('getTodayDate', () => {
    it('should return the current date in YYYY-MM-DD format', () => {
        const result = getTodayDate();
        expect(result).to.match(/^\d{4}-\d{2}-\d{2}$/); // Matches YYYY-MM-DD pattern
    });
});

describe('getTomorrowDate', () => {
    it('should return the date for the next day in YYYY-MM-DD format', () => {
        const result = getTomorrowDate();
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const year = tomorrow.getFullYear();
        const month = (tomorrow.getMonth() + 1).toString().padStart(2, '0');
        const day = tomorrow.getDate().toString().padStart(2, '0');
        const expected = `${year}-${month}-${day}`;
        expect(result).to.equal(expected);
    });
});

describe('getTheDateAfterTomorrowDate', () => {
    it('should return the date for the day after tomorrow in YYYY-MM-DD format', () => {
        const result = getTheDateAfterTomorrowDate();
        const dayAfterTomorrow = new Date();
        dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);
        const year = dayAfterTomorrow.getFullYear();
        const month = (dayAfterTomorrow.getMonth() + 1).toString().padStart(2, '0');
        const day = dayAfterTomorrow.getDate().toString().padStart(2, '0');
        const expected = `${year}-${month}-${day}`;
        expect(result).to.equal(expected);
    });
});





