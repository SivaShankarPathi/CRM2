<!DOCTYPE html>
<html>
<head>
    <title>Customer Management</title>
    <link rel="stylesheet" type="text/css" href="/CRM2/css/customer.css">
        <link rel="stylesheet" type="text/css" href="/CRM2/css/common.css">

    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <!-- Shared pagination JS -->
    <script src="/CRM2/js/pagination.js"></script>
</head>
<body>
<div class="container">
    <div class="top-buttons">
        <a href="/CRM2/index.cfm" class="btn-link btn-primary">Back to Home</a>
        <a href="index.cfm?crm=pdf2" target="_blank" class="btn-link btn-success" id="downloadPdfBtn">Download PDF Report</a>
        <div id="reportStatus" style="margin-top: 10px; font-weight: bold;"></div>
    </div>

    <h3>Customer Management</h3>

    <div class="search-group">
        <input type="text" id="search" placeholder="Search...">
        <button type="button" onclick="loadCustomers()">Search</button>
    </div>

    <form id="addCustomerForm" class="form-row">
        <input type="text" name="name" id="name" placeholder="Name" required>
        <input type="email" name="email" id="email" placeholder="Email" required>
        <input type="text" name="phone" id="phone" placeholder="Phone" required>
        <button type="submit">Add Customer</button>
    </form>

    <table id="customerTableWrapper">
        <thead>
            <tr><th>ID</th><th>Name</th><th>Email</th><th>Phone</th><th>Actions</th></tr>
        </thead>
        <tbody id="customerTable"></tbody>
    </table>

    <div id="pagination" style="text-align:center; margin-top:20px;"></div>
</div>

<!-- Edit Modal -->
<div id="editModal">
    <input type="hidden" id="edit-id">
    <label>Name:</label><input type="text" id="edit-name">
    <label>Email:</label><input type="text" id="edit-email">
    <label>Phone:</label><input type="text" id="edit-phone" maxlength="10">
    <br>
    <button onclick="saveEdit()">Save</button>
    <button onclick="closeEditModal()">Cancel</button>
</div>

<!-- Customer-specific JS -->
<script src="/CRM2/js/customer.js"></script>

<!-- Initialize table pagination after data loads -->
<script>
    document.addEventListener("DOMContentLoaded", function () {
        loadCustomers(); // pagination will be called inside
    });
</script>
</body>
</html>
