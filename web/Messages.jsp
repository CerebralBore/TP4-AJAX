<?xml version="1.0" encoding="UTF-8" ?>

<%@page contentType="application/xml" pageEncoding="UTF-8"%>
<jsp:useBean id="manager" class="objets.GestionMessages" scope="application"/>
<Messages>
    <%
        if (request.getMethod() == "POST") {
    %>
            <jsp:forward page="Stockage.jsp" />
    <%
       }
        int dernierMessage = 0;
        int nbMessages = manager.getNbMessages();
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (int i = 0, n = cookies.length; i < n; i++) {
                if (cookies[i].getName().equals("nbmessage")) {
                    dernierMessage = Integer.decode(cookies[i].getValue());
                    break;
                }
            }
        }

        if (dernierMessage > nbMessages) {
            dernierMessage = 0;
        }

        if(dernierMessage == nbMessages) {
            response.setStatus(204);
        }else{
            for (int i = dernierMessage; i < nbMessages; i++) {
                %>
                    <Message>
                        <Auteur><%=manager.getMessage(i).getPseudo()%></Auteur>
                        <Texte><%=manager.getMessage(i).getContenuMessage()%></Texte>
                    </Message>
                <%
            }

            Cookie cookie = new Cookie("nbmessage", String.valueOf(nbMessages));
            response.addCookie(cookie);
            
            Cookie cookie2 = new Cookie("derniermessage", String.valueOf(dernierMessage));
            response.addCookie(cookie2);
        }
    %>
</Messages>