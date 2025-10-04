// Получение всех отелей
async function GetHotel() {
    const response = await fetch("/api/hotels", {
        method: "GET",
        headers: { "Accept": "application/json" }
    });
    if (response.ok) {
        const hotels = await response.json();
        let rows = document.querySelector("tbody");
        hotels.forEach(hotel => {
            rows.append(row(hotel));
        });
    }
}

// Получение одного отеля по ID
async function GetHotelById(id) {
    const response = await fetch("/api/hotels/" + id, {
        method: "GET",
        headers: { "Accept": "application/json" }
    });
    if (response.ok) {
        const hotel = await response.json();
        const form = document.forms["hotelForm"];
        form.elements["id"].value = hotel.id;
        form.elements["name"].value = hotel.name;
        form.elements["countOfStars"].value = hotel.countOfStars;
        form.elements["countryCode"].value = hotel.countryCode;
    }
}

// Создание нового отеля
async function CreateHotel(hotelName, hotelCountOfStars, hotelCountryCode) {
    const response = await fetch("api/hotels", {
        method: "POST",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
            name: hotelName,
            countOfStars: parseInt(hotelCountOfStars, 10),
            countryCode: hotelCountryCode
        })
    });
    if (response.ok) {
        const hotel = await response.json();
        reset();
        document.querySelector("tbody").append(row(hotel));
    }
}

// Редактирование отеля
async function EditHotel(hotelId, hotelName, hotelCountOfStars, hotelCountryCode) {
    const response = await fetch("/api/hotels/" + hotelId, {
        method: "PUT",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
            id: parseInt(hotelId, 10),
            name: hotelName,
            countOfStars: parseInt(hotelCountOfStars, 10),
            countryCode: hotelCountryCode
        })
    });
    if (response.ok) {
        const hotel = await response.json();
        reset();
        document.querySelector("tr[data-rowid='" + hotel.id + "']").replaceWith(row(hotel));
    }
}

// Удаление отеля
async function DeleteHotel(id) {
    const response = await fetch("/api/hotels/" + id, {
        method: "DELETE",
        headers: { "Accept": "application/json" }
    });
    if (response.ok) {
        const hotel = await response.json();
        document.querySelector("tr[data-rowid='" + hotel.id + "']").remove();
    }
}

// Сброс формы
function reset() {
    const form = document.forms["hotelForm"];
    form.reset();
    form.elements["id"].value = 0;
}

// Создание строки таблицы
function row(hotel) {
    const tr = document.createElement("tr");
    tr.setAttribute("data-rowid", hotel.id);
    const idTd = document.createElement("td");
    idTd.append(hotel.id);
    tr.append(idTd);
    const nameTd = document.createElement("td");
    nameTd.append(hotel.name);
    tr.append(nameTd);
    const countOfStarsTd = document.createElement("td");
    countOfStarsTd.append(hotel.countOfStars);
    tr.append(countOfStarsTd);
    const linksTd = document.createElement("td");
    const editLink = document.createElement("a");
    editLink.setAttribute("data-id", hotel.id);
    editLink.setAttribute("style", "cursor:pointer;padding:15px;");
    editLink.append("Изменить");
    editLink.addEventListener("click", e => {
        e.preventDefault();
        GetHotelById(hotel.id);
    });
    linksTd.append(editLink);
    const removeLink = document.createElement("a");
    removeLink.setAttribute("data-id", hotel.id);
    removeLink.setAttribute("style", "cursor:pointer;padding:15px;");
    removeLink.append("Удалить");
    removeLink.addEventListener("click", e => {
        e.preventDefault();
        DeleteHotel(hotel.id);
    });
    linksTd.append(removeLink);
    tr.appendChild(linksTd);
    return tr;
}

// Инициализация при загрузке страницы
function InitialFunction() {
    document.getElementById("reset").addEventListener("click", e => {
        e.preventDefault();
        reset();
    });
    document.forms["hotelForm"].addEventListener("submit", e => {
        e.preventDefault();
        const form = document.forms["hotelForm"];
        const id = form.elements["id"].value;
        const name = form.elements["name"].value;
        const countOfStars = form.elements["countOfStars"].value;
        const countryCode = form.elements["countryCode"].value;
        if (id == 0)
            CreateHotel(name, countOfStars, countryCode);
        else
            EditHotel(id, name, countOfStars, countryCode);
    });
    GetHotel();
}
