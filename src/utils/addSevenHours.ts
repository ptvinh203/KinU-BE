export default function addSevenHours(date: Date): Date {
    const newDate = new Date(date.getTime() + 7 * 60 * 60 * 1000);
    return newDate;
}
