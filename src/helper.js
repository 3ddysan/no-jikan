export const classes = (...classes) => classes.filter(item => !!item).join(' ');

export const transformSeconds = (s) => {
    const minutes = Math.floor(s / 60) % 60;
    const hours = Math.floor(s / 3600);
    const seconds = s % 60;
    return { hours, minutes, seconds };
}