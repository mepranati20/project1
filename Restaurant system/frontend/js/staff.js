function addOrder() {
    let item = document.getElementById("orderItem").value;
    let qty = document.getElementById("orderQty").value;

    if (!item || !qty) return alert("Enter order details!");

    let list = document.getElementById("ordersList");
    let li = document.createElement("li");

    li.textContent = `${item} × ${qty}`;
    list.appendChild(li);

    document.getElementById("orderItem").value = "";
    document.getElementById("orderQty").value = "";
}
