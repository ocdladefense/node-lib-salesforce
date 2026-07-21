export function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');

    for (let i = 0; i < ca.length; i++)
    {
        let c = ca[i];
        // Strip leading spaces from the cookie string
        while (c.charAt(0) === ' ')
        {
            c = c.substring(1, c.length);
        }
        // Check if the cookie name matches
        if (c.indexOf(nameEQ) === 0)
        {
            return decodeURIComponent(c.substring(nameEQ.length, c.length));
        }
    }
    return null;
}
