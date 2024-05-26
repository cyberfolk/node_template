# Confronto tra API generiche e API RESTful

| Caratteristica          | API generiche                         | API RESTful             |
| ----------------------- | ------------------------------------- | ----------------------- |
| Architettura            | Qualunque                             | Seguono i principi REST |
| Protocolli di Trasporto | Qualunque (HTTP, HTTPS, FTP, SMTP...) | HTTP o HTTPS            |
| Formato dei Dati        | Qualunque (XML, JSON, YAML...)        | JSON o XML              |
| Operazioni              | Qualunque                             | GET, POST, PUT, DELETE  |
| Stato                   | Qualunque                             | Stateless               |
| Cache                   | Qualunque                             | Si                      |

## principi del REST,

-   _Stateless_, cioè ogni richiesta deve contenere tutte le informazioni necessarie per essere compresa e processata dal server. Il server non deve memorizzare alcun contesto della richiesta precedente.

-   _Risorse e URL_: Le risorse devono essere identificate tramite URL (Uniform Resource Locator). Ogni risorsa è accessibile tramite un URL univoco.

-   _Operazioni standard_: Le operazioni standard HTTP (GET, POST, PUT, DELETE) sono utilizzate per interagire con le risorse.
