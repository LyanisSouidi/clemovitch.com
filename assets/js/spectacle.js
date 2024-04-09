async function getDates() {
    let request = await fetch('/dates.json', { headers: { Accept: 'application/json' } });
    let data = await request.json();
    data.dates = data.dates
        .filter(date => new Date(date.datetime) > new Date())
        .sort((a, b) => new Date(a.datetime) - new Date(b.datetime));
    return data.dates;
}

async function getHTMLDates(dates) {
    let html = [];
    let template_date = document.querySelector('template#date');
    let template_date_full = document.querySelector('template#date_full');
    dates.forEach(date => {
        let template = date.full ? template_date_full : template_date;
        let clone = template.content.cloneNode(true);
        let datetime = new Date(date.datetime);

        clone.querySelector('a.__date_info_location').href = date.location.link;
        clone.querySelector('span.__date_info_city').textContent = date.location.city;
        clone.querySelector('span.__date_info_city_details').textContent = date.location.details
            ? `(${date.location.details})`
            : '';
        clone.querySelector('time.__date_info_datetime').setAttribute('datetime', datetime.toISOString());
        clone.querySelector('time.__date_info_datetime').setAttribute(
            'title',
            datetime.toLocaleDateString({
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour: 'numeric',
                minute: 'numeric'
            })
        );
        clone.querySelector('span.__date_info_day').textContent = datetime.toLocaleDateString('fr-FR', {
            weekday: 'long'
        });
        clone.querySelector('span.__date_info_daymonth').textContent =
            `${datetime.toLocaleDateString('fr-FR', { day: '2-digit' })}.${datetime.toLocaleDateString('fr-FR', { month: '2-digit' })}`;
        clone.querySelector('a.__date_info_link').href = date.link;

        html.push(clone);
    });
    return html;
}

async function loadHTMLDates() {
    let dates = await getDates();
    let html = await getHTMLDates(dates);
    let mobile = document.querySelector('div#__dates');
    let col_l = document.querySelector('div#__dates_col_l');
    let col_r = document.querySelector('div#__dates_col_r');
    html.forEach((date, index) => {
        mobile.appendChild(date.cloneNode(true));
        if (index < Math.ceil(html.length / 2)) {
            col_l.appendChild(date);
        } else {
            col_r.appendChild(date);
        }
    });
}

loadHTMLDates();
