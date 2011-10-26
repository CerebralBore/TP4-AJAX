<?xml version="1.0" encoding="UTF-8" ?>
<jsp:useBean id="manager" class="objets.GestionMessages" scope="application"/>
<%
    if (request.getMethod() == "POST") {
        manager.messageAdd((String)session.getAttribute("pseudo"), (String)request.getParameter("message"));
    }
%>
