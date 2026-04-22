// FETCH DATA
async function loadData() {
    const res = await fetch("http://localhost:5000/contacts");
    const data = await res.json();

    const table = document.querySelector("#data-table tbody");
    table.innerHTML = "";

    data.forEach(item => {
        const row = `
            <tr>
                <td>${item.name}</td>
                <td>${item.number}</td>
                <td>${item.email}</td>
                <td>${item.message}</td>
                <td>
                    <button class="delete" onclick="deleteData('${item._id}')">Delete</button>
                    <button class="edit" onclick="editData('${item._id}')">Edit</button>
                </td>
            </tr>
        `;
        table.innerHTML += row;
    });
}

loadData();


// DELETE
async function deleteData(id) {
    await fetch(`http://localhost:5000/contact/${id}`, {
        method: "DELETE"
    });
    loadData();
}


// EDIT (basic version)
async function editData(id) {
    const newName = prompt("Enter new name:");

    await fetch(`http://localhost:5000/contact/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name: newName })
    });

    loadData();
}