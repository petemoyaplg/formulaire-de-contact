class Personne {
    constructor( nom, prenom, groupe, biographie, photo ) {
        this.nom = nom;
        this.prenom = prenom;
        this.groupe = groupe;
        this.biographie = biographie;
        this.photo = photo;
    }
}
let listePersonne = [];

// let cat = localStorage.getItem('maListe');

const prenom = document.getElementById( 'prenom' );
const nom = document.getElementById( 'nom' );
const groupe = document.getElementById( 'groupe' );
const biographie = document.getElementById( 'bio' );
const photoChoisie = document.querySelector( '.div-photo img' );

const btnCreerContact = document.querySelector( '#btn-creer-contact' );
const btnChoixImage = document.getElementById( 'choix-photo' );
const btnReinitialiser = document.getElementById( 'btn-reinit' );

const divListePersonne = document.querySelector( '.row2 .corp' );

//Chargement de la liste des contact existant (provenant du navigateur)
window.addEventListener( 'load', function () {
    const listePersonneNavigateur = JSON.parse( localStorage.getItem( 'maListe' ) );
    if ( listePersonneNavigateur ) {
        listePersonne = listePersonneNavigateur;
        listePersonne.forEach( personne => {
            creerPersonne( personne );
        } );
    }
} );
//Bouton de creation des contact
btnCreerContact.addEventListener( 'click', evt => {
    evt.preventDefault();
    const personne = new Personne( nom.value, prenom.value, groupe.value, biographie.value, photoChoisie.getAttribute( 'src' ) );
    listePersonne.push( personne );
    creerPersonne( listePersonne[ listePersonne.length - 1 ] );
    localStorage.setItem( 'maListe', JSON.stringify( listePersonne ) );
} );
//Bouton de selection d'image
btnChoixImage.addEventListener( 'change', function () {
    const file = this.files[ 0 ];
    if ( file ) {
        const reader = new FileReader();
        reader.addEventListener( 'load', function () {
            photoChoisie.setAttribute( 'src', this.result );
            photoChoisie.setAttribute( 'alt', 'Photo' );
            photoChoisie.setAttribute( 'width', '100' );
            photoChoisie.setAttribute( 'height', '100' );

            itemPhoto = URL.createObjectURL( file );
        } );
        reader.readAsDataURL( file );
    }
    else {
        photoChoisie.setAttribute( 'src', ' ' );
        photoChoisie.setAttribute( 'alt', 'Accune Image Sélectionné' );
    }
} );

btnReinitialiser.addEventListener( 'click', evt => {
    evt.preventDefault();
    prenom.value = '';
    nom.value = '';
    biographie.value = '';
    groupe.value = '';
    photoChoisie.setAttribute( 'src', 'img/icons8-checked-user-male-80.png' );
} );

function creerPersonne ( personne ) {
    //div principale
    const divPersonne = document.createElement( 'div' );
    divPersonne.className = 'div-personne';

    //premier div enfant (photo)
    const divAvatarCompte = document.createElement( 'div' );
    divAvatarCompte.className = 'info-personne';

    const avatarCompte = document.createElement( 'img' );
    setAttributsImg( avatarCompte, personne.photo, '95', '95' );
    divAvatarCompte.appendChild( avatarCompte );

    //deuxième div enfant (prenom, nom, groupe et biographie)
    const divInfoPersonne = document.createElement( 'div' );
    divInfoPersonne.className = 'info-personne';

    const paraNomPrenom = document.createElement( 'p' );
    paraNomPrenom.setAttribute( 'id', 'prenom-nom' );
    paraNomPrenom.textContent = `${ personne.prenom } ${ personne.nom }`;

    const paraGroupe = document.createElement( 'p' );
    paraGroupe.setAttribute( 'id', 'para-groupe' );
    paraGroupe.textContent = `Groupe : ${ personne.groupe }`;

    const paraBio = document.createElement( 'p' );
    paraBio.className = 'para-bio';
    paraBio.textContent = `Biographie :\n${ personne.biographie }`;
    divInfoPersonne.appendChild( paraNomPrenom );
    divInfoPersonne.appendChild( paraGroupe );
    divInfoPersonne.appendChild( paraBio );

    //troixième div enfant (supprimer)
    const divBtnSupprimer = document.createElement( 'div' );
    divBtnSupprimer.className = 'info-personne';

    const paraBtnSupprimer = document.createElement( 'p' );
    paraBtnSupprimer.className = 'para-supp';
    paraBtnSupprimer.setAttribute( 'id', 'btnSupprimer' );

    //Action pour supprimer l'élément parent
    paraBtnSupprimer.addEventListener( 'click', function () {
        if ( confirm( 'Voulez-vous vraiment supprimer cet personne ?' ) ) {
            // Suppression du contact dans la liste
            const contactSupp = listePersonne.splice( listePersonne.indexOf( personne ), 1 );
            console.log(contactSupp);
            localStorage.setItem( 'maListe', JSON.stringify( listePersonne ) );
            divPersonne.remove();
        }
    } );

    const imgBtnSupprimer = document.createElement( 'img' );
    setAttributsImg( imgBtnSupprimer, 'img/icons8-delete-48.png', '20', '20' );
    paraBtnSupprimer.appendChild( imgBtnSupprimer );
    divBtnSupprimer.appendChild( paraBtnSupprimer );

    //Ajout des div enfants dans la div parent
    divPersonne.appendChild( divAvatarCompte );
    divPersonne.appendChild( divInfoPersonne );
    divPersonne.appendChild( divBtnSupprimer );

    //Ajout de la div parent dans le code HTML
    divListePersonne.appendChild( divPersonne );
}

function setAttributsImg ( img, src, width, height ) {
    img.setAttribute( 'src', src );
    img.setAttribute( 'width', width );
    img.setAttribute( 'height', height );
}