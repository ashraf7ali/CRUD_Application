export const getNurseData = () => {
    return fetch('./data.json')
            .then(response => response.json())
}