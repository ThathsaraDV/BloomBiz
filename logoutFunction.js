$("#adminLogoutBtn").click(function () {
    sessionStorage.removeItem("adminToken");
    sessionStorage.removeItem("adminId");
    sessionStorage.removeItem("adminUsername")

    window.location.replace("./adminLogin.html");
});

$("#logoutBtn").click(function () {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("customerId")

    window.location.replace("./userLogin.html");
});