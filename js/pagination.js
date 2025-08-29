function initPagination(tableId, rowsPerPage = 8) {
    const $table = $("#" + tableId);
    const $rows = $table.find("tbody tr").length ? $table.find("tbody tr") : $table.find("tr");
    const totalRows = $rows.length;
    const totalPages = Math.ceil(totalRows / rowsPerPage);

    const $paginationContainer = $("<div>").addClass("pagination");
    $table.after($paginationContainer);

    function renderPage(page) {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        $rows.each(function(index) {
            $(this).toggle(index >= start && index < end);
        });

        renderPaginationLinks(page);
    }

    function renderPaginationLinks(currentPage) {
        $paginationContainer.empty();

        if (totalPages <= 1) return;

        if (currentPage > 1) {
            $("<a>", {
                href: "#",
                text: "Previous",
                click: function(e) {
                    e.preventDefault();
                    renderPage(currentPage - 1);
                }
            }).appendTo($paginationContainer);
        }

        for (let i = 1; i <= totalPages; i++) {
            $("<a>", {
                href: "#",
                text: i,
                class: i === currentPage ? "active" : "",
                click: function(e) {
                    e.preventDefault();
                    renderPage(i);
                }
            }).appendTo($paginationContainer);
        }

        if (currentPage < totalPages) {
            $("<a>", {
                href: "#",
                text: "Next",
                click: function(e) {
                    e.preventDefault();
                    renderPage(currentPage + 1);
                }
            }).appendTo($paginationContainer);
        }
    }

    renderPage(1); // Load first page
}