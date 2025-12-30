let total = 0;

function addBill() {
    let item = document.getElementById("billItem").value;
    let price = parseFloat(document.getElementById("billPrice").value);

    if (!item || !price) return alert("Enter item & price!");

    let list = document.getElementById("billList");
    let li = document.createElement("li");

    li.textContent = `${item} - ₹${price}`;
    list.appendChild(li);

    total += price;
    document.getElementById("totalAmount").textContent = total;

    document.getElementById("billItem").value = "";
    document.getElementById("billPrice").value = "";
}

