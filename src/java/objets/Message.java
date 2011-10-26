package objets;

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 *
 * @author p1109611
 */
public class Message {

    private String pseudo;
    private String contenuMessage;

    public Message() {
    }

    public Message(String pseudo, String contenuMessage) {
        this.pseudo = pseudo;
        this.contenuMessage = contenuMessage;
    }

    public String getContenuMessage() {
        return contenuMessage;
    }

    public String getPseudo() {
        return pseudo;
    }

    public void setContenuMessage(String contenuMessage) {
        this.contenuMessage = contenuMessage;
    }

    public void setPseudo(String pseudo) {
        this.pseudo = pseudo;
    }
}
