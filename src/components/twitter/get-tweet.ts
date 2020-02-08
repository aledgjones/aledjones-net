export async function getTweet(username: string) {

    const resp = await fetch('http://quartetvolute.com/php/twitter.php?username=' + encodeURIComponent(username));
    const data = await resp.json();

    if (data.errors || !data[0]) {
        return Promise.reject();
    } else {
        return data[0];
    }

}