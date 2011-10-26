//Bilblioth�que de fonctions AJAX permettant l'envoi de requ�tes au serveur de mani�re asynchrone 
//et le traitement (ajout au corpos du document appelant) de r�ponses en XML conformes � la structure d�crite dans l'�nonc� du devoir.

//--------------------Fonctions principales---------------------

//fonction principale, qui envoie la  requ�te au serveur de fa�on asynchrone et positionne la fonction qui va traiter les donn�es
function loadXMLAsynchroneously(method, request, parameters, id)
{
    //initialisation de l'objet XMLXhttpRequest
    var xhr = initRequete ();

    //sp�cification de la fonction de traitement � appeler au retour serveur (car chargement asynchrone)
    var XMLDoc = null;
    xhr.onreadystatechange = function() {
        getXMLDocument(xhr, XMLDoc, id);
    };
    
    //envoi de la requ�te de chargement du fichier XML au serveur
    //le dernier param�tre est true ; le chargement du fichier se fera en asynchrone
    xhr.open(method, request, true);
    //encodage des param�tres dans la requ�te, si la m�thode est post
    if(parameters && (method == "post" || method == "POST"))
        xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    xhr.send(parameters);
}

//autre fonction principale, plus simple, qui envoie la requ�te au serveur de fa�on asynchrone et ne se pr�occupe pas de la r�ponse
//remarque : l'utilisation de cette fonction n'est pas n�cessaire pour r�aliser le devoir.
function sendRequestAsynchroneously(method, request, parameters)
{
    //initialisation de l'objet XMLXhttpRequest
    var xhr = initRequete ();

    //envoi de la requ�te de chargement du fichier XML au serveur
    //le dernier param�tre est true ; le chargement du fichier se fera en asynchrone
    xhr.open(method, request, true);
    //encodage des param�tres dans la requ�te, si la m�thode est post
    if(parameters && (method == "post" || method == "POST"))
        xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    xhr.send(parameters);
}

//--------------------------fonctions secondaires---------------------------

//fonction appel�e lors de la r�ception de la r�ponse, si la fonction principale loadXMLAsynchroneously() a �t� utilis�e.
function getXMLDocument(xhr, XMLDoc, id)
{
    // teste si la r�ponse est disponible
    if (xhr.readyState==4) {
        // teste si la r�ponse est arriv�e et contient des donn�es (code HTTP = 200 : OK)
        if (xhr.status == 200) {
            // teste si la r�ponse est arriv�e en XML ou en texte (peut arriver pour certaines configurations d'Apache)
            if (xhr.responseXML != null) {
                XMLDoc= xhr.responseXML;
            } else if (xhr.responseText != null) {
                //si la r�ponse est en texte, transformation en XML (voir fonction fa�ade plus bas)
                XMLDoc= parseFromString(xhr.responseText);
            }
            //D�commentez la ligne suivante pour voir le contenu XML obtenu (ne marche qu'avec FF)
            //alert((new XMLSerializer()).serializeToString(XMLDoc));
			
            //appel de la fonction de traitement qui va ajouter les donn�es au corps de la page (� �crire)
            traiteXML (XMLDoc, id);
		
        //teste si le code de statut est autre que le code renvoy� en cas d'absence de nouveaux messages.
        //Remarque : le code 1223 provient d'un bug avec IE : http://trac.dojotoolkit.org/ticket/2418
        } else if (xhr.status != 204 && xhr.status != 1223) {
            alert("Un problème est survenu avec la requète : ");
        }
    }
}

//----------------------Fonctions fa�ades----------------------------
//permettent de masquer les diff�rences entre les navigateurs
//remarque : ces fonctions ont uniquement �t� test�es avec FF et IE7

//fonction fa�ade qui teste le type de navigateur et renvoie un objet capable de se charger de l'envoi de la requ�te.
function initRequete()
{
    var xhr = null;
    if (window.XMLHttpRequest) { 
        xhr = new XMLHttpRequest();
    }
    else if (window.ActiveXObject) 
    {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
    return xhr;
}

//fonction fa�ade qui re�oit une cha�ne de caract�res et la parse en XML pour renvoyer un objet DOM.
//remarque : le XML doit �tre bien form�, sans quoi l'erreur de parsing bloque l'ex�cution du script.
function parseFromString (docTXT) {
    // code for IE
    if (window.ActiveXObject)
    {
        var XMLDoc=new ActiveXObject("Microsoft.XMLDOM");
        XMLDoc.async="false";
        XMLDoc.loadXML(docTXT);
    }
    // code for Mozilla, Firefox, Opera, etc.
    else
    {
        var parser=new DOMParser();
        var XMLDoc=parser.parseFromString(docTXT,"text/xml");
    }
    return XMLDoc;
}

//fonction fa�ade qui renvoie le texte contenu dans un �l�ment XML
function getXMLTextContent(source)
{
    if (source.textContent != null) {
        //Gecko
        return source.textContent;
    } else {
        //IE
        return source.text;
    }
}

function traiteXML (XMLDoc, id){
    var messages = XMLDoc.getElementsByTagName('Message');
    for(var i = 0; i < messages.length; i++) {
        var message = messages[i];
        var para = document.createElement('p');
        para.innerHTML = (message.getElementsByTagName('Auteur')[0].firstChild.data + ' : ' + message.getElementsByTagName('Texte')[0].firstChild.data);
        var div = document.getElementById('divMessages');
        div.appendChild(para);
    }
}

function rechargerMessages() {
    loadXMLAsynchroneously('GET', 'Messages.jsp', null, 'saisie');
    setTimeout("rechargerMessages();", 5000);
}

function envoieFormulaire() {
    var input = document.getElementById('text');
    var text = input.value;
    
    if (text != null && text != '') {
        sendRequestAsynchroneously('POST', 'Messages.jsp', 'message=' + text);
        input.value = '';
    }
    return false;
}