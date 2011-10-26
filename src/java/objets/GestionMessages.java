package objets;

import java.util.ArrayList;

public class GestionMessages {
    ArrayList<Message> messages = new ArrayList();
    int nbMessages = 0;

    public GestionMessages() {
    }

    public void messageAdd(String pseudo, String contenuMessage) {
        messages.add(new Message(pseudo, contenuMessage));
        nbMessages++;
    }

    public Message getMessage(int id) {
        if(nbMessages > id){
            return messages.get(id);
        }else{
            return null;
        }
    }

    public ArrayList<Message> getMessages() {
        return messages;
    }

    public int getNbMessages() {
        return nbMessages;
    }
}
