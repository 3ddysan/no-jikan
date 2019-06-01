export const classes = (...classes) => classes.filter(item => !!item).join(' ');

const getLocales = () => navigator.languages && navigator.languages[0]

export const transformSeconds = (s) => {
    const minutes = Math.floor(s / 60) % 60;
    const hours = Math.floor(s / 3600);
    const seconds = s % 60;
    return { hours, minutes, seconds };
}

export const formatSeconds = (s) => {
    const { hours, minutes, seconds } = transformSeconds(s);
    const h = hours > 0 ? hours + 'h' : '';
    const m = minutes > 0 ? minutes + 'm' : '';
    const sec = seconds > 0 ? seconds + 's' : '';
    return h + m + sec;
}

export const formatDate = (date) => {
    const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString(getLocales(), options)
}