Questo progetto consiste in un'applicazione che permette all'utente di registrarsi, effettuare il login e visualizzare le strutture ricettive della regione Marche. Il frontend è sviluppato in React e si interfaccia con un backend sviluppato in .NET. 
L'applicazione si compone di 3 pagine:
1) Pagina di Registrazione (Register)
La pagina di registrazione consente agli utenti di creare un account. Gli utenti devono fornire un nome utente, una password e confermare la password. Le informazioni vengono validate prima di poter registrare l'utente nel sistema. Dopo una registrazione riuscita, l'utente viene reindirizzato alla pagina di login. Se l'utente è già registrato può saltare questo passaggio e andare direttamente alla pagina di login.
2) Pagina di Login (Login)
La pagina di login permette agli utenti già registrati di accedere al sistema utilizzando il proprio nome utente e password. Se le credenziali sono valide, l'utente viene reindirizzato alla pagina delle strutture, altrimenti viene mostrato un messaggio di errore.
3) Pagina delle Strutture (StruttureMarche)
La pagina delle strutture consente agli utenti di visualizzare un elenco di strutture presenti nelle Marche. Gli utenti possono scegliere di visualizzare tutte le strutture o filtrare i risultati per provincia. La pagina mostra informazioni dettagliate su ciascuna struttura, come nome, provincia, comune, indirizzo e categoria. E' presente anche un'opzione per pulire i risultati ottenuti (pulisciRisultati).
