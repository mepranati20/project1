function addMenuItem() {
    let name = document.getElementById("itemName").value;
    let price = document.getElementById("itemPrice").value;

    if (!name || !price) return alert("Enter item details!");

    let list = document.getElementById("menuList");
    let li = document.createElement("li");

    li.textContent = `${name} - ₹${price}`;
    list.appendChild(li);

    document.getElementById("itemName").value = "";
    document.getElementById("itemPrice").value = "";
}
