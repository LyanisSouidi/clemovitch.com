async function getChroniques() {
    let request = await fetch('/chroniques.json', { headers: { Accept: 'application/json' } });
    let data = await request.json();
    return data.chroniques;
}

async function getHTMLChroniques(chroniques) {
    let html = [];
    let template = document.querySelector('template#__chronique');
    chroniques.forEach(chronique => {
        let clone = template.content.cloneNode(true);

        clone.querySelector('a.__chronique_info_link').href = `https://www.youtube.com/watch?v=${chronique.id}`;
        clone.querySelector('img.__chronique_info_img').src =
            `https://i.ytimg.com/vi/${chronique.id}/maxresdefault.jpg`;
        clone.querySelector('img.__chronique_info_img').setAttribute('alt', chronique.title);
        clone.querySelector('img.__chronique_info_img').setAttribute('title', chronique.title);

        html.push(clone);
    });
    return html;
}

async function loadHTMLChroniques() {
    let chroniques = await getChroniques();
    let html = await getHTMLChroniques(chroniques);
    let parent = document.querySelector('div.__chroniques');
    html.forEach((chronique, index) => {
        parent.appendChild(chronique);
    });
}

loadHTMLChroniques();
