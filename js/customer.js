$('#downloadPdfBtn').click(function() {
    if (confirm("Your PDF report is being generated and will open in a new tab!")) {
        $('#reportStatus').html("Sending email to admin...").css("color", "orange");

        $.ajax({
            url: "/CRM2/views/send_mail.cfm?ajax=true",
            method: "GET",
            success: function(response) {
                $('#reportStatus').html(response.message).css("color", response.success ? "green" : "red");
            },
            error: function(xhr, status, error) {
                $('#reportStatus').html(" Error sending email: " + error).css("color", "red");
            }
        });
    }
});

function loadCustomers() {
    $.post("/CRM2/components/customer.cfc?method=searchCustomers", {
        query: $("#search").val()
    }, function(response) {
        let html = "";
        let serial = 1;
        response.customers.forEach(c => {
            html += `<tr>
                <td>${serial++}</td>
                <td>${c.name}</td>
                <td>${c.email}</td>
                <td>${c.phone}</td>
                <td>
                    <button class='btn-sm btn-edit' onclick='openEditModal(${c.id}, "${c.name}", "${c.email}", "${c.phone}")'>Edit</button>
                    <button class='btn-sm btn-delete' onclick='deleteCustomer(${c.id})'>Delete</button>
                </td>
            </tr>`;
        });
        $("#customerTable").html(html);
        //  Remove old pagination before reinitializing
        $("#customerTableWrapper").next(".pagination").remove();

        // Now reinitialize
        initPagination("customerTableWrapper", 8);
    }, "json");
}

function openEditModal(id, name, email, phone) {
    $("#edit-id").val(id);
    $("#edit-name").val(name);
    $("#edit-email").val(email);
    $("#edit-phone").val(phone);
    $("#editModal").show();
}

function closeEditModal() {
    $("#editModal").hide();
}

function saveEdit() {
    const id = $("#edit-id").val();
    const name = $("#edit-name").val();
    const email = $("#edit-email").val();
    const phone = $("#edit-phone").val();

    if (!name || !email || !phone) {
        alert("Please fill all fields.");
        return;
    }

    $.post("/CRM2/components/customer.cfc?method=editCustomer", {
        "id": id,
        "name": name,
        "email": email,
        "phone": phone
    }, function(response) {
        alert(response.message);
        loadCustomers();
        closeEditModal();
    }, "json");
}

function deleteCustomer(id) {
    if (confirm("Delete this customer?")) {
        $.post("/CRM2/components/customer.cfc?method=deleteCustomer", { id }, function(response) {
            alert(response.message);
            loadCustomers();
        }, "json");
    }
}

$("#email").on("blur", function() {
    const email = $(this).val();
    if (email) {
        $.post("/CRM2/components/customer.cfc?method=checkEmail", { email }, function(response) {
            if (!response.success) {
                alert(response.message);
            }
        }, "json");
    }
});

$(document).ready(function() {
    loadCustomers();

    $("#addCustomerForm").submit(function(e) {
        e.preventDefault();
        const name = $("#name").val();
        const email = $("#email").val();
        const phone = $("#phone").val();

        if (!/^\d{10}$/.test(phone)) {
            alert("Phone must be exactly 10 digits");
            return;
        }

        $.post("/CRM2/components/customer.cfc?method=addCustomer", {
            name,
            email,
            phone
        }, function(res) {
            alert(res.message);
            if (res.success) {
                $("#addCustomerForm")[0].reset();
                loadCustomers();
            }
        }, "json");
    });

    $("#search").on("input", function() {
        loadCustomers();
    });
});